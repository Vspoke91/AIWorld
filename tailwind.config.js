/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

const rotateY = plugin(({ addUtilities }) => {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

//Multi-use variables
const headerWidth = "188px";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      50: "50%",
    },
    extend: {
      width: {
        custom_header: headerWidth,
      },
      margin: {
        custom_header: headerWidth,
      },
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
  plugins: [rotateY],
};
