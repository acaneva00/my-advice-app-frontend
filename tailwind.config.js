/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4361ee',
          DEFAULT: '#3a0ca3',
          dark: '#7209b7',
        },
        secondary: {
          light: '#f72585',
          DEFAULT: '#f72585',
          dark: '#b5179e',
        },
        background: {
          light: '#ffffff',
          DEFAULT: '#f8f9fa',
          dark: '#e9ecef',
        },
        chatBubble: {
          user: '#e9f5ff',
          assistant: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'chat': '0 2px 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}