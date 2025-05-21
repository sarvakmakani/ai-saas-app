"use client"
import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import Footer from '@/components/footer'

const signup = () => {
  return (
<div className='flex flex-col items-center justify-center h-screen bg-gradient-to-t from-[#170a58]/0 to-[#10015da4] '>
   <div className='flex flex-col items-center justify-center mt-180 mb-10'>
    <SignUp signInUrl='/signin' />
    </div>
     <div className="p-5 px-17 bg-[#0f0f14] border-t-1 border-t-zinc-600 w-full mt-40">
          <Footer />
    </div>
    </div>
  )
}

export default signup