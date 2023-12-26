module.exports = {
    //   settings: {
    //     next: {
    //       rootDir: ['apps/lab/']
    //     }
    //   },
    env: {
        es2021: true,
        node: true
    },
    extends: [
        "standard-with-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 0,
        'react/no-unescaped-entities': 'off',
        'unused-imports/no-unused-imports': 'off',
        '@next/next/no-page-custom-font': 'off',

        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_"
            }
        ],
        "react-hooks/exhaustive-deps": "off",
        "prettier/prettier": "off",
        "@next/next/no-img-element": "off",
        "@typescript-eslint/no-extra-semi": "warn",

        "@typescript-eslint/indent": "off",
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "comma-dangle": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/triple-slash-reference": "off",
    },
    overrides: [],
    ignorePatterns: ['.next'],
}
