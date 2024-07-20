const baseConfig = require('../../prettier.config.cjs')

baseConfig.plugins = [
  require.resolve('prettier-plugin-tailwindcss'),
  require.resolve('prettier-plugin-packagejson'),
]

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = baseConfig
