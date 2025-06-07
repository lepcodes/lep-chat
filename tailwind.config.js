/** @type {import('tailwindcss').Config} */
module.exports = {
  // Make sure dark mode is enabled
  darkMode: 'class',

  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add your theme colors here
      colors: {
        'clr-1': '#b5e9db',
        'clr-2': '#87cbc9',
        'clr-2-5': '#24bab5',
        'clr-3': '#177774',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}