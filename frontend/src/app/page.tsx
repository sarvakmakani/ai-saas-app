/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import arrow from '@/components/ui/icons8-right-arrow-50.png'
import Spline from '@splinetool/react-spline/next';
import TypingEffect from "@/components/ui/typingEffect";
import Pricing from "@/components/Pricing";
import Footer from "@/components/footer";



export default function Home() {
  return (
   <section className=" text-white  h-150 bg-gradient-to-t from-[#170a58]/0 to-[#10015da4]">
    <div className="flex flex-col align-center justify-end h-50 mb-10 items-center font-sans">
      
      <div className="inline-block mb-6 px-4 py-1.5 bg-[#3818d6] rounded-full backdrop-blur-sm text-white">
            <span className="text-sm font-medium text-gradient">
              Just launched: SaaSFlow 2.0
            </span>
          </div>
    </div>
    <div className="text-center text-7xl flex flex-col align-center justify-center h-60  font-bold font-sans gap-5">
      <div className="gap-5">Build your SaaS <a className="text-[#3818d6] gap-5">10x</a></div>
      <div className="gap-5"><a className="text-[#3818d6] gap-5">faster</a> with AI-powered <br />
      <div className="mt-5">tools</div>
      </div>
    </div>

   <div className="flex flex-col align-center justify-top h-50 items-center font-sans">
    <div className="inline-block w-170 px-4 py-1.5 rounded-full backdrop-blur-sm text-shadow-zinc-200  mt-8 text-center font-light text-lg">
      <span className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl animate-fade-in">Launch your next project in minutes, not months. SaaSFlow gives you everything you need to build, launch, and grow your SaaS business.</span></div>
      <div className="flex flex-row gap-5">
      <Button style={{ cursor: 'pointer' }} className="bg-gradient-to-r from-[#3818d6] via-[#5f32ff] to-[#a084f9] text-white px-6 py-3 rounded-xl  mt-10 h-13 text-[18px] shadow-md transition-all duration-300 ease-in-out hover:brightness-110 hover:shadow-xl hover:-translate-y-1">Get Started Free <Image className="text-white" src={arrow} width={20} height={20} color="white" alt="arrow-right" /></Button>
      <Button style={{ cursor: 'pointer' }} className="border-2 border-[#a084f9] text-white px-6 py-3 rounded-xl  mt-10 h-13 text-[18px] shadow-md transition-all duration-300 ease-in-out hover:brightness-110 hover:shadow-xl hover:-translate-y-1">See How It Works</Button>
      </div>
   </div>
  <div className="flex justify-center items-center mt-10 flex-row">
     <TypingEffect />
    <div className="rounded-2xl  shadow-lg">
     <Spline
        scene="https://prod.spline.design/9vrxvm7fDwLq4QF3/scene.splinecode" 
        style={{
        width:600,
        height:700}}
      />
    </div>
    
  </div>

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
    <div className="flex justify-center items-center flex-row p-15">
  <Pricing />
  </div>
  <div className="p-5 px-17 bg-[#0f0f14] border-t-1 border-t-zinc-600">
          <Footer />
</div>
   </section>
  );
}
