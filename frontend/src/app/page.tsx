
import React from "react";
import HeroSection from "@/components/HeroSection";
import Pricing from "@/components/Pricing";
import Footer from "@/components/footer";
import Robot from '@/components/robot'
import Developers from "@/components/Developers";
import NavBar2 from "@/components/NavBar2";



export default function Home() {

  
  return (
   <section className=" text-white  h-150 bg-gradient-to-t from-[#170a58]/0 to-[#10015da4]">
   <NavBar2 />
   <HeroSection />
   <Robot />
   <Developers />
   <Pricing />
   <Footer />
   </section>
  );
}
