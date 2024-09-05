/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  extends: [
    '@tongdelove/eslint-config',
    // typescript 的 eslint 插件
    'plugin:@typescript-eslint/recommended',

    // 整合 typescript-eslint 与 prettier
    'plugin:prettier/recommended',

    // 使用 prettier 格式化代码
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 0,

    'no-empty': 'warn',
    'no-fallthrough': 'error',
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'no-type-imports',
      },
    ],
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'max-len': ['1', { code: 160, ignoreUrls: true }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: [
          { char: '>', alternatives: ['&gt;'] },
          { char: '}', alternatives: ['&#125;'] },
        ],
      },
    ],
    strict: 0,
    'no-console': 'warn',
    quotes: ['warn', 'single'],
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    'react/no-unused-state': 'warn',
    'react/jsx-filename-extension': 'warn',
    'react/destructuring-assignment': 'warn',
    'import/no-unresolved': 'warn',
    'react/state-in-constructor': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'react/require-default-props': 'warn',
    'no-shadow': 'warn',
    'react/no-array-index-key': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
    extensions: ['.ts', '.d.ts', '.cts', '.mts', '.js', '.cjs', 'mjs', '.json'],
  },
}
