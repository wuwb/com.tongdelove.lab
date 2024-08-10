/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

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
  },
  plugins: [
    'import',
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
    },
    {
      files: ['next.config.mjs', 'src/lib/env/*.mjs'],
      rules: {
        'import/order': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['tailwind.config.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['src/pages/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      files: ['src/backend/**/*graphql*schema*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            // Fine-tune naming convention for graphql resolvers and allow PascalCase
            selector: ['objectLiteralProperty'],
            format: ['camelCase', 'PascalCase'],
          },
        ],
      },
    },
    {
      files: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['**/components/ui/*.tsx'],
      rules: {
        // let typescript check prop types
        'react/prop-types': [0, { ignore: ['className'] }],
        'react-refresh/only-export-components': 'off',
        'react/no-unknown-property': [
          'error',
          { ignore: ['cmdk-input-wrapper'] },
        ],
      },
    },
  ],
  rules: {
    'no-unused-vars': [
      'warn', // error
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
 
    'no-restricted-syntax': [
      'error',
      'AwaitExpression > AwaitExpression.argument'
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
    'valid-typeof': 'warn',
    '@typescript-eslint/array-type': 'off',

    '@typescript-eslint/consistent-type-imports': [
      'off',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn', // warn
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/require-await': 'off',
    // '@typescript-eslint/no-misused-promises': [
    //   'error',
    //   {
    //     checksVoidReturn: { attributes: false },
    //   },
    // ],
    '@typescript-eslint/no-non-null-assertion': 'off',

    'prettier/prettier': 'off',
    '@typescript-eslint/no-extra-semi': 'warn',
    'no-extra-semi': 'off',


    '@typescript-eslint/naming-convention': 'off',
    // https://github.com/vercel/next.js/discussions/16832
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'react/no-unescaped-entities': 'off',
    'unused-imports/no-unused-imports': 'off',
    'max-len': [0, { code: 180 }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'prefer-const': 'warn',
    '@typescript-eslint/prefer-for-of': 'warn',
    'no-var': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-types': 'warn',

    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      {
        props: 'never',
        children: 'never',
      },
    ],

    // let typescript check prop types
    'react/prop-types': [0, { ignore: ['className'] }],

    '@typescript-eslint/dot-notation': 'warn',
  },
  ignorePatterns: ['.next', '.out', 'node_modules', 'dist'],
}
