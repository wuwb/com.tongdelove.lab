/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // ecmaVersion: 12,
    // sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'next/core-web-vitals',
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:storybook/recommended",
  ],
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
  globals: {
    React: 'readonly',
  },
  rules: {
    'prettier/prettier': 0,
    'react/no-unescaped-entities': 'off',
    'unused-imports/no-unused-imports': 'off',
    'max-len': [1, { "code": 160 }],
    'no-unused-vars': 'off',
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
    "@typescript-eslint/no-extra-semi": "warn",
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  // overrides: [],
  ignorePatterns: ['.next', 'node_modules'],
};
