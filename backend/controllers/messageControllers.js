const { GoogleGenerativeAI } = require('@google/generative-ai');
const PromptSession = require('../models/message');
const generatedCodeModel = require('../models/genratedCodeModels');

function parseFilesFromCode(aiCode) {
  const fileRegex = /^ *\/\/ *([\w\/-]+\.(js|jsx|css)) *$/gm;
  let match;
  const files = {};
  let lastIndex = 0;
  let lastFile = null;
  while ((match = fileRegex.exec(aiCode)) !== null) {
    if (lastFile) {
      files[lastFile] = aiCode.slice(lastIndex, match.index).trim();
    }
    lastFile = '/' + match[1];
    lastIndex = fileRegex.lastIndex;
  }
  if (lastFile) {
    files[lastFile] = aiCode.slice(lastIndex).trim();
  }
  return files;
}

const createMessage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const SYSTEM_PROMPT_EXPLAIN = `You are a world-class UI/UX expert. Explain the UI in a conversational, engaging, and vivid way, helping the user imagine the experience. Focus on:
    - What the user will see (main components, layout, colors, style, and visual hierarchy)
    - How they can interact with it (key actions, feedback, and flow)
    - What makes it user-friendly, visually appealing, and delightful (modern design, accessibility, responsiveness, micro-interactions, and SaaS best practices)
    Use simple, inspiring language, avoid technical jargon, and paint a picture of the experience. Absolutely avoid using markdown formatting like bold (**), italics (*), or lists (*, -). Keep the explanation under 200 words.`;

    const SYSTEM_PROMPT_GENERATE = `
You are a senior React developer and UI designer. When asked to build a feature, always:
- Split the code into separate files for each component (e.g., Navbar.jsx, Sidebar.jsx).
- Use only React and Tailwind CSS utility classes for all styling. Do NOT use plain CSS, CSS files, or import any CSS files.
- Do NOT use styled-components, Material UI, react-icons, or any other external libraries.
- Do NOT use the public/ folder.
- Do NOT use smart quotes or non-standard characters.
- Do NOT include explanations, only code.
- Output each file with a header in the format: // FileName (e.g., // Navbar.jsx).
- If you use any npm package, add a comment at the top: // dependencies: package1, package2 (but avoid unless absolutely necessary and only use packages that are pre-installed in most React sandboxes).

UI/UX Requirements:
- Make the UI visually stunning, modern, and responsive, inspired by top SaaS apps like Notion, Linear, Stripe, Vercel, and YouTube.
- Use Tailwind CSS utility classes for advanced layout (flex, grid), spacing, color, gradients, glassmorphism, soft shadows, rounded corners, and interactive states (hover, focus, active).
- Use backdrop blur, border gradients, and card layouts for depth and polish.
- Add micro-interactions: button hover, card lift, subtle transitions.
- Use semantic HTML and accessible practices (labels, aria attributes, etc.).
- Ensure a visually balanced layout, whitespace, and clear hierarchy.
- Write clean, well-structured, and readable React code.
- If you need icons, use SVG directly in the code (do NOT use react-icons or any icon library).
`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const generatePromptContext = (messages, systemPrompt) => {
      const systemLine = `System: ${systemPrompt}\n`;
      const chatHistory = messages
        .map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.content}`)
        .join('\n');
      return systemLine + chatHistory;
    };

    const { sessionId, content } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const session = sessionId
      ? await PromptSession.findById(sessionId)
      : new PromptSession({ 
          user: userId,
          title: content.substring(0, 10),
          messages: [] 
        });

    if (sessionId && !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Add user message
    session.messages.push({ sender: 'user', content });

    // 1️⃣ Generate UI explanation
    const explainContext = generatePromptContext(session.messages, SYSTEM_PROMPT_EXPLAIN);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(explainContext);
    const aiReply = result.response.text();

    session.messages.push({ sender: 'ai', content: aiReply });
    await session.save();

    // 2️⃣ Generate code
    const codeContext = generatePromptContext(session.messages, SYSTEM_PROMPT_GENERATE);
    const codeResponse = await model.generateContent(codeContext);
    const code = codeResponse.response.text();

    // Parse files from AI code output
    let files = parseFilesFromCode(code);
    // Parse dependencies from a comment if present
    let dependencies = {
      "react": "latest",
      "react-dom": "latest"
    };
    const depMatch = code.match(/^\s*\/\/\s*dependencies:\s*([\w\-, ]+)/im);
    if (depMatch && depMatch[1]) {
      depMatch[1].split(',').map(pkg => pkg.trim()).forEach(pkg => {
        if (pkg && !dependencies[pkg]) dependencies[pkg] = "latest";
      });
    }
    if (!Object.keys(files).length) {
      files = { "/App.js": code };
    }
    // Robust normalization and cleaning
    // 1. Replace smart quotes and trim all files
    Object.keys(files).forEach(f => {
      files[f] = files[f]
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'")
        .trim();
    });
    // 2. Only use one App entry file
    let appEntry = '/App.js';
    if (files['/App.jsx']) {
      appEntry = '/App.jsx';
      delete files['/App.js'];
    }
    // 3. Normalize CSS file: use /app.css
    const cssFile = Object.keys(files).find(f =>
      f.toLowerCase() === '/app.css' ||
      f.toLowerCase() === '/styles.css'
    );
    if (cssFile && cssFile !== '/app.css') {
      files['/app.css'] = files[cssFile];
      delete files[cssFile];
    }
    // 4. Fix imports in all files to use correct extensions
    Object.keys(files).forEach(f => {
      files[f] = files[f]
        .replace(/from '\.\/components\/(\w+)'/g, "from './components/$1.jsx'")
        .replace(/from \"\.\/components\/(\w+)\"/g, 'from "./components/$1.jsx"');
    });
    // 5. Update /index.js to import the correct files
    files['/index.js'] = `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '${appEntry.replace(/^\//, './')}';
