const { join } = require('path');
const colors = require('tailwindcss/colors');
const typography = require('@tailwindcss/typography');

module.exports = {
  content: ['./src/**/*.{ts,tsx,css}'],
  important: '#__next',
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
  corePlugins: {
    preflight: false,
  },
  // variants: {},
  plugins: [typography],
};
