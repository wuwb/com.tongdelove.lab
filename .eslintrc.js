module.exports = {
  settings: {
    next: {
      rootDir: ['packages/lab/']
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['next', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 0,
    'react/no-unescaped-entities': 'off',
    'unused-imports/no-unused-imports': 'off',
    '@next/next/no-page-custom-font': 'off',
  },
  overrides: [],
  ignorePatterns: ['.next'],
}
