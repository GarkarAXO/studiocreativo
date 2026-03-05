/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0d33f2",
        accent: "#00ff88", // Verde neón de la nueva navbar
        "background-light": "#f5f6f8",
        "background-dark": "#101322",
        studio: {
          blue: '#0d33f2',
          black: '#101322',
          white: '#f5f6f8',
        }
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
