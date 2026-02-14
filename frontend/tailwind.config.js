/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        slate: { 850: '#151e2e', 900: '#0f172a' },
        cyan: { 500: '#06b6d4', 600: '#0891b2' }
      }
    },
  },
  plugins: [],
}