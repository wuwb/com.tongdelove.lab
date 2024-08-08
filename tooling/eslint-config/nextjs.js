/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: { 
    browser: true,
    node: true,
    "cypress/globals": true
  },
  globals: {
    React: 'readonly',
    JSX: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  plugins: [
    'testing-library',
    'cypress',
    'storybook',
    'prettier',
  ],
  extends: [
    './lib/typescript-eslint',
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test|cy).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ["*.stories.*"],
      extends: ["plugin:storybook/recommended"],
    }
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }
    ],
 
    'no-restricted-syntax': [
      'error',
      'AwaitExpression > AwaitExpression.argument'
    ],
    'react/jsx-curly-brace-presence': [
      'warn',
      {
        'props': 'never',
        'children': 'never'
      }
    ],
    'react-hooks/exhaustive-deps': 'off',
    'import/newline-after-import': 'error',
    '@next/next/no-img-element': 'off',
    'no-useless-escape': 'off',
    'no-extra-boolean-cast': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'valid-typeof': 'warn'
  },
}
