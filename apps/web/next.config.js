const withPlugins = require('next-compose-plugins')
// const { i18n } = require('./next-i18next.config');

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPlugins([], {
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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2250], // sync to tailwind config
    imageSizes: [16, 32, 48, 64, 96, 256, 384],
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    minimumCacheTTL: 432000,
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|wasm|gif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2629746, must-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=2629746, must-revalidate',
          },
        ],
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots.txt',
      },
    ]
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    /**
     * This experimental is unstable, make sure keep `outputFileTracingIgnores` value sync to avoid problem with function size limit
     * @see https://github.com/vercel/next.js/issues/54245
     */
    outputFileTracingExcludes: {
      '*': ['node_modules/canvas', 'node_modules/.pnpm/canvas@2.11.2'],
    },
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  staticPageGenerationTimeout: 1000,
  transpilePackages: ['@tongdelove'],
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
  // webpack(config, options) {
  //   return config;
  // }
})
