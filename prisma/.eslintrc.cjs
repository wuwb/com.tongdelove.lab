/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/belgattitude/perso/tree/main/packages/eslint-config-base
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: ['src/generated'],
  extends: [
    '@tongdelove/eslint-config-base/typescript',
    '@tongdelove/eslint-config-base/sonar',
    '@tongdelove/eslint-config-base/regexp',
    // Apply prettier and disable incompatible rules
    '@tongdelove/eslint-config-base/prettier-plugin',
  ],
  overrides: [
    // optional overrides per project file match
    {
      files: ['**/*seed.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
};
