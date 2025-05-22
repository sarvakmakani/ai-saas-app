"use client"
import React, { useState } from 'react'
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import  UserContext  from '@/app/context/userContext'; // Ensure this is the context object, not the provider
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';


const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const handleSubmit= async(e:React.FormEvent)=>{
      e.preventDefault();
       if (!passwordRegex.test(password)) {
            toast.error('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
          }
          else if(!emailRegex.test(email)){
            toast.error('Please enter a valid email address.');
            return;
          }
      const existingUser = {
        email:email,
        password:password
      }
      console.log(existingUser);

      try{

      const response = await axios.post('http://localhost:5000/user/login',existingUser);
      console.log(response);
      if(response.status === 200){
        console.log('User created successfully');
        const signupSuccess = () => toast(`${response.data.user.fullName?.firstName} ,Welcome back to SaaSFlow`);
        signupSuccess();
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        console.log("context",user);
        setTimeout(() => {
          if(response.data.user.isVerified === true){
            router.push('/');
          }
          else{
            router.push(`/otpVerify`);
          }
        },2000);
      }else{
        console.log('User creation failed');
        toast.error('User creation failed');
      }
    }
  
  catch(error){
    toast.error('User does not exist '+error);
  }
}

  return (
    <>
    <div className="min-h-screen bg-gradient-to-t from-[#170a58]/0 to-[#10015da4] flex items-center justify-center px-4">
     <Navbar />
     <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h2>
        <p className="text-sm text-gray-400 text-center mb-8">Sign in to continue to <span className="text-indigo-400 font-medium">SaaSFlow</span></p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>

        <div className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{' '}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Signin