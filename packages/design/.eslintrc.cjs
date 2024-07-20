/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: ['/storybook-static'],
  extends: [
    '@tongdelove/eslint-config-base/typescript',
    '@tongdelove/eslint-config-base/regexp',
    '@tongdelove/eslint-config-base/sonar',
    '@tongdelove/eslint-config-base/jest',
    '@tongdelove/eslint-config-base/rtl',
    '@tongdelove/eslint-config-base/storybook',
    '@tongdelove/eslint-config-base/react',
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
