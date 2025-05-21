"use client"
import Footer from '@/components/footer'
import { SignIn } from '@clerk/nextjs'
import React from 'react'


const signin = () => {
  return (
   <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-t from-[#170a58]/0 to-[#10015da4] '>
   <div className='flex flex-col items-center justify-center mt-180 mb-10'>
    <SignIn signUpUrl='/signup' />
    </div>
     <div className="p-5 px-17 bg-[#0f0f14] border-t-1 border-t-zinc-600 w-full mt-40">
          <Footer />
    </div>
    </div>
  )
}

export default signin