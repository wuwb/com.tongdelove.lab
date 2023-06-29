/* eslint-disable @typescript-eslint/no-var-requires */
import { pathsToModuleNameMapper } from 'ts-jest';
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
        // '^.+\\.(t|j)s?$': ['@swc/jest'],
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    coveragePathIgnorePatterns: ['/dist', '/node_modules/', '.*(stub.ts)$'],
    extensionsToTreatAsEsm: ['.ts'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
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

export default config;
