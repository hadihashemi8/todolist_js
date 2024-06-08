/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode : 'class',
  theme: {
    extend: {
      colors: {
        "basic-Color": " #DBDB6F",
        "secondry-Color": "#9F0207",
        "primary-Color": "#FE7C74",
        "btn-Color": "#518545",
      },
     
    },
  },
  plugins: [],
};
