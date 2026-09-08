/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chatgpt: {
          bg: '#f9f9f9',
          sidebarBg: '#f9f9f9',
          sidebarHover: '#ececec',
          activeItem: '#e3e3e3',
          border: '#e5e5e5',
          textPrimary: '#0d0d0d',
          textSecondary: '#676767',
          blueBtn: '#3b82f6'
        }
      }
    },
  },
  plugins: [],
}
