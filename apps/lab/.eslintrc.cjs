/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@tongdelove/eslint-config-bases/patch/modern-module-resolution');

const {
    getDefaultIgnorePatterns,
} = require('@tongdelove/eslint-config-bases/helpers');

/** @type {import("eslint").Linter.Config} */
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        // ecmaVersion: 12,
        // sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [
        ...getDefaultIgnorePatterns(), '.next', '.out'],

    plugins: [
        '@typescript-eslint',
        'prettier',
        'testing-library',
        // 'jest'
        "jest-extended"
    ],
    extends: [
        // flow
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/strict",
        "plugin:storybook/recommended",

        // ct3
        "plugin:@next/next/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",

        // 'mantine',
        // Add specific rules for nextjs
        'plugin:jest/recommended',
        'next/core-web-vitals',
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "plugin:storybook/recommended",

        // custom
        '@tongdelove/eslint-config-bases/typescript',
        '@tongdelove/eslint-config-bases/sonar',
        '@tongdelove/eslint-config-bases/regexp',
        '@tongdelove/eslint-config-bases/jest',
        '@tongdelove/eslint-config-bases/react',
        '@tongdelove/eslint-config-bases/tailwind',
        '@tongdelove/eslint-config-bases/rtl',
        // Apply prettier and disable incompatible rules
        '@tongdelove/eslint-config-bases/prettier-plugin',
    ],
    // settings: {
    //   next: {
    //     rootDir: ['@/'],
    //   },
    // },
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        React: 'readonly',
    },
    rules: {
        // These opinionated rules are enabled in stylistic-type-checked above.
        // Feel free to reconfigure them to your own preference.
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",

        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            },
        ],
        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_"

        }],
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: { attributes: false },
            },
        ],
        "no-unused-vars": [
            "error",
            {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_"
            }
        ],
        "react-hooks/exhaustive-deps": "off",
        "prettier/prettier": "off",
        "@next/next/no-img-element": "off",
        "@typescript-eslint/no-extra-semi": "warn",
        "no-useless-escape": "off",
        "no-extra-boolean-cast": "off",
        "no-constant-condition": "off",
        "no-extra-semi": "off",
        "@typescript-eslint/no-unnecessary-condition": "off",
        "no-restricted-syntax": [
            "error",
            "AwaitExpression > AwaitExpression.argument"
        ],

        '@typescript-eslint/naming-convention': 'off',
        // https://github.com/vercel/next.js/discussions/16832
        '@next/next/no-img-element': 'off',
        // For the sake of example
        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/extensions': 'off',
        'react/no-unescaped-entities': 'off',
        'unused-imports/no-unused-imports': 'off',
        'max-len': [1, { "code": 160 }],
        'no-unused-vars': 'off',

        "react-hooks/exhaustive-deps": "off",
        "prettier/prettier": "off",
        "@typescript-eslint/no-extra-semi": "warn",

        // These opinionated rules are enabled in stylistic-type-checked above.
        // Feel free to reconfigure them to your own preference.
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-function": "off",
        "prefer-const": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "no-var": "warn",
        "@typescript-eslint/no-inferrable-types": "warn",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/ban-types": "warn",

        // storybook
        "storybook/story-exports": "warn"
    },
    overrides: [
        {
            files: ['next.config.mjs', 'src/lib/env/*.mjs'],
            rules: {
                'import/order': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
            },
        },
        {
            files: ['tailwind.config.ts'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
        {
            files: ['src/pages/\\_*.{ts,tsx}'],
            rules: {
                'react/display-name': 'off',
            },
        },
        {
            files: ['src/backend/**/*graphql*schema*.ts'],
            rules: {
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        // Fine-tune naming convention for graphql resolvers and allow PascalCase
                        selector: ['objectLiteralProperty'],
                        format: ['camelCase', 'PascalCase'],
                    },
                ],
            },
        },
        {
            "files": ["**/test/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
            "extends": ["plugin:testing-library/react"]
        }
    ],
}
