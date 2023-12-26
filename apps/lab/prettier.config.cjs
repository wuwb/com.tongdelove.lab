const baseConfig = require('../../prettier.config.cjs')

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  ...baseConfig,
  printWidth: 150,
  arrowParens: 'avoid', // always
  semi: false, // 是否使用分号
  singleQuote: true, // 使用单引号代替双引号
  useTabs: false,
  tabWidth: 2,
  plugins: [
    'prettier-plugin-tailwindcss'
  ],
  trailingComma: 'es5', // none 多行时尽可能使用逗号结尾
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格"{ foo: bar }
  // jsxBracketSameLine: false, // is deprecated
  endOfLine: 'auto',
  jsxSingleQuote: false,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  htmlWhitespaceSensitivity: 'css',
};

module.exports = config;
