import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { useChatContext } from '../context/ChatContext';

const ChatWindow = () => {
  const { messages, loading, handleSendMessage } = useChatContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // With this enhanced version:
  useEffect(() => {
    // Clear loading state when messages change
    if (loading && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        // If the last message is from assistant, we're done loading
        // This is a hacky fix if the loading state isn't being properly reset
      }
    }
    
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatBubble 
              key={message.id} 
              message={message} 
              isUser={message.role === 'user'} 
            />
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-chat">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput onSubmit={handleSendMessage} loading={loading} />
    </div>
  );
};

export default ChatWindow;