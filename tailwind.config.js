/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"], // adjust paths
  theme: {
    extend: {
      fontFamily: {
        foundation: ["foundation", "sans-serif"],
        fredericka: ["fredericka", "sans-serif"],
      },
      colors: {
        primary: "#99d5c9",
        secondary: "#6c969d",
        tertiary: "#645E9D",
        fontPrimary: "#392B58",
        fontSecondary: "#2D0320",
      },
    },
  },
  plugins: [],
};
