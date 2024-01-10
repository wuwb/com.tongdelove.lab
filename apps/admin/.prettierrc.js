/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],

  singleQuote: true,
  semi: false,
  trailingComma: 'es5',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'auto',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson'
  ],
};
