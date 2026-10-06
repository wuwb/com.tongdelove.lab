import baseConfig from "@tongdelove/eslint-config/base";
import reactConfig from "@tongdelove/eslint-config/react";
import { config } from "@tongdelove/eslint-config/react-internal"

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
