/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",  // where your root HTML file is
    "./src/**/*.{js,jsx,ts,tsx}", // where your React components live
  ],
  theme: {
    extend: {}, // optional: customize theme here
  },
  plugins: [], // optional: add Tailwind plugins here
}
