/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans : ['Martel Sans', 'sans-serif'],
        outfit : ['Outfit', 'sans-serif'],
        header : ['Alfa Slab One', 'cursive']
      },
      boxShadow:{
        '3xl' : '0px 0px 100px #72BFD5',
        'divShadow' : '1px 1px 10px white',
      },
      blur:{
        '3xl' : '85px'
      },
      colors:{
        'regal-blue': '#243c5a',
      }
    },
  },
  plugins: [],
}