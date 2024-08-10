const baseConfig = require("@tongdelove/prettier-config") 

baseConfig.plugins = [
  require.resolve('prettier-plugin-tailwindcss'),
  require.resolve('prettier-plugin-packagejson'),
  require.resolve('prettier-plugin-organize-imports'),
]

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = baseConfig
