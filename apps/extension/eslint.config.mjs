import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

const antfuConfig = antfu(
  {
    ignores: ['tsconfig.*'],
    react: true,
  },
  {
    ignores: [
      'src/components/ui/**',
      'src/lib/utils.ts',
      'tailwind.config.js',
    ],
    name: 'shadcn',
  },
  {
    files: [
      '**/*.tsx',
      '**/*.jsx',
    ],
    name: 'react',
    rules: {
      'jsonc/sort-keys': 'off',
      'no-console': 'off',
      'react-refresh/only-export-components': 'off',
      'unused-imports/no-unused-vars': 'warn',
    },
  },
  {
    name: 'perfectionist',
    rules: {
      'import/order': 'off',
      ...perfectionist.configs['recommended-natural'].rules,
    },
  },
  ...eslintConfig,
)

export default antfuConfig
