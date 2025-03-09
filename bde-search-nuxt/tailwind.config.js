/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        "bde-blue": "#155798",
        "bde-orange": "#fb761f",
        "bde-highlight": "#e2e8f0",
      },
    },
  },
  plugins: [],
};
