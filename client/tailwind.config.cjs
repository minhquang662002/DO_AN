/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        xxs: "0.6rem",
        tiny: "0.8rem",
      },
      spacing: {
        120: "28rem",
      },
    },
  },
  plugins: [],
};
