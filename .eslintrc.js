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
  extends: [
    'next/core-web-vitals',
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
  ],
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

    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "react-hooks/exhaustive-deps": "off",
    "prettier/prettier": "off",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-extra-semi": "warn"
  },
  overrides: [],
  ignorePatterns: ['.next'],
}
