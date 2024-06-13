/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E5EFF",
          light: "#eaf1ff",
          "dark-light": "rgba(67,97,238,.15)",
        },
        black: {
          DEFAULT: "#1C1C1C",
          light: "#3E373D",
        },
        white: {
          DEFAULT: "#FFFFFF",
          yellow: "#ddd8c3",
          "dark-yellow": "#c9a181",
        },
        pink: {
          DEFAULT: "#D34F73FF",
        },
      },
    },
  },
  plugins: [],
};
