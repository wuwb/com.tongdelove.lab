const { join } = require('path');
const colors = require('tailwindcss/colors');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,css}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
