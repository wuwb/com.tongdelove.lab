const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project,
  },
  plugins: [
    'prettier'
    'import'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  ignorePatterns: [
    'dist',
    'node_modules',
  ]
}
