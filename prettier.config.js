/** @type {import("prettier").Config} */
export default {
    trailingComma: 'es5',
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    endOfLine: 'auto',

    // printWidth: 120,
    arrowParens: "avoid",
    useTabs: false,
    plugins: [
        require('prettier-plugin-tailwindcss')
    ],
}
