"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import WorkspaceNavbar from '@/components/WorkspaceNavbar';
import { useContext } from 'react';
import UserContext from '@/app/context/userContext';
import CodeView from '@/components/codeView';

interface Message {
  sender: 'user' | 'ai';
  content: string;
  createdAt: string;
}

interface Session {
  _id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

const CodeAndPromptArea = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }

    // Fetch user profile
    axios.get(`http://localhost:5000/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    }).catch(err => {
      console.log(err);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      router.push('/signin');
    });

    // Fetch messages
    fetchMessages(token);
  }, [router]);

  const fetchMessages = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:5000/messages/messages', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Fetched sessions:', response.data);

      if (response.status === 200 && response.data.sessions.length > 0) {
        const latestSession = response.data.sessions[0];
        console.log('Setting current session:', latestSession);
        setCurrentSession(latestSession);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const sessionId = currentSession?._id;
      
      const response = await axios.post('http://localhost:5000/messages/messages',
        { 
          content: prompt,
          sessionId: sessionId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        if (token) {
          await fetchMessages(token);
        }
        setPrompt('');
      }
    } catch (error) {
      console.error('Error submitting prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-t from-[#0a0a0a] via-[#0f111a] to-[#0d1117] text-white flex flex-col overflow-hidden">
      <WorkspaceNavbar />
      
      <div className="flex flex-1 h-[calc(100vh-64px)] gap-4 overflow-hidden">
        {/* Chat and Prompt Area */}
        <div className="w-[30%] flex flex-col border-[#232122] border-2 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex-shrink-0">
            <h2 className="text-lg font-semibold text-white">Chat</h2>
            <p className="text-sm text-gray-400">Ask me anything about coding</p>
          </div>

          <div className="flex-1 min-h-0">
            <div className="h-full overflow-y-auto chat-scrollbar">
              <div className="p-4 space-y-4">
                {/* Welcome Message */}
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800 shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="text-sm font-bold">AI</span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">AI Assistant</span>
                  </div>
                  <p className="text-gray-300">Hello{user?.fullName?.firstName ? `, ${user.fullName.firstName}` : ''}! Ask me to build anything, and I&apos;ll help you create it!</p>
                </div>

                {/* Messages */}
                {currentSession?.messages && currentSession.messages.length > 0 ? (
                  currentSession.messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md' 
                            : 'bg-[#0a0a0a] text-gray-300 border border-gray-800 shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.sender === 'ai' && (
                            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                              <span className="text-xs font-bold">AI</span>
                            </div>
                          )}
                          <span className="text-xs font-medium opacity-70">
                            {message.sender === 'user' ? 'You' : 'AI Assistant'}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm text-center bg-[#0a0a0a] rounded-lg p-4 border border-gray-800">
                    No messages yet. Start a conversation!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="border-t border-gray-800 p-4 bg-[#0a0a0a] flex-shrink-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to build..."
                  className="w-full h-12 bg-[#0a0a0a] rounded-lg py-2 px-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-800"
                />
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Attach files"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isLoading || !prompt.trim()
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Code'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Code Display Area */}
       
            <CodeView  />
          
      </div>

      <style jsx global>{`
        .chat-scrollbar {
          scrollbar-width: none;  /* Firefox */
          -ms-overflow-style: none;  /* IE and Edge */
        }
        .chat-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
};

export default CodeAndPromptArea;