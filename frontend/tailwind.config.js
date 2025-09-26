// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // This line tells Tailwind to scan all pages and components for class names.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your existing design tokens.
      colors: {
        'background': 'hsl(0 0% 100%)',
        'foreground': 'hsl(0 0% 10%)',
        'primary': 'hsl(0 0% 15%)',
        'secondary': 'hsl(0 0% 95%)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },

      // The new animation block for the scrolling marquee.
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}