// tailwind.config.js
const tailwindConfig =   {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: { extend: { /* ... */ } },
  plugins: []
}

export default tailwindConfig;
