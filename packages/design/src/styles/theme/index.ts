import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
// import { avatarTheme } from './avatar'
// import { buttonRecipe } from './button.recipe'
// import { checkboxTheme } from './checkbox'
// import { menuTheme } from './menu'
// import { modalTheme } from './modal'
// import { sliderTheme } from './slider'
// import { switchTheme } from './switch'
// import { tabsTheme } from './tabs'
// import { tooltipTheme } from './tooltip'
// import { popoverTheme } from './popover'
// import { accordionTheme } from './accordion'

const customConfig = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "ck",
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
    },
  },
  strictTokens: true,
  theme: {
    breakpoints: {
      'base': '0px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2250px',
    },
    tokens: {
      colors: {
        transparent: { value: 'transparent' },
        current: { value: 'currentColor' },
        black: { value: '#000000' },
        white: { value: '#FFFFFF' },
        brand: {
          0: { value: 'var(--color-main-0)' },
          100: { value: 'var(--color-main-100)' },
          200: { value: 'var(--color-main-200)' },
          300: { value: 'var(--color-main-300)' },
          400: { value: 'var(--color-main-400)' },
          500: { value: 'var(--color-main-500)' },
          600: { value: 'rgb(var(--color-base-main-600) / 0.4)' },
          700: { value: 'var(--color-main-700)' },
          800: { value: 'rgb(var(--color-base-main-800) / 0.06)' },
          850: { value: 'rgb(var(--color-base-main-850) / 0.03)' },
          900: { value: 'rgb(var(--color-base-main-900) / 0.9)' },
          950: { value: 'var(--color-main-950)' },
          1000: { value: 'var(--color-main-1000)' },
          '1f': { value: 'rgb(var(--color-base-main-850) / 0.03) ' }, // 600
          '2f': { value: 'rgb(var(--color-base-main-800) / 0.06) ' }, // 800
          '3f': { value: 'rgb(var(--color-base-main-600) / 0.4) ' }, // 850
          'modal': { value: 'rgb(var(--color-base-main-900) / 0.9) ' }, // 900
        },
      },
      fontSizes: {
        '1.5xs': { value: '0.8125rem' }, // 13px
        '2sm': { value: '0.9375rem' }, // 15px
        '1.5xl': { value: '1.375rem' }, // 22px
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
})


export const system = createSystem(defaultConfig, customConfig)
