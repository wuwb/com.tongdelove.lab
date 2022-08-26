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
  extends: ['plugin:@next/next/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
    'unused-imports/no-unused-imports': 'off'
  }
}
