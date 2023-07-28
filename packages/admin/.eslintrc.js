module.exports = {
  plugins: [
    "prettier"
  ],
  extends: [
    require.resolve('@umijs/max/eslint')
  ],

  rules: {
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-use-before-define': 1,
    // 'selector-pseudo-element-no-unknown': 1,
    'no-param-reassign': 1,
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "react-hooks/exhaustive-deps": "off",
    "prettier/prettier": "off",
    "@typescript-eslint/no-extra-semi": "warn",
    'alpha-value-notation': 0,
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};
