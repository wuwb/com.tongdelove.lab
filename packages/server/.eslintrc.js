module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    root: true,
    env: {
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
    },
    settings: {
        extensions: [
            '.ts',
            '.d.ts',
            '.cts',
            '.mts',
            '.js',
            '.cjs',
            'mjs',
            '.json',
        ],
    },
};
