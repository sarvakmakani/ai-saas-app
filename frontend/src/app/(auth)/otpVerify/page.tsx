"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext,useState } from 'react';
import  UserContext  from '@/app/context/userContext';


export default function VerifyOtp() {

    const router = useRouter();
    const [otp, setOtp] = useState('');

    const {user} = useContext(UserContext);
    console.log("user",user);
    


    if (user.isVerified === true) {
      router.push("/signin");
    }

    const handleSubmit= async(e:React.FormEvent)=>{
      e.preventDefault();
      const existingUser = {
        email: user.email,
        otp: otp,
      }

      try{

      const response = await axios.post('http://localhost:5000/user/verifyOtp', existingUser);
      console.log(response);
      if (response.status === 200) {
        toast.success('OTP verified successfully');
        console.log('OTP verified successfully');
        router.push('/');
      } else {
        console.log('User creation failed');
        toast.error('User creation failed');
      }

      }catch(error){
        console.log(error);
        toast.error('Enter valid OTP');
      }
    };
  return (
  
    <div className="min-h-screen  bg-gradient-to-t from-[#170a58]/0 to-[#10015da4] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-400 text-center mb-8">
          We&apos;ve sent a 6-digit code to your email
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            {/* <label className="block text-sm font-medium text-gray-300 mb-3">
              Enter OTP
            </label> */}
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              maxLength={6}
              inputMode="numeric"
              placeholder="Enter your 6-digit OTP"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-widest text-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-sm text-center text-gray-400 mt-6">
          Didn&apos;t receive the code?{' '}
          <button className="text-indigo-400 hover:underline">Resend OTP</button>
        </div>
      </div>
    </div>
  );
}

