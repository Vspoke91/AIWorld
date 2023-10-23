/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontawesome: ["Font Awesome 6 Free", "sans-serif"],
      },
    },
  },
  plugins: [],
};
