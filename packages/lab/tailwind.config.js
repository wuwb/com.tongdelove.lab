const { join } = require('path');
const colors = require('tailwindcss/colors');
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './src/**/*.{ts,tsx,css}'
  ],
  theme: {
    // container: {
    //   center: true,
    // },
    extend: {
      colors: {
        primary: colors.teal,
      },
    },
  },
  // variants: {},
  plugins: [typography],
};
