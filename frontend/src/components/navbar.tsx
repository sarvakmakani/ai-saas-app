import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center p-6 bg-transparent text-white top-0 left-0 w-full fixed z-50 bg-dark-500/80 backdrop-blur-lg shadow-md">
      <div className="flex items-center">
        <Link href="/"><h1 className="text-3xl font-bold text-[#3818d6]">SaaSFlow</h1></Link>
      </div>
      <div className="flex space-x-6 w-120 justify-around items-center ">
        <Link href="/features" className="text-gray-200 hover:text-white ">Features</Link>
        <Link href="/about" className="text-gray-200 hover:text-white ">About</Link>
        <Link href="/pricing"  className="text-gray-200 hover:text-white ">Pricing</Link>
        <Link href="/docs"  className="text-gray-200 hover:text-white ">Docs</Link> 
         <Link href="/playground" className="text-gray-200 hover:text-white ">Playground</Link>
      </div>
      <div className="flex space-x-4 ">
        <Link  href="/signin"><Button style={{ cursor: 'pointer' }}  className='hover:bg-[#000000] '>Sign In</Button></Link>
        <Link href="/signup"><Button style={{ cursor: 'pointer' }} className='bg-[#3818d6] hover:bg-[#2f14b3]'>Get Started</Button></Link>
      </div>
    </nav>
  )
}

export default Navbar