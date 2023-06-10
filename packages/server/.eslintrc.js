module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest', // 2018, 2020
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    root: true,
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    plugins: ['@typescript-eslint', 'jest', 'prettier', 'unused-imports'],
    extends: [
        // typescript 的 eslint 插件
        'plugin:@typescript-eslint/recommended',

        // 整合typescript-eslint与prettier
        'plugin:prettier/recommended',

        // 支持jest
        'plugin:jest/recommended',

        // 使用prettier格式化代码
        'prettier',
    ],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 0,

        'no-empty': 'warn',
        'no-fallthrough': 'error',
        'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                prefer: 'no-type-imports',
            },
        ],
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'max-len': ['error', { code: 140, ignoreUrls: true }],
        'import/prefer-default-export': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/no-unescaped-entities': [
            'error',
            {
                forbid: [
                    { char: '>', alternatives: ['&gt;'] },
                    { char: '}', alternatives: ['&#125;'] },
                ],
            },
        ],
        strict: 0,
        'no-console': 'warn',
        quotes: ['warn', 'single'],
        'prettier/prettier': 'warn',
        'react/prop-types': 'warn',

        'no-unused-vars': 'warn',
        'react/no-unused-state': 'warn',
        'react/jsx-filename-extension': 'warn',
        'react/destructuring-assignment': 'warn',
        'import/no-unresolved': 'warn',
        'react/forbid-prop-types': 'warn',
        'react/state-in-constructor': 'warn',
        'react/jsx-props-no-spreading': 'warn',
        'react/require-default-props': 'warn',
        'no-shadow': 'warn',
        'react/no-unused-prop-types': 'warn',
        'react/no-array-index-key': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
        extensions: ['.ts', '.d.ts', '.cts', '.mts', '.js', '.cjs', 'mjs', '.json'],
    },
};
