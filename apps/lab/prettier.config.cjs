const tongdelovePrettierConfig = require('@tongdelove/prettier-config')

tongdelovePrettierConfig.plugins = [
  require('prettier-plugin-tailwindcss'),
  require('prettier-plugin-packagejson'),
]

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = tongdelovePrettierConfig
