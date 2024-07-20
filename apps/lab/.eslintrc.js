/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'testing-library'],
  extends: [
    '@flowgpt/eslint-config/nextjs.js',
    // ct3
    'next/core-web-vitals',
    // 'plugin:@typescript-eslint/recommended-type-checked',
    // 'plugin:@typescript-eslint/stylistic-type-checked',

    // flow
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/strict',
    'plugin:storybook/recommended',

    // custom
    // '@tongdelove/eslint-config-base/typescript',
    // '@tongdelove/eslint-config-base/sonar',
    // '@tongdelove/eslint-config-base/regexp',
    // '@tongdelove/eslint-config-base/jest',
    // '@tongdelove/eslint-config-base/react',
    // '@tongdelove/eslint-config-base/tailwind',
    // '@tongdelove/eslint-config-base/rtl',
    // // Apply prettier and disable incompatible rules
    // '@tongdelove/eslint-config-base/prettier-plugin',
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
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',

    '@typescript-eslint/consistent-type-imports': [
      'off',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'off', // warn
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
    'no-unused-vars': [
      'off', // error
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': 'off',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-extra-semi': 'warn',
    'no-useless-escape': 'off',
    'no-extra-boolean-cast': 'off',
    'no-constant-condition': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    'no-restricted-syntax': [
      'error',
      'AwaitExpression > AwaitExpression.argument',
    ],

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
    'import/newline-after-import': 'error',
    'react/jsx-curly-brace-presence': [
      'warn',
      {
        props: 'never',
        children: 'never',
      },
    ],

    // let typescript check prop types
    'react/prop-types': [0, { ignore: ['className'] }],
  },
  overrides: [
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
  // The ".eslintignore" file is no longer supported.
  ignorePatterns: ['.next', '.out', 'node_modules', 'dist/*'],
}
