module.exports = {
  root: true,
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
    '@typescript-eslint/no-var-requires': 'warn',
    "prefer-const": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-rest-params": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react/no-string-refs": "warn",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "react/jsx-key": "warn",
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};
