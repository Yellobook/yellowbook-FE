/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFDE33",
        orange: "#FFAB08",
        gray: "#697675",
        subOrange: "#FF7008",
        subGreen: "#15E4CB",
      },
      screens: {
        lg: "1375px",
      },
    },
    fontFamily: {
      gmarket: ["gmarket"],
    },
  },
};
