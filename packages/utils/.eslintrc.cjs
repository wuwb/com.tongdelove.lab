/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/belgattitude/nextjs-monorepo-example/tree/main/packages/eslint-config-base
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  extends: [
    '@tongdelove/eslint-config-base/typescript',
    '@tongdelove/eslint-config-base/sonar',
    '@tongdelove/eslint-config-base/regexp',
    '@tongdelove/eslint-config-base/jest',
    // Apply prettier and disable incompatible rules
    '@tongdelove/eslint-config-base/prettier-plugin',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
};
