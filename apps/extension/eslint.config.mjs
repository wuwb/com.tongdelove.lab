import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu(
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
)
