// @ts-check

/** 
 * @type {import("prettier").Config} 
 */
module.exports = {
    // printWidth: 120,
    arrowParens: "avoid",
    singleQuote: true,
    semi: false,
    useTabs: false,
    tabWidth: 2,
    plugins: [
        require('prettier-plugin-tailwindcss')
    ],
    trailingComma: 'es5',
    endOfLine: 'auto',
}
