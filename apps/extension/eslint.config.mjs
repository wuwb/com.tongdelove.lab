import { defineConfig } from "eslint/config"
import autoImports from './.wxt/eslint-auto-imports.mjs';

export default defineConfig([
  autoImports,
  {
    ignores: ['**/dist', '**/.wxt', '**/.output', 'node_modules/']
  },
])
