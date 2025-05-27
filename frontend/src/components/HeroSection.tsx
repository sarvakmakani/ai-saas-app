import { Button } from "@/components/ui/button";
import Image from "next/image";
import arrow from '@/components/ui/icons8-right-arrow-50.png'

const HeroSection = () => {
  return (
    <>
        <div className="flex flex-col align-center justify-end h-50 mb-10 items-center font-sans">
      
      <div className="inline-block mb-6 px-4 py-1.5 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent rounded-full backdrop-blur-sm ">
            <span className="text-sm font-medium text-gradient">
              Just launched: SaaSFlow 2.0
            </span>
          </div>
    </div>
    <div className="text-center text-7xl flex flex-col align-center justify-center h-60  font-bold font-sans gap-5">
      <div className="gap-5">Build your SaaS <a className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent gap-5">10x</a></div>
      <div className="gap-5"><a className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent gap-5">faster</a> with AI-powered <br />
      <div className="mt-5">tools</div>
      </div>
    </div>

   <div className="flex flex-col align-center justify-top h-50 items-center font-sans">
    <div className="inline-block w-170 px-4 py-1.5 rounded-full backdrop-blur-sm text-shadow-zinc-200  mt-8 text-center font-light text-lg">
      <span className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl animate-fade-in">Launch your next project in minutes, not months. SaaSFlow gives you everything you need to build, launch, and grow your SaaS business.</span></div>
      <div className="flex flex-row gap-5">
      <Button style={{ cursor: 'pointer' }} className="bg-gradient-to-r from-purple-400 to-pink-500  text-white px-6 py-3 rounded-xl  mt-10 h-13 text-[18px] shadow-md transition-all duration-300 ease-in-out hover:brightness-110 hover:shadow-xl hover:-translate-y-1">Get Started Free <Image className="text-white" src={arrow} width={20} height={20} color="white" alt="arrow-right" /></Button>
      <Button style={{ cursor: 'pointer' }} className="border-2 border-pink-500 text-white px-6 py-3 rounded-xl  mt-10 h-13 text-[18px] shadow-md transition-all duration-300 ease-in-out hover:brightness-110 hover:shadow-xl hover:-translate-y-1">See How It Works</Button>
      </div>
   </div>
    </>
  )
}

export default HeroSection