/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFDE33",
        yellowDisable: "#FFDE334D",
        orange: "#FFAB08",
        gray: "#697675",
        subOrange: "#FF7008",
        subGreen: "#15E4CB",
        customGray: "#97A5A4",
        dateGray: "#00000080",
        customGray1: "#97A5A499",
        customGray2: "#97A5A450",
        borderGray: "#D9D9D9",
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
