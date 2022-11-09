/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* primary */
        moderateBlue: "hsl(238, 40%, 52%)",
        moderateBlueHover: "hsl(238, 40%, 67%)",
        softRed: "hsl(358, 79%, 66%)",
        lightGrayishBlue: "hsl(239, 57%, 85%)",
        paleRed: "hsl(357, 100%, 86%)",
        /* neutral */
        darkBlue: "hsl(212, 24%, 26%)",
        grayishBlue: "hsl(211, 10%, 45%)",
        grayishBlueBorder: "hsl(211, 10%, 80%)",
        lightGray: "hsl(223, 19%, 93%)",
        veryLightGray: "hsl(228, 33%, 97%)",
        white: "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      transitionTimingFunction: {
        easeOutIn: "cubic-bezier(0, 0, 0.67, 1.63)",
      },
      animation: {
        shake: "shake 0.2s ease-in-out 0s 2",
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(0.5rem)",
          },
          "75%": {
            transform: "translateX(-0.5rem)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
