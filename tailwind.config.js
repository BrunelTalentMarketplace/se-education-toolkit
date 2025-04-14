/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          light: "#FFC380",
          DEFAULT: "#FF9933",
          dark: "#E67300",
        },
      },
    },
  },
  plugins: [],
};
