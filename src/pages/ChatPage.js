import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatWindow from '../components/ChatWindow';
import { useChatContext } from '../context/ChatContext';

const ChatPage = () => {
  const { user, initializeSession } = useChatContext();
  
  useEffect(() => {
    // Initialize session when the component mounts if user exists
    if (user) {
      initializeSession(user);
    }
  }, [user, initializeSession]);
  
  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow overflow-hidden">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;