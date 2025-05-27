/* eslint-disable react/no-unescaped-entities */
"use client";
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import UserContext from '@/app/context/userContext';

const WorkspaceSearch = () => {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [Token, setToken] = useState("")
  const [messages, setMessages] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin')
    }
    setToken(token || "");
    
    axios.get(`http://localhost:5000/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(err => {
      console.log(err)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      router.push('/signin')
    })
  }, [router, Token])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!messages.trim()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/messages/messages',
        {
          content: messages
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setMessages('');
        router.push('/codeAndPromptArea');
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-t from-[#0a0a0a] via-[#0f111a] to-[#0d1117] text-white flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-white ml-19">
          <Link href="/"><span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">SaaSFlow</span></Link>
        </h1>
        <div className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 mr-10 mt-4 rounded-full text-sm font-semibold">
          <span className="rounded-full bg-pink-700 w-6 h-6 flex items-center justify-center text-sm">A</span>
          <span>{user.fullName?.firstName || ''}'s SaaSFlow</span>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        You write the <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">vision</span>. We write the code
      </h2>
      <p className="text-gray-300 text-center text-lg mb-10">
        Idea to app in seconds, with your personal full stack engineer
      </p>

      {/* Prompt Box */}
      <form onSubmit={submitHandler} className="bg-black bg-opacity-60 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl">
        <textarea
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Ask SaaSFlow..."
          className="w-full h-24 bg-transparent outline-none text-white text-sm resize-none placeholder-gray-400"
        ></textarea>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-white font-medium flex items-center space-x-2">
            <span className="material-icons text-base">attach_file</span>
            <span className="underline cursor-pointer">Attach</span>
          </div>
          <button 
            type="submit"
            
            className="flex items-center space-x-1 bg-gray-800 text-white px-2 py-2 rounded-full hover:bg-gray-700 cursor-pointer"
          >
            <span className="material-icons text-base">arrow_upward</span>
          </button> 
        </div>
      </form>
    </main>
  )
}

export default WorkspaceSearch