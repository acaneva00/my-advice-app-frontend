import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useChatContext } from '../context/ChatContext';

const LoginPage = () => {
  const { user } = useChatContext();
  
  // Redirect to chat if user is already authenticated
  if (user) {
    return <Navigate to="/chat" />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary-dark flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-white mb-6">
          Finance Chat
        </h1>
        <p className="text-center text-white mb-8">
          Your AI-powered financial advisor
        </p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <p className="text-center text-sm text-white">
          Get personalized advice on superannuation, retirement planning, and more
        </p>
      </div>
    </div>
  );
};

export default LoginPage;