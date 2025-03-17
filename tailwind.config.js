/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#FBFBFB",
        secondary : "#F9A825",
        accent : "#3674B5"
      }
    },
  },
  plugins: [],
}