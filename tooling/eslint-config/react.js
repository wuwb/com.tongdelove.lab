const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
    'testing-library',
    'storybook',
  ],
  extends: [
    './lib/typescript-eslint',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "plugin:prettier/recommended",
  ],
  globals: {
    process: true
  },
  settings: {
    react: {
      version: 'detect',
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
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
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-restricted-syntax': [
      'error',
      'AwaitExpression > AwaitExpression.argument',
    ],
    'react/jsx-curly-brace-presence': [
      'warn',
      {
        props: 'never',
        children: 'never',
      },
    ],

    'react-hooks/exhaustive-deps': 'off',
    'import/newline-after-import': 'error',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',

    'valid-typeof': 'warn',
    'no-useless-escape': 'off',
    'no-extra-boolean-cast': 'off',
    'no-constant-condition': 'off',
    'react/no-unknown-property': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off'
  },
}
