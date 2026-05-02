/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: 'rgb(3, 7, 18)',
        },
      },
      backdropBlur: {
        xl: '20px',
      },
    },
  },
  plugins: [],
}
