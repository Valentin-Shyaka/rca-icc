/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      blue:'#2075f8',
      orange:'#ff7b35',
      violet:'#0b0502',
      grey:'#e5e5e5',
      divBack:'#f2f7ff',

    },
  },
  
  plugins: [],
}

