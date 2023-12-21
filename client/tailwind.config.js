// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        xl: "0 4px 25px -5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
