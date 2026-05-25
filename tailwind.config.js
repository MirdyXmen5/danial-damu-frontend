/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C2282A',
          primaryHover: '#A61F21',
          primaryLight: '#E25B5D',
          darkBlue: '#2A2A72',
          brightBlue: { DEFAULT: '#264653', light: '#17A2B8' },
          text: { primary: '#111111', secondary: '#555555', muted: '#999999' },
          bg: { light: '#F5F5F5', softBlue: '#FAFAFA' },
          accent: { orange: '#F4A261', green: '#28A745', red: '#DC3545' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        'animationbg-6': {
          '0%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(25%)' }
        }
      },
      animation: {
        'bg-anim-1': 'animationbg-6 3s ease-in-out infinite alternate',
        'bg-anim-2': 'animationbg-6 4s ease-in-out infinite alternate-reverse',
        'bg-anim-3': 'animationbg-6 5s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}
