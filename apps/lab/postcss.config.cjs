// Customized postcss
// @link https://nextjs.org/docs/advanced-features/customizing-postcss-config
// @link https://tailwindcss.com/docs/using-with-preprocessors
// https://github.com/tailwindlabs/tailwindcss/discussions/5934
// https://tailwindcss.com/docs/installation/using-postcss
// https://tailwindcss.com/docs/using-with-preprocessors#nesting

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // purge: [
  //   './src/**/*.tsx',
  // ],
  plugins: {
    "@tailwindcss/postcss": {},
    ...(isProd
      ? {
          'postcss-preset-env': {
            autoprefixer: { grid: true },
          },
        }
      : {}),
  },
}
