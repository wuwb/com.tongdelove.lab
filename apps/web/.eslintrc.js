/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@tongdelove/eslint-config/nextjs.js'],
  rules: {
    'jsx-a11y/alt-text': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'react-hooks/exhaustive-deps': 0,
    //  "prettier/prettier": [
    //    "error",
    //    {
    //      "printWidth": 80,
    //      "singleQuote": false,
    //      "trailingComma": "es5",
    //      "semi": false,
    //      "tabWidth": 2
    //    }
    //  ]
  },
}
