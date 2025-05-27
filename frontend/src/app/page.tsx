import React from "react";
import HeroSection from "@/components/HeroSection";
import Pricing from "@/components/Pricing";
import Footer from "@/components/footer";
import Robot from '@/components/robot'
import Developers from "@/components/Developers";
import NavBar2 from "@/components/NavBar2";


export default function Home() {


  return (
   <section className=" text-white  h-screen  bg-gradient-to-t from-[#0a0a0a] via-[#0f111a] to-[#0d1117]">
   <NavBar2 />
   <HeroSection />
   <Robot />
   <Developers />
   <Pricing />
   <Footer />
   </section>
  );
}
