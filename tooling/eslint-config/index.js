/** @type {import("eslint").Linter.Config} */
module.exports = {
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true
  },
  plugins: [
    "prettier",
  ],
  extends: [
    './lib/base',
    'love',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
  ]
}
