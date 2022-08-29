/* eslint-disable */

// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
const withTM = require('next-transpile-modules')(['../bar', '../api']);
const { i18n } = require('./next-i18next.config');
const { version } = require('./package.json');

const isDev = process.env.NODE_ENV === 'development';

// const withPlugins = require('next-compose-plugins');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// enabled: process.env.ANALYZE === 'true',
// })
// const withImages = require('next-images')({
//     disableStaticImages: true,
// });
// const withOffline = require('next-offline')

// [withBundleAnalyzer],
// [withImages],
// [withOffline, {
//     workboxOpts: {
//         swDest: 'static/service-worker.js',
//         runtimeCaching: [
//             {
//                 urlPattern: /[.](png|jpg|ico|css)/,
//                 handler: 'CacheFirst',
//                 options: {
//                     cacheName: 'assets-cache',
//                     cacheableResponse: {
//                         statuses: [0, 200],
//                     },
//                 },
//             },
//             {
//                 urlPattern: /^http.*/,
//                 handler: 'NetworkFirst',
//                 options: {
//                     cacheName: 'http-cache',
//                 },
//             },
//         ],
//     },
// }],

const nextConfig = async (phase, { defaultConfig }) => {
  const plugins = [
    // withTM
  ];

  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    output: 'standalone',
    compiler: {
      // Remove console aside from 'error' in production
      // removeConsole: {
      //   exclude: ['error'],
      // },
      // Remove data-testid used for React Testing Library in production
      reactRemoveProperties: {
        properties: ['^data-testid$'],
      },
    },
    experimental: {
      // Google fonts
      // optimizeFonts: true,
      // removeConsole: {
      //   exclude: ['error'],
      // },
    },
    i18n,
    env: {
      appVersion: version,
    },
    poweredByHeader: false,
    basePath: '',
    reactStrictMode: true,
    // Required by Next i18n with API routes, otherwise API routes 404 when fetching without trailing slash
    trailingSlash: true,
    eslint: {
      dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },
    images: {
      domains: [
        'www.gravatar.com',
        'iph.href.lu',
        // 加入 wordpress 相关域名
        'blog.tongdelove.com',
      ],
    },
    async redirects() {
      return [
        // Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
        {
          source: '/blog/:slug*',
          destination: '/news/:slug*',
          permanent: false,
        },
      ];
    },
    async rewrites() {
      if (isDev) {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3100/:path*',
          },
        ];
      }

      return {
        beforeFiles: [
          // These rewrites are checked after headers/redirects
          // and before all files including _next/public files which
          // allows overriding page files
          {
            source: '/some-page',
            destination: '/somewhere-else',
            has: [{ type: 'query', key: 'overrideMe' }],
          },
        ],
        afterFiles: [
          // These rewrites are checked after pages/public files
          // are checked but before dynamic routes
          {
            source: '/blog',
            destination: '/postss',
          },
        ],
        fallback: [
          // These rewrites are checked after both pages/public files
          // and dynamic routes are checked
          {
            source: '/:path*',
            destination: `https://localhost:3000/:path*`,
          },
        ],
      };
    },
    async headers() {
      return [
        {
          source: '/about',
          headers: [
            {
              key: 'X-About-Custom-Header',
              value: 'about_header_value',
            },
          ],
        },
        {
          source: '/news/:id',
          headers: [
            {
              key: 'X-News-Custom-Header',
              value: 'news_header_value',
            },
          ],
        },
      ];
    },
  };
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...defaultConfig,
    ...config,
  });
};

module.exports = nextConfig;
