/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

//Multi-use variables
const headerWidth = "188px";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      50: "50%",
    },
    extend: {
      height: {
        inherit: "inherit",
      },
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
  plugins: [rotateY(), scrollHide()],
};

function scrollHide() {
  return plugin(({ addUtilities }) => {
    addUtilities({
      /* Hide scrollbar for Chrome, Safari, Edge and Opera */
      ".scroll-no-style::-webkit-scrollbar": {
        display: "none",
      },
      /* Hide scrollbar for Firefox and IE */
      ".scroll-no-style": {
        "-ms-overflow-style": "none", // IE
        "scrollbar-width": "none", // Firefox
      },
    });
  });
}

function rotateY() {
  return plugin(({ addUtilities }) => {
    addUtilities({
      ".rotate-y-180": {
        transform: "rotateY(180deg)",
      },
      ".rotate-y-90": {
        transform: "rotateY(90deg)",
      },
      ".rotate-y-0": {
        transform: "rotateY(0deg)",
      },
    });
  });
}
