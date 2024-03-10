/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: { xs: "500px" },
      colors: {
        primary: "rgb(0, 179, 255)",
        secondary: "#eaeaea",
      },
    },
  },
  plugins: [],
};
