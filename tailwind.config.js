/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-light-gray": "rgb(238, 230, 230)",
      },
    },
  },
  plugins: [],
};

