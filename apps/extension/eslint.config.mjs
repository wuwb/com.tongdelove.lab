import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import autoImports from './.wxt/eslint-auto-imports.mjs'

const eslintConfig = defineConfig([
  autoImports,
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      ...reactPlugin.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'jsonc/sort-keys': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  prettierConfig,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'tsconfig.*',
    '.claude',
    '.output',
    '.spec-workflow',
    '.tanstack',
    '.vscode',
    '.wxt',
    'node_modules',
    'public',
    'node_modules/**',
    'dist/**',
    'public/**',
    '*.config.*',
    // shadcn
    'src/components/ui/**',
    'src/lib/utils.ts',
    'tailwind.config.js',
  ]),
])

export default eslintConfig
