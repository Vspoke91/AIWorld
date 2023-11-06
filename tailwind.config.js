/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      200: "200%",
    },
    extend: {
      keyframes: {
        sliderbg: {
          "0%": { backgroundPosition: "100%" },
          "100%": { backgroundPosition: "0%" },
        },
      },
      colors: {
        custom_colors_highlight: "#F59E0B",
      },
      fontFamily: {
        fontawesome: ["fontawesome", "sans-serif"],
        Bruno_Ace_SC: ["Bruno Ace SC", "sans-serif"],
      },
    },
  },
  plugins: [],
};
