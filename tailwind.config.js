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
        accent: "#00ff88",
        "background-light": "#f8fafc",
        "background-dark": "#05070a", // Obsidian profundo
        studio: {
          blue: '#0d33f2',
          black: '#05070a',
          white: '#f8fafc',
          obsidian: '#0a0d14',
          slate: '#1e293b',
        }
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        'tightest': '-.06em',
        'tighter': '-.04em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
      },
      borderRadius: {
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
