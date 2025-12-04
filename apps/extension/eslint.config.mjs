import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  {
    ignores: ['tsconfig.*'],
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
      // 'unused-imports/no-unused-vars': 'warn',
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
