/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '192': '48rem',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
