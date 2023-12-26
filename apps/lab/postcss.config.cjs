// Customized postcss
// @link https://nextjs.org/docs/advanced-features/customizing-postcss-config
// @link https://tailwindcss.com/docs/using-with-preprocessors
// https://github.com/tailwindlabs/tailwindcss/discussions/5934
// https://tailwindcss.com/docs/installation/using-postcss
// https://tailwindcss.com/docs/using-with-preprocessors#nesting

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // purge: [
  //   './src/**/*.tsx',
  // ],
  plugins: {
    // 'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      // https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#stability-and-portability
      stage: 3,
      autoprefixer: { grid: true },
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
    ...(isProd
      ? {
        'postcss-preset-env': {
          // https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#stability-and-portability
          stage: 3,
          autoprefixer: { grid: true },
        },
      }
      : {}),
  },
}
