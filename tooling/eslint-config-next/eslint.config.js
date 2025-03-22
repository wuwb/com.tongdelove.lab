/* eslint-env node */
import globals from "globals"
// parser
import typescriptParser from '@typescript-eslint/parser'
import babelParser from "@babel/eslint-parser"
// plugins
import javascriptPlugin from "@eslint/js"
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import functionalPlugin from 'eslint-plugin-functional' // 函数式编程
import importPlugin from 'eslint-plugin-import'; // 'import' is ambiguous & prettier has trouble
// import markdownPlugin from "eslint-plugin-markdown"
// import jsdocPlugin from "eslint-plugin-jsdoc"

import prettierConfig from 'eslint-config-prettier'

export default [
  "eslint:recommended",
  {
    rules: javascriptPlugin.configs.recommended.rules,
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
        ...globals.commonjs
      }
    },
  },
  {
    files: ["*.ts", "**/*.ts"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,

      functionalPlugin,
      importPlugin,
      prettierPlugin,
      reactPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          modules: true
        },
        ecmaVersion: 'latest',
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      }
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,

      ...typescriptPlugin.configs['recommended-type-checked'].rules,
      ...typescriptPlugin.configs['stylistic-type-checked'].rules,
      ...typescriptPlugin.configs['eslint-recommended'].rules,

      ...prettierPlugin.configs['recommended'].rules,

      ...prettierConfig.rules,

      "no-console": "error",
      // 'prettier/prettier': 0,
      // 'react/no-unescaped-entities': 'off',
      // 'unused-imports/no-unused-imports': 'off',
      // '@next/next/no-page-custom-font': 'off',

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      // "react-hooks/exhaustive-deps": "off",
      // "prettier/prettier": "off",
      // "@next/next/no-img-element": "off",
      // "@typescript-eslint/no-extra-semi": "warn",

      // "@typescript-eslint/indent": "off",
      // "@typescript-eslint/comma-dangle": "off",
      // "@typescript-eslint/consistent-type-imports": "off",
      // "@typescript-eslint/explicit-function-return-type": "warn",
      // "comma-dangle": "off",
      // "@typescript-eslint/space-before-function-paren": "off",
      // "@typescript-eslint/strict-boolean-expressions": "off",
      // "@typescript-eslint/no-misused-promises": "off",
      // "@typescript-eslint/member-delimiter-style": "off",
      // "@typescript-eslint/triple-slash-reference": "off",
    }
  },
  {
    //   settings: {
    //     next: {
    //       rootDir: ['apps/lab/']
    //     }
    //   },
    // extends: [
    //   'eslint:recommended', // default

    //   'plugin:@typescript-eslint/recommended', // default
    //   "plugin:react/recommended", // default

    //   "prettier", // eslint-plugin-prettier

    //   "plugin:@typescript-eslint/recommended-type-checked",
    //   "plugin:@typescript-eslint/stylistic-type-checked",
    //   "plugin:storybook/recommended",
    // ],
    // overrides: [
    //   {
    //     "env": {
    //        true
    //     },
    //     "files": [
    //       ".eslintrc.{js,cjs}"
    //     ],
    //     "parserOptions": {
    //       "sourceType": "script"
    //     }
    //   },
    //   {
    //     files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    //     extends: 'standard-with-typescript'
    //   }
    // ],
    // parserOptions: {
    //   ecmaVersion: 'latest',
    //   sourceType: 'module',
    //   tsconfigRootDir: __dirname,
    //   project: [
    //     './tsconfig.eslint.json',
    //     './apps/*/tsconfig.json',
    //     './packages/*/tsconfig.json',
    //     './services/*/tsconfig.json',
    //   ]
    // },
    // ignorePatterns: ['.next'],
  }
]
