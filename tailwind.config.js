/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-light-gray": "rgb(238, 230, 230)",
      },
      screens: {
        xs: "480px", 
        sm: "640px", 
        md: "768px", 
        lg: "1024px", 
        xl: "1280px", 
        
      },
    },
  },
  plugins: [],
};
