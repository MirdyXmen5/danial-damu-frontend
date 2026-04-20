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
      }
    },
  },
  plugins: [],
}
