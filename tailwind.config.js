/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#d9e2f1',
          700: '#24385e',
          800: '#1a2b4c',
          900: '#101d36',
        },
        amber: {
          500: '#f5921f',
          600: '#e07e10',
        },
        brand: {
          navy: '#1a2b4c',
          amber: '#f5921f',
          green: '#2ecc71',
          bg: '#f8fafc',
          activeBg: '#e8f0fe',
        }
      }
    },
  },
  plugins: [],
}
