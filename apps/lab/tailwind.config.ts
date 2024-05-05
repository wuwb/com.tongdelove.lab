import { type Config } from 'tailwindcss'
import defaultTheme, { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
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
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    screens: {
      ...defaultTheme.screens,
      // device define
      mobile: { max: '639px' },
      tablet: { min: '640px', max: '1023px' },
      desktop: { min: '1024px' },

      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2250px',
    },
    colors: {
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
      serif: [...fontFamily.serif],
      mono: [...fontFamily.mono],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      height: {
        mobileScreen: ['100vh /* fallback for Opera, IE and etc. */', '100svh'],
      },
      colors: {
        fgMain: {
          0: 'rgb(var(--color-base-main-0) / <alpha-value>)',
          100: 'rgb(var(--color-base-main-100) / <alpha-value>)',
          200: 'rgb(var(--color-base-main-200) / <alpha-value>)',
          300: 'rgb(var(--color-base-main-300) / <alpha-value>)',
          400: 'rgb(var(--color-base-main-400) / <alpha-value>)',
          500: 'rgb(var(--color-base-main-500) / <alpha-value>)',
          600: 'rgb(var(--color-base-main-600) / <alpha-value>)',
          700: 'rgb(var(--color-base-main-700) / <alpha-value>)',
          800: 'rgb(var(--color-base-main-800) / <alpha-value>)',
          900: 'rgb(var(--color-base-main-900) / <alpha-value>)',
          1000: 'rgb(var(--color-base-main-1000) / <alpha-value>)',
        },
        fgPurple: {
          200: 'rgb(var(--color-base-purple-200) / <alpha-value>)',
          400: 'rgb(var(--color-base-purple-400) / <alpha-value>)',
          600: 'rgb(var(--color-base-purple-600) / <alpha-value>)',
          800: 'rgb(var(--color-base-purple-800) / <alpha-value>)',
          1000: 'rgb(var(--color-base-purple-1000) / <alpha-value>)',
        },
        fgBlue: {
          500: 'rgb(var(--color-base-blue-500) / <alpha-value>)',
        },
        fgRed: {
          700: 'rgb(var(--color-base-red-700) / <alpha-value>)',
        },
        fgPurpleGradient: {
          default: 'var(--purple-gradient, linear-gradient(235deg, #57E4FF 0%, #8B95F2 26.03%, #8B72EE 44.83%, #8556EA 60.47%, #4138E5 100%))',
        },
        fgGold: {
          default: 'var(--Gold, linear-gradient(148deg, #FFE092 12.55%, #E3A302 86.73%))',
        },
        fgSilver: {
          default: 'var(--Silver, linear-gradient(90deg, #b6becd 15.55%, #767988 95.2%))',
        },
        fgBronze: {
          default: 'var(--Bronze, linear-gradient(340deg, #d69160 13.94%, #f2c497 83.24%))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'gray-light': '#B8B8B8',
        black: 'rgb(var(--color-base-main-1000) / <alpha-value>)',
        'black-transparent': 'rgb(var(--color-base-main-900) / <alpha-value>)',
        'white-transparent': '#FFFFFF26',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        oswald: ['Oswald', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      fontSize: {
        '1.5xs': '0.8125rem',
        '2xs': '0.625rem',
        '3xs': '0.5rem',
        '2sm': '0.9375rem',
        '1.5xl': '1.375rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeMoveUp: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
        },
        fadeMoveDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: 'marquee 60s linear infinite',
        marquee2: 'marquee2 60s linear infinite',
        fadeMoveUp: 'fadeMoveUp 1s forwards',
        fadeMoveDown: 'fadeMoveDown 1s forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    // tailwindcss 3.3 include by default
    // require('@tailwindcss/line-clamp'),
    // todo: remove this plugin and corePlugins inset setting until safari 14.0 deprecated
    function ({ matchUtilities, theme }) {
      const config = {
        values: theme('inset'),
        supportsNegativeValues: true,
      }

      function matchUtility(cssProps) {
        return value => {
          const result = {}
          for (const cssProp of cssProps) {
            result[cssProp] = value
          }
          return result
        }
      }
      matchUtilities({ inset: matchUtility(['top', 'right', 'bottom', 'left']) }, config)
      matchUtilities(
        {
          'inset-x': matchUtility(['left', 'right']),
          'inset-y': matchUtility(['top', 'bottom']),
        },
        config
      )

      // Must come after inset utilities so that left, right, top, and bottom take precedence.
      matchUtilities(
        {
          left: matchUtility(['left']),
          right: matchUtility(['right']),
          top: matchUtility(['top']),
          bottom: matchUtility(['bottom']),
          start: matchUtility(['inset-inline-start']),
          end: matchUtility(['inset-inline-end']),
        },
        config
      )
    },
  ],
  variants: {
    scrollbar: ['rounded'],
  },
  corePlugins: {
    inset: false,
    preflight: false,
  },
} satisfies Config

export default tailwindConfig
