import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import { tailwindV3Colors } from './src/themes/shared/colors';
import { tailwindTheme } from './src/themes/tailwind/tailwind.theme'; // sharedTheme = require('./src/themes/tailwind/tailwind.theme');

const tailwindConfig: Config = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './src/**/*.{jsx,tsx}',
    '!./src/backend/**/*',
    '!/src/pages/api/**/*',
    './src/**/*.{js,ts,jsx,tsx,css,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // important: '#__next',
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    colors: {
      ...tailwindV3Colors,
      bermuda: '#78dcca',
      tahiti: {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
    },
    fontFamily: {
      sans: tailwindTheme.fontFamily.sans,
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      /**
      spacing: {
        128: '32rem',
      },
      */
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),

    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('rippleui'),
    // tailwindcss 3.3 include by default
    // require('@tailwindcss/line-clamp'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
  corePlugins: {
    preflight: false,
  },
};

export default tailwindConfig;
