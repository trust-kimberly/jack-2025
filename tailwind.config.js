/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      scale: {
        108: '1.08',
      },
      fontFamily: {
        garamond: ['Adobe Garamond Pro', 'Garamond', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
