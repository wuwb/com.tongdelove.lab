/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/belgattitude/perso/tree/main/packages/eslint-config-bases
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
    '@tongdelove/eslint-config-bases/typescript',
    '@tongdelove/eslint-config-bases/sonar',
    '@tongdelove/eslint-config-bases/regexp',
    // Apply prettier and disable incompatible rules
    '@tongdelove/eslint-config-bases/prettier-plugin',
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
