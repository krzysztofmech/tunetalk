/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "#EEA4BB",
          50: "#FCF1F4",
          100: "#FBE9ED",
          200: "#F8D8E0",
          300: "#F4C6D3",
          400: "#F1B5C7",
          500: "#EEA4BB",
          600: "#E886A6",
          700: "#E36892",
          800: "#DD4A7F",
          900: "#D82C6D",
          950: "#CB2666",
        },
        dark: {
          DEFAULT: "#000000",
          50: "#737373",
          100: "#6C6C6C",
          200: "#606060",
          300: "#535353",
          400: "#464646",
          500: "#393939",
          600: "#2D2D2D",
          700: "#202020",
          800: "#131313",
          900: "#060606",
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
};
