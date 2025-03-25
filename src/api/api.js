import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://your-render-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Chat API functions
export const chatApi = {
  // Process a user message and get a response
  processMessage: async (userQuery, previousSystemResponse = '', fullHistory = '', state = {}) => {
    try {
      const response = await api.post('/api/chat/process', {
        user_query: userQuery,
        previous_system_response: previousSystemResponse,
        full_history: fullHistory,
        state: state
      });
      return response.data;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  },

  // Create a new chat session (if needed)
  createSession: async (userId) => {
    try {
      const response = await api.post('/create_session', {
        user_id: userId,
        platform: 'webchat'
      });
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  // Get chat history for a session
  getChatHistory: async (sessionId) => {
    try {
      const response = await api.get(`/chat_history?session_id=${sessionId}`);
      return response.data.messages;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },
};

// User authentication functions
export const authApi = {
  // Implement auth functions when needed
  login: async (email, firstName, lastName) => {
    // Placeholder for future authentication
    // For now, just return a mock user object
    return {
      id: `user-${Date.now()}`,
      email,
      firstName,
      lastName,
      // Add other user fields as needed
    };
  },
};

export default api;