import './app.css';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
    // 6. Always ensure /index.html exists
    files['/index.html'] = files['/index.html'] || `<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>React + Todo</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>`;
    // 7. Remove any files in /public (not used by Sandpack)
    Object.keys(files).forEach(f => {
      if (f.startsWith('/public/')) delete files[f];
    });
    // Replace all CSS imports in all files to './app.css'
    Object.keys(files).forEach(f => {
      files[f] = files[f]
        .replace(/import ['"]\.\/App\.css['"]/g, "import './app.css'")
        .replace(/import ['"]\.\/styles\.css['"]/g, "import './app.css'");
    });

    // Move top-level component files to /components if imported as such
    const allFileContents = Object.values(files).join('\n');
    Object.keys(files).forEach(f => {
      if (
        /^\/[A-Z][A-Za-z0-9]*\.jsx?$/.test(f) && // e.g., /Navbar.jsx
        allFileContents.includes(`./components/${f.replace(/^\//, '')}`)
      ) {
        // Move to /components/
        files[`/components/${f.replace(/^\//, '')}`] = files[f];
        delete files[f];
      }
    });

    // Always include /app.css and /index.css with basic Tailwind or default styles if missing
    if (!files['/app.css']) {
      files['/app.css'] = `@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
    }
    if (!files['/index.css']) {
      files['/index.css'] = `@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
    }

    // Remove markdown code fences from all files
    Object.keys(files).forEach(f => {
      files[f] = files[f]
        .replace(/```jsx?/g, '')
        .replace(/```/g, '');
    });

    const filter = { session: session._id };  // criteria to find existing doc
    const update = { code };                   // new code value
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const generated = await generatedCodeModel.findOneAndUpdate(filter, update, options);
    console.log(generated);

    res.status(200).json({ 
      message: 'Message added successfully',
      aiReply,
      context: explainContext,
      code,
      files, // <-- send files for Sandpack
      sessionId: session._id,
      dependencies
    });
  } catch (err) {
    console.error('Error in createMessage:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

const fetchMessages = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user._id;
    const { sessionId } = req.query;

    let query = { user: userId };
    if (sessionId) {
      query._id = sessionId;
    }

    // Fetch all sessions for the user
    const sessions = await PromptSession.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate({
        path: 'messages',
        options: { sort: { createdAt: 1 } } // Sort messages by oldest first
      });

    if (!sessions || sessions.length === 0) {
      return res.status(200).json({ 
        message: 'No messages found',
        sessions: [] 
      });
    }

    // For each session, fetch the associated generated code
    const sessionsWithCode = await Promise.all(
      sessions.map(async (session) => {
        const generatedCode = await generatedCodeModel.findOne({ session: session._id });
        return {
          ...session.toObject(),
          generatedCode: generatedCode ? generatedCode.code : null
        };
      })
    );

    res.status(200).json({
      message: 'Messages fetched successfully',
      sessions: sessionsWithCode
    });

  } catch (err) {
    console.error('Error in fetchMessages:', err);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: err.message 
    });
  }
};

module.exports = {
  createMessage,
  fetchMessages
};
