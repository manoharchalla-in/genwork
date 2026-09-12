/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#0B0E14',
          900: '#10151E',
          850: '#131822',
          800: '#1A212E',
          700: '#263042',
          600: '#38455B',
        },
        champagne: {
          500: '#C29A64',
          400: '#D4AF7A',
          300: '#E2C496',
          200: '#EFE0C4',
          100: '#FAF4E8',
        },
        ivory: {
          50: '#F7F5F0',
          100: '#EFECE6',
        },
        ink: {
          900: '#14161C',
          800: '#232630',
        },
        emerald: {
          500: '#1E7A5C',
          600: '#166148',
        },
        garnet: {
          500: '#8C2F39',
          600: '#73232C',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glossy': '0 2px 4px rgba(0, 0, 0, 0.4), 0 24px 48px rgba(0, 0, 0, 0.5)',
        'foil': '0 0 20px rgba(212, 175, 122, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
