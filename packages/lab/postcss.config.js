// https://github.com/tailwindlabs/tailwindcss/discussions/5934
// https://tailwindcss.com/docs/installation/using-postcss
// https://tailwindcss.com/docs/using-with-preprocessors#nesting
module.exports = {
  // purge: [
  //   './src/**/*.tsx',
  // ],
  plugins:
    process.env.NODE_ENV === 'production'
      ? {
          // 'postcss-import': {},
          // 'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {},
          // cssnano: {},
          // 'postcss-flexbugs-fixes': {},
          // 'postcss-preset-env': {
          //   autoprefixer: {
          //     flexbox: 'no-2009',
          //     grid: 'autoplace',
          //   },
          //   stage: 3,
          //   features: {
          //     'custom-properties': false,
          //     'nesting-rules': false,
          //   },
          // },
        }
      : {
          // 'postcss-import': {},
          // 'tailwindcss/nesting': {},
          tailwindcss: {},
          // 'postcss-preset-env': {
          //   autoprefixer: {
          //     flexbox: 'no-2009',
          //     grid: 'autoplace',
          //   },
          //   stage: 3,
          //   features: {
          //     'custom-properties': false,
          //     'nesting-rules': false,
          //   },
          // },
        },
}
