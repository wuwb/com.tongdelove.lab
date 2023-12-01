/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@tongdelove/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@tongdelove/eslint-config-bases/helpers');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), '/storybook-static'],
  extends: [
    '@tongdelove/eslint-config-bases/typescript',
    '@tongdelove/eslint-config-bases/regexp',
    '@tongdelove/eslint-config-bases/sonar',
    '@tongdelove/eslint-config-bases/jest',
    '@tongdelove/eslint-config-bases/rtl',
    '@tongdelove/eslint-config-bases/storybook',
    '@tongdelove/eslint-config-bases/react',
    // Apply prettier and disable incompatible rules
    '@tongdelove/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
};
