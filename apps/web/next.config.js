// @ts-check
const withPlugins = require('next-compose-plugins')
const withAntdLess = require('next-plugin-antd-less')
// const { i18n } = require('./next-i18next.config');

const pluginAntdLess = withAntdLess({
  // modifyVars: {
  //   '@THEME--DARK': 'theme-dark',
  // },
  lessVarsFilePath: './src/styles/variables.less',
  // cssLoaderOptions: {
  // esModule: false,
  // sourceMap: false,
  // modules: {
  // mode: 'local',
  // localIdentName: '[hash:2]',
  // },
  // },
})

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPlugins([[pluginAntdLess]], {
  // i18n,
  // reactStrictMode: true,
  // trailingSlash: true,
  // pageExtensions: ['mdx', 'md', 'ts', 'tsx'],
  // env: {
  //   VERSION: require('./package.json').version,
  // },
  /**
   * We specify which domains are allowed to be optimized.
   * This is needed to ensure that external urls can't be abused.
   * @see https://nextjs.org/docs/basic-features/image-optimization#domains
   */
  images: {
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  staticPageGenerationTimeout: 1000,
  // webpack(config) {
  //   return config;
  // },
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300
  //   }
  //
  //   return config
  // },

  // experimental: {
  //   redirects() {
  //     // 将页面映射到根目录
  //     return [
  //       {
  //         source: '/login',
  //         permanent: true,
  //         destination: '/pages/login',
  //       },
  //     ]
  //   },
  // },
  // webpack(config, options) {
  //   return config;
  // }
})
