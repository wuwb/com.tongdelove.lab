/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: 'es5',  // none 多行时尽可能使用逗号结尾
  tabWidth: 2,
  semi: false, // 是否使用分号
  singleQuote: true, // 使用单引号代替双引号
  endOfLine: 'auto',
  arrowParens: "always", // always, avoid, 参数外加括号
  useTabs: false,
  printWidth: 80,
  singleAttributePerLine: false,
  jsxSingleQuote: false,
  proseWrap: "preserve", // always never, preserve
  // bracketSpacing: true,  // 在对象，数组括号与文字之间加空格"{ foo: bar }
  // overrides: [
  //   {
  //     files: '.prettierrc',
  //     options: {
  //       parser: 'json',
  //     },
  //   },
  //   {
  //     files: 'document.ejs',
  //     options: {
  //       parser: 'html',
  //     },
  //   },
  // ],
  // parser: 'babel',

  // quoteProps: 'as-needed',
  // htmlWhitespaceSensitivity: 'css',
  // jsxBracketSameLine: false, // is deprecated
}
