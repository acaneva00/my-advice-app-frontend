import { useState, useCallback } from 'react';
import { chatApi } from '../api/api';

const useChatApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState({});

  // Function to send a message to the API
  const sendMessage = useCallback(async (message, previousResponse = '', history = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await chatApi.processMessage(message, previousResponse, history, state);
      
      // Update the state with the returned state from the API
      if (response.state) {
        setState(response.state);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred while processing your message');
      setLoading(false);
      throw err;
    }
  }, [state]);

  // Function to create a new chat session
  const createSession = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await chatApi.createSession(userId);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred while creating a chat session');
      setLoading(false);
      throw err;
    }
  }, []);

  // Function to get chat history
  const getChatHistory = useCallback(async (sessionId) => {
    setLoading(true);
    setError(null);
    
    try {
      const messages = await chatApi.getChatHistory(sessionId);
      setLoading(false);
      return messages;
    } catch (err) {
      setError(err.message || 'An error occurred while fetching chat history');
      setLoading(false);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    state,
    sendMessage,
    createSession,
    getChatHistory,
    setState,
  };
};

export default useChatApi;