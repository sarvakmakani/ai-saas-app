/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'

const Developers = () => {
  return (
     <div className="flex justify-center items-center mt-10 flex-row p-25">
    <div className="flex justify-evenly items-center mt-10 flex-row bg-[#060628] w-screen h-120 border-1 border-transparent rounded-3xl  gap-4">
      <div className="h-90 w-140 flex flex-col">
          <span className="text-3xl font-bold text-white font-sans">
            Why developers <span className="text-[#ff0404]">love us ❤️</span>
          </span><br/>
          <span className="text-lg font-light text-gray-400 font-sans">
            We've built the platform we always wanted for ourselves. Fast, flexible, and designed with developer experience in mind.
          </span>
          <span className="text-lg font text-white font-sans flex flex-col mt-7">
             <ul className="gap-2 flex flex-col">
              <li>✔️ TypeScript & React support</li>
              <li>✔️ Serverless architecture</li>
              <li>✔️ Developer Experience</li>
              <li>✔️ Extensive documentation</li>
              <li>✔️ Flexible</li>
              <li>✔️ Fast</li>
             </ul>
          </span>
      </div>
  <div className=" bg-[#13132b] rounded-xl shadow-lg p-6 h-110  font-mono text-sm leading-relaxed text-gray-300">
    <p className="mb-2 text-gray-400">// It's this simple to get started</p>
    <code className="block mb-4 text-white">import {'{ createApp }'} from 'saasflow';</code>

    <code className="block text-white">const app = createApp({`{`}</code>
    <code className="block pl-4 text-white">name: 'My Awesome SaaS',</code>
    <code className="block pl-4 text-white">theme: 'dark',</code>
    <code className="block text-white">{`});`}</code>

    <p className="my-4 text-gray-400">// Add AI capabilities</p>
    <code className="block text-white">app.useAI({`{`}</code>
    <code className="block pl-4 text-white">model: 'advanced',</code>
    <code className="block pl-4 text-white">features: ['code-generation', 'debugging']</code>
    <code className="block text-white">{`});`}</code>

    <p className="my-4 text-gray-400">// Deploy with one command</p>
    <code className="block text-white">app.deploy();</code>
  </div>
      </div>
    </div>
  )
}

export default Developers