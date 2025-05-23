/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  const platform = api.caller((caller) => caller && caller.platform)

  api.cache(true)

  const config = {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
        },
      ],
      'nativewind/babel',
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.svg'],
          alias: {
            '@': './src',
            crypto: 'react-native-quick-crypto',
            stream: 'stream-browserify',
            buffer: '@craftzdog/react-native-buffer',
          },
        },
      ],
      ['inline-import', { extensions: ['.sql'] }],
    ],
  }

  if (platform === 'web') {
    config.plugins.push('@babel/plugin-proposal-export-namespace-from')
  }

  // Ensure 'react-native-reanimated/plugin' is always last
  config.plugins.push('react-native-reanimated/plugin')

  return config
}
