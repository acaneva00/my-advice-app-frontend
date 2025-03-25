import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSubmit, loading }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || loading) return;
    
    onSubmit(message);
    setMessage('');
  };

  // Handle input resize for multi-line messages
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize the textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t border-gray-200 bg-white p-4 sticky bottom-0"
    >
      <div className="flex items-end gap-2 relative">
        <div className="flex-grow relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
            className="w-full border border-gray-300 rounded-full py-3 px-4 pr-12 resize-none min-h-[48px] max-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            style={{ height: '48px' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || loading}
          className={`rounded-full p-3 ${
            !message.trim() || loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark'
          } transition-colors duration-200`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;