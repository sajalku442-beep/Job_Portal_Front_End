// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include all source files
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // 👈 custom breakpoint
        "3xl": "1800px", // 👈 for ultrawide screens
      },
    },
  },
  plugins: [],
};
