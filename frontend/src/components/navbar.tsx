import React, { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import UserContext from '@/app/context/userContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const {setUser } = useContext(UserContext)
    const [token, setToken] = useState<string | null>(null);
    const [authButtons, setAuthButtons] = useState<React.ReactNode>(null);
    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
      }
    }, []); 
    
    useEffect(() => {
      if (token) {
        setAuthButtons((
          <div className="flex space-x-40">
            <Button
              style={{ cursor: 'pointer' }}
              className="hover:bg-[#000000]"
              onClick={handleSubmit}
            >
              Logout
            </Button>
          </div>
        ));
      } else {
        setAuthButtons((
          <>
            <div className="flex items-center space-x-4">
              <Link  href="/signin"><Button style={{ cursor: 'pointer' }}  className='hover:bg-[#000000] bg-gray-900 '>Sign In</Button></Link>
              <Link href="/signup"><Button style={{ cursor: 'pointer' }} className='bg-gradient-to-r from-purple-400 to-pink-500'>Get Started</Button></Link>
            </div>
          </>
        ));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]); // Rerun when token changes

    const handleSubmit= async(e:React.FormEvent)=>{
      e.preventDefault();
      console.log(token);

      try{
      const response = await axios.get('http://localhost:5000/user/logout',{
        headers: {
            authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      if(response.status === 200){
        // Wrap localStorage access in a browser check
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        setUser({
          fullName: {
            firstName: '',
            lastName: ''
          },
          email: '',
          password: '',
          isVerified: false,
          otp: '',
          otp_expiry: ''
        });
        toast.success('Logged out successfully');
        setToken(null); // Update token state after logout
      }
      else{
        toast.error('Failed to logout');
      }
    }
  catch(err){
    toast.error('Failed to logout'+err);
  }
}


  return (

    <nav className="flex justify-around items-center p-6 bg-transparent text-white top-0 left-0 w-full fixed z-50 bg-dark-500/80 backdrop-blur-lg shadow-md">
      <div className="flex items-center">
        <Link href="/"><h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">SaaSFlow</h1></Link>
      </div>
      
      <div className="flex space-x-6 w-120 justify-around items-center ">
        <Link href="/features" className="text-gray-200 hover:text-white ">Features</Link>
        <Link href="/about" className="text-gray-200 hover:text-white ">About</Link>
        <Link href="/pricing"  className="text-gray-200 hover:text-white ">Pricing</Link>
        <Link href="/docs"  className="text-gray-200 hover:text-white ">Docs</Link> 
         <Link href="/workspace" className="text-gray-200 hover:text-white ">Workspace</Link>
      </div>
      
        {authButtons}
  
    </nav>
  )
}

export default Navbar