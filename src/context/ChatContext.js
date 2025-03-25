import React, { createContext, useContext, useState, useEffect } from 'react';
import useChatApi from '../hooks/useChatApi';

// Create a context
const ChatContext = createContext();

// Custom hook to use the chat context
export const useChatContext = () => useContext(ChatContext);

// Provider component
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  // Get the API hook
  const { loading, error, state, sendMessage, createSession, getChatHistory, setState } = useChatApi();

  // Load from localStorage on initial mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedState = localStorage.getItem('chatState');
    const savedUser = localStorage.getItem('chatUser');
    const savedSessionId = localStorage.getItem('chatSessionId');
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add a welcome message if no saved messages
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi there, I'm your friendly money mentor. My goal is to help you make informed, confident decisions about your money. You can start by asking me a question. For example, would you like to know the cheapest superfund for you, or an estimate of your super balance at retirement? If there's something else on your mind, just let me know!"
        }
      ]);
    }
    
    if (savedState) {
      setState(JSON.parse(savedState));
    }
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
    
    setInitialized(true);
  }, [setState]);

  // Save to localStorage whenever messages or state changes
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('chatState', JSON.stringify(state));
    }
  }, [state, initialized]);

  useEffect(() => {
    if (initialized && user) {
      localStorage.setItem('chatUser', JSON.stringify(user));
    }
  }, [user, initialized]);
  
  useEffect(() => {
    if (initialized && sessionId) {
      localStorage.setItem('chatSessionId', sessionId);
    }
  }, [sessionId, initialized]);

  // Function to add a new message
  const addMessage = (role, content, id = Date.now().toString()) => {
    const newMessage = { id, role, content };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  };

  // Function to handle user sending a message
  const handleSendMessage = async (content) => {
    // Add user message to the chat
    addMessage('user', content);
    
    try {
      // Get the most recent assistant message (if any)
      const previousMessages = messages.filter(m => m.role === 'assistant');
      const previousResponse = previousMessages.length > 0 ? previousMessages[previousMessages.length - 1].content : '';
      
      // Send message to API
      const response = await sendMessage(content, previousResponse, '', state);
      
      // Add assistant response to the chat
      if (response && response.response) {
        addMessage('assistant', response.response);
      }
      
      return response;
    } catch (err) {
      // Add error message
      addMessage('assistant', 'I apologize, but I encountered an error processing your request. Please try again.');
      console.error('Error sending message:', err);
      throw err;
    }
  };

  // Function to initialize a chat session
  const initializeSession = async (userData) => {
    if (!userData) return;
    
    setUser(userData);
    
    try {
      // Create a session if we don't have one
      if (!sessionId) {
        const session = await createSession(userData.id);
        if (session && session.session_id) {
          setSessionId(session.session_id);
        }
      }
      
      // Get chat history if we have a session
      if (sessionId) {
        const history = await getChatHistory(sessionId);
        if (history && history.length > 0) {
          // Convert history to our format and update messages
          const formattedHistory = history.map(msg => ({
            id: msg.id || Date.now().toString(),
            role: msg.sender_type,
            content: msg.content
          }));
          setMessages(formattedHistory);
        }
      }
    } catch (err) {
      console.error('Error initializing session:', err);
    }
  };

  // Function to clear the chat
  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi there, I'm your friendly money mentor. My goal is to help you make informed, confident decisions about your money. You can start by asking me a question. For example, would you like to know the cheapest superfund for you, or an estimate of your super balance at retirement? If there's something else on your mind, just let me know!"
      }
    ]);
    setState({});
  };

  const value = {
    messages,
    loading,
    error,
    state,
    user,
    sessionId,
    handleSendMessage,
    initializeSession,
    clearChat,
    setUser
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;