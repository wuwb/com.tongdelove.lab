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
    // '@tongdelove/eslint-config/typescript',
    // '@tongdelove/eslint-config/regexp',
    // '@tongdelove/eslint-config/sonar',
    // '@tongdelove/eslint-config/jest',
    // '@tongdelove/eslint-config/rtl',
    // '@tongdelove/eslint-config/storybook',
    // '@tongdelove/eslint-config/react',
    // // Apply prettier and disable incompatible rules
    // '@tongdelove/eslint-config/prettier-plugin',
  ],
};
