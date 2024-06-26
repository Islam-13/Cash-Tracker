/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: { sm: "640px", tab: "840px" },
    extend: {},
    plugins: [],
  },
};
