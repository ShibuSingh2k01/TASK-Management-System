// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A202C", // Dark Charcoal
        secondary: "#2D3748", // Charcoal Gray
        background: "#171923", // Almost Black
        "button-bg": "#48BB78", // Emerald Green
        "button-text": "#E2E8F0", // Light Gray
        text: "#E2E8F0", // Light Gray
        accent: "#48BB78", // Emerald Green
      },
    },
  },
  plugins: [],
};
