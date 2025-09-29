/** @type {import('tailwindcss').Config} */
export default = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0F1115",
          secondary: "#161A21",
          tertiary: "#1E242C",
          accent: "#232B35"
        },
        brand: {
          emerald: "#33F3A7",
          amber: "#FFB347",
          red: "#FF4D4F",
          blue: "#3D8BFF",
          violet: "#7F6BFF"
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1.2s linear infinite',
        'dash': 'dash 4s linear infinite'
      },
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: 1 },
          '25%, 75%': { opacity: .25 }
        },
        dash: {
          '0%': { 'stroke-dashoffset': 1000 },
          '100%': { 'stroke-dashoffset': 0 }
        }
      }
    }
  },
  plugins: []
};