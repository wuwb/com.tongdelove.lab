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
    '@tongdelove/eslint-config/typescript',
    '@tongdelove/eslint-config/sonar',
    '@tongdelove/eslint-config/regexp',
    // Apply prettier and disable incompatible rules
    '@tongdelove/eslint-config/prettier-plugin',
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
