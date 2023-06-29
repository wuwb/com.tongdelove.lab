import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest'
import fs from 'fs';

const tsconfigJson = fs.readFileSync('./tsconfig.json', 'utf-8');
const tsconfigJsonWithoutComments = tsconfigJson.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
const tsconfigJsonObj = JSON.parse(tsconfigJsonWithoutComments);

const config: JestConfigWithTsJest = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': ['ts-jest', {
            useESM: true,
            tsconfig: './tsconfig.json',
        }],
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
        isDev: process.env.NODE_ENV === 'development',
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfigJsonObj.compilerOptions.paths, {
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
