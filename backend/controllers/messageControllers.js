const { GoogleGenerativeAI } = require('@google/generative-ai');
const PromptSession = require('../models/message');
const generatedCodeModel = require('../models/genratedCodeModels');

const createMessage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const SYSTEM_PROMPT_EXPLAIN = `You are a friendly UI/UX expert. Explain the UI in a conversational, easy-to-understand way that a user would want to read in a chat interface. Keep it brief and engaging. Focus on:
    - What the user will see (main components)
    - How they can interact with it (key actions)
    - What makes it user-friendly (key features)
    Use simple language and avoid technical jargon. **Absolutely avoid using markdown formatting like bold (**), italics (*), or lists (*, -). Keep the explanation under 200 words.`;

    const SYSTEM_PROMPT_GENERATE = `You are a senior React developer. Generate clean, modular, and production-ready React code for the requested feature. Include:
    1. Component structure
    2. State management
    3. Event handlers
    4. Styling
    Only output the complete code without any explanations.`;

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



const filter = { session: session._id };  // criteria to find existing doc
const update = { code };                   // new code value
const options = { upsert: true, new: true, setDefaultsOnInsert: true };

// This will update the code if a document with this session exists, or create a new one.
const generated = await generatedCodeModel.findOneAndUpdate(filter, update, options);

console.log(generated);

  
    res.status(200).json({ 
      message: 'Message added successfully',
      aiReply,
      context: explainContext,
      code,
      sessionId: session._id 
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
