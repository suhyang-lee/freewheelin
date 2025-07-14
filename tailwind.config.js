/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "problem-left": "#E8E8E8",
        "problem-right": "#5C5C5C",
      },
    },
  },
  plugins: [],
};
