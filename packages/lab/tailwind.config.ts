const { fontFamily } = require('tailwindcss/defaultTheme')
import { type Config } from "tailwindcss";

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx,css}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: '#__next',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2250px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    
    require('@tailwindcss/typography')
    // tailwindcss 3.3 include by default
    // require('@tailwindcss/line-clamp'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
