module.exports = {
  settings: {
    next: {
      rootDir: ['@/'],
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['next', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 0,
    'react/no-unescaped-entities': 'off',
    'unused-imports/no-unused-imports': 'off',
    'max-len': 120,
    'no-unused-vars': 'off',
  },
  overrides: [],
  ignorePatterns: ['.next'],
};
