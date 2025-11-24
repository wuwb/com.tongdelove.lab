import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    root: true,
    extends: [
      '@tongdelove/eslint-config/nextjs.js',

      // ct3
      // 'plugin:@typescript-eslint/recommended-type-checked',
      // 'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    // settings: {
    //   next: {
    //     rootDir: ['@/'],
    //   },
    // },
    env: {
      es2021: true,
    },
    rules: {
      'react-hooks/rules-of-hooks': 0,
      '@next/next/no-html-link-for-pages': 'off',
    },
    // The ".eslintignore" file is no longer supported.
    ignorePatterns: ['.next', '.out', 'node_modules', 'dist'],
  }
]);

export default eslintConfig;
