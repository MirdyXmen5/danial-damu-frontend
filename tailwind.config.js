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
          darkBlue: '#1e3a8a',
          brightBlue: { DEFAULT: '#1d4ed8', light: '#60a5fa' },
          text: { primary: 'rgb(17, 24, 39)', secondary: 'rgb(31, 41, 55)', muted: 'rgb(55, 65, 81)' },
          bg: { light: 'rgb(249, 250, 251)', softBlue: 'rgb(219, 234, 254)' },
          accent: { orange: 'rgb(245, 158, 11)', green: 'rgb(22, 163, 74)', red: 'rgb(220, 38, 38)' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
