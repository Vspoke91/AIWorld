/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom_highlight: "#F59E0B",
      },
      fontFamily: {
        fontawesome: ["Font Awesome 6 Free", "sans-serif"],
      },
    },
  },
  plugins: [],
};
