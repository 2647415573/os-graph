/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4DA3FF',
          DEFAULT: '#2F80ED',
          dark: '#1E5BB0',
        },
        secondary: {
          light: '#9F72CF',
          DEFAULT: '#7F4BBF',
          dark: '#5D2E9E',
        },
        background: {
          light: '#F8F9FA',
          DEFAULT: '#F0F2F5',
          dark: '#E4E6EB',
        },
      },
    },
  },
  plugins: [],
} 