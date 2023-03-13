/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: ['/dist', '/node_modules/', '.*(stub.ts)$'],
    extensionsToTreatAsEsm: ['.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: './tsconfig.json',
        },
        isDev: process.env.NODE_ENV === 'development',
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths, {
            prefix: '<rootDir>/',
        }),

        '^src/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1',
        '^src$': '<rootDir>/src',
        '^~/(.*)$': '<rootDir>/src/$1',
        '^~$': '<rootDir>/src',
        '^test$': '<rootDir>/test',
    },
};
