import React from 'react';
import styled from 'styled-components';

// Parse message for special formatting
const parseMessage = (content) => {
  // If the content is a simple string, return it
  if (typeof content !== 'string') {
    return content;
  }

  // Split the content by code blocks
  const parts = content.split(/(```(?:[\s\S]*?)```)/g);
  
  return parts.map((part, index) => {
    // Check if this part is a code block
    if (part.startsWith('```') && part.endsWith('```')) {
      // Extract language and code
      const match = part.match(/```(\w*)\n([\s\S]*?)```/);
      if (match) {
        const [, language, code] = match;
        return (
          <pre key={index} className="bg-gray-800 text-white p-4 rounded-md my-2 overflow-x-auto">
            {language && <div className="text-xs text-gray-400 mb-2">{language}</div>}
            <code>{code}</code>
          </pre>
        );
      }
    }
    
    // Process regular text with markdown-like formatting
    // For simplicity, we'll just handle basic formatting here
    const formattedText = part
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Newlines to <br>
      .replace(/\n/g, '<br>');
    
    return (
      <span 
        key={index} 
        dangerouslySetInnerHTML={{ __html: formattedText }} 
      />
    );
  });
};

const ChatBubble = ({ message, isUser }) => {
  const { content, role } = message;
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] rounded-lg px-4 py-3 shadow-chat ${
          isUser 
            ? 'bg-primary-light text-white rounded-tr-none' 
            : 'bg-white rounded-tl-none'
        }`}
      >
        <div className="text-sm">
          {parseMessage(content)}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;