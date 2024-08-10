/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    '@tongdelove/eslint-config/nextjs.js',

    // ct3
    // 'plugin:@typescript-eslint/recommended-type-checked',
    // 'plugin:@typescript-eslint/stylistic-type-checked',

    // flow
    // 'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    // 'plugin:react/jsx-runtime',
    // 'plugin:@typescript-eslint/strict',

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
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    next: {
      rootDir: ['@/'],
    },
  },
  env: {
    es2021: true,
  },
  // The ".eslintignore" file is no longer supported.
  ignorePatterns: ['.next', '.out', 'node_modules', 'dist'],
}
