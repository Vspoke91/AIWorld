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
        inherit: "inherit",
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
        rocketRightOutIn: {
          "30%": { transform: "translateX(10px)", opacity: 0 },
          "31%": { transform: "translateX(-10px)", opacity: 0 },
        },
      },
      animation: {
        rocketRightOutIn: "rocketRightOutIn 1s ease-in-out 1",
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
  plugins: [rotateY(), rotateX(), scrollHide(), perspective()],
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

function perspective() {
  return plugin(
    ({ matchUtilities, theme }) => {
      matchUtilities(
        {
          perspective: (value) => ({
            perspective: value,
          }),
        },
        { values: theme("perspective") },
      );
    },
    {
      theme: {
        perspective: {
          none: "none",
          "50em": "50em",
        },
      },
    },
  );
}

function rotateX() {
  return plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        //adds rotate-x utility (ex: rotate-x-180),
        //works with custom values (ex: rotate-x-[variable])
        "rotate-x": (value) => ({
          transform: `rotateX(${value})`,
        }),
      },
      //adds values from theme "rotate" (default values of rotate in tailwind ex: rotate-180),
      //and supports negative values (ex: -rotate-x-180)
      { values: theme("rotate"), supportsNegativeValues: true },
    );
  });
}

function rotateY() {
  return plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        //adds rotate-y utility (ex: rotate-y-180),
        //and works with custom values (ex: rotate-y-[variable])
        "rotate-y": (value) => ({
          transform: `rotateY(${value})`,
        }),
      },
      //adds values from theme "rotate" (default values of rotate in tailwind ex: rotate-180),
      //and supports negative values (ex: -rotate-y-180)
      { values: theme("rotate"), supportsNegativeValues: true },
    );
  });
}
