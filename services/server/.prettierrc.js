const baseConfig = require('@tongdelove/prettier-config')

baseConfig.plugins = [require.resolve('prettier-plugin-packagejson')]

/** @type {import("prettier").Config} */
module.exports = baseConfig
