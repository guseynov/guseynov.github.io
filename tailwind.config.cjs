/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        gray: '#565656',
        dark: '#171717',
      },
      borderColor: {
        gray: '#565656',
      },
      fontFamily: {
        milligram: ['milligram', 'sans-serif'],
        dirtyline: ['dirtyline', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
