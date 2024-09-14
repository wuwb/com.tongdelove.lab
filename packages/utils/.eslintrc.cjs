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
    '@tongdelove/eslint-config/typescript',
    '@tongdelove/eslint-config/sonar',
    '@tongdelove/eslint-config/regexp',
    '@tongdelove/eslint-config/jest',
    // Apply prettier and disable incompatible rules
    '@tongdelove/eslint-config/prettier-plugin',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
}
