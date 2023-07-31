/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        showElement: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        hideElement: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
