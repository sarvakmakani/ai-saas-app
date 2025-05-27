"use client"
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import UserContext  from '@/app/context/userContext';
import { useContext } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const Signup = () => {

  const router = useRouter();
  const [firstName, setfirstName] = useState('');
  const [lastName,setlastName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonClicked, setbuttonClicked] = useState(false);
  const signupSuccess = () => toast(`${firstName} , your account has been created successfully`);
  const { user, setUser } = useContext(UserContext);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    console.log("context user updated:", user);
  }, [user]);

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
    setbuttonClicked(true);
    const newUser = {
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    }
    console.log(newUser);

    try{
    const response = await axios.post('http://localhost:5000/user/register',newUser);
    console.log(response);
    if(response.status === 200){
      console.log('User created successfully');
      signupSuccess();
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      console.log("context",user);
      router.push(`/otpVerify`);

    }else{
      console.log('User creation failed');
      toast.error('User creation failed');
    }
  }catch(error){
    toast.error('User creation failed '+error);
  }
  }


  
  return (
    <>
    <div className=" bg-gradient-to-t from-[#0a0a0a] via-[#0f111a] to-[#0d1117] flex items-center justify-center px-4 py-28 min-h-screen">
    <Navbar />
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>
        <p className="text-sm text-gray-400 text-center mb-8">Join <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-medium">SaaSFlow</span> today</p>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">FirstName</label>
            <input
              type="text"
              placeholder="John"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">LastName</label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {
            buttonClicked ?(
          <button
            disabled
            type="submit"
            className="w-full bg-gradient-to-r from-purple-400 to-pink-500 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Sign Up
          </button>
            ):(
              <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Sign Up
            </button>
            )
          } 
        </form>

        <div className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <a href="/signin" className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Sign in
          </a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Signup