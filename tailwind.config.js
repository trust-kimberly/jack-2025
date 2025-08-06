/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      scale: {
        108: '1.08',
      },
      fontFamily: {
        minion: ['Minion Pro', 'serif'],
      },
      fontWeight: {
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
};
