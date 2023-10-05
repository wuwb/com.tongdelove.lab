// @ts-check
const { getTsconfig } = require('get-tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');
const nextJest = require('next/jest');

const tsConfigFile = new URL('./tsconfig.jest.json', import.meta.url).pathname;
const tsConfigPathsFile = new URL('./tsconfig.json', import.meta.url).pathname;

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/../config/tests/ReactSvgrMock.tsx',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
