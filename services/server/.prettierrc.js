const baseConfig = require('../../prettier.config.cjs')

baseConfig.plugins = [require.resolve('prettier-plugin-packagejson')]

/** @type {import("prettier").Config} */
module.exports = baseConfig
