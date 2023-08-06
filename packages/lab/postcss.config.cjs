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
        tailwindcss: {},
        autoprefixer: {},
      } : {
        // 'postcss-import': {},
        // 'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
      },
}
