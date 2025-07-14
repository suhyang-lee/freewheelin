/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Background Colors
        "problem-left": "#E8E8E8",
        "problem-right": "#5C5C5C",

        // Mono Colors
        "mono-F5F5F5-gray200": "#F5F5F5",
        "mono-959595-gray600": "#959595",
        "mono-333333-gray900": "#333333",
        "mono-C0C0C0-gray500": "#C0C0C0",
        "mono-white": "#FFFFFF",
        "mono-FAFAFA-gray100": "#FAFAFA",
        "mono-707070-gray700": "#707070",
        "mono-5C5C5C-gray800": "#5C5C5C",
        "mono-E0E0E0-gray400": "#E0E0E0",
        "mono-E8E8E8-gray300": "#E8E8E8",
        "mono-black": "#000000",

        // Core Colors
        "core-00ABFF-blue300": "#00ABFF",

        // Sub Colors
        "sub-54C0B1-green100": "#54C0B1",
        "sub-FFC64D-yellow100": "#FFC64D",
        "sub-FD5354-red100": "#FD5354",
      },
    },
  },
  plugins: [],
};
