/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/belgattitude/nextjs-monorepo-example/tree/main/packages/eslint-config-bases
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  extends: [
    '@tongdelove/eslint-config-bases/typescript',
    '@tongdelove/eslint-config-bases/sonar',
    '@tongdelove/eslint-config-bases/regexp',
    '@tongdelove/eslint-config-bases/jest',
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
