const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true
  },
  plugins: [
    '@next/eslint-plugin-next',
    "@typescript-eslint",
    "testing-library",
  ],
  extends: [
    "./base.js",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/strict",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ["**/test/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"]
    }
  ],
  rules: {
    // TypeError: context.getAncestors is not a function
    "@next/next/no-duplicate-head": "off",
  },
}
