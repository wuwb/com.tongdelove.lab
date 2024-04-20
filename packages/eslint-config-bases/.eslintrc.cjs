module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  extends: [
    './src/bases/typescript',
    './src/bases/prettier-plugin',
    './src/bases/mdx',
  ],
};
