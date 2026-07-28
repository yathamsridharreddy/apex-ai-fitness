/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#08090D',
          card: 'rgba(255, 255, 255, 0.065)',
          border: 'rgba(255, 255, 255, 0.12)',
          primary: '#0A84FF',
          green: '#30D158',
          orange: '#FF9F0A',
          purple: '#BF5AF2',
          cyan: '#64D2FF',
          error: '#FF453A'
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'apple': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'glow-blue': '0 0 25px rgba(10, 132, 255, 0.35)',
        'glow-green': '0 0 25px rgba(48, 209, 88, 0.35)'
      }
    },
  },
  plugins: [],
}
