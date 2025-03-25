# my-advice-app-frontend

A modern React-based chat interface for the Finance Advice API.

## Overview

This frontend application provides a user-friendly chat interface that communicates with your FastAPI backend. It's designed to be responsive, accessible, and easy to maintain as you expand to other platforms like Instagram Messenger and WhatsApp.

## Features

- Responsive chat interface with message bubbles
- User authentication
- Persistent chat history
- Session management
- Clean API integration
- Mobile-friendly design

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/finance-chat-frontend.git
cd finance-chat-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your API URL
```
REACT_APP_API_URL=https://your-render-api.onrender.com
```

4. Start the development server
```bash
npm start
```

The app should now be running at http://localhost:3000

## Deployment

### Deploying to Netlify

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set the build command to `npm run build` and the publish directory to `build`
4. Add your environment variables in the Netlify dashboard
5. Deploy!

### Deploying to Vercel

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy using Vercel CLI
```bash
vercel
```

3. Add your environment variables in the Vercel dashboard

## Project Structure

- `src/api/` - API interaction functions
- `src/components/` - Reusable UI components
- `src/context/` - React Context for global state management
- `src/hooks/` - Custom React hooks
- `src/pages/` - Main application pages
- `src/styles/` - CSS and Tailwind styles
- `src/utils/` - Utility functions

## Expanding to Other Platforms

This frontend is designed with a clean separation between the UI and the API integration, making it easy to add support for other platforms:

1. **Instagram Messenger Integration**:
   - Implement webhook handling in your backend
   - Share the same API logic between platforms

2. **WhatsApp Integration**:
   - Use the WhatsApp Business API
   - Connect it to the same backend endpoints

The key is that your API-only backend on Render handles the core logic, while platform-specific frontends just need to implement the appropriate message handling and UI.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
