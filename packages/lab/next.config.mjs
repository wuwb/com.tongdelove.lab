/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import withTM from 'next-transpile-modules';
import withBundleAnalyzer from '@next/bundle-analyzer';
await import("./src/env.mjs");

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

// const withImages = require('next-images')({
//     disableStaticImages: true,
// });
// const withOffline = require('next-offline')

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

/** @type {import('next').NextConfig} */
const nextConfig = async (phase, { defaultConfig }) => {
  const plugins = [
    // withLess(
    //   {
    //     lessLoaderOptions: {
    //       lessOptions: {
    //         paths: [path.resolve(__dirname, './src')],
    //       },
    //     },
    //   },
    // ),
    withTM(
      [
        // 'antd',
        // 'rc-pagination',
        // 'rc-util',
        // 'rc-picker',
        // 'rc-notification',
        // '@ant-design/icons',
        // 'rc-calendar',
      ],
      {
        resolveSymlinks: true,
        debug: false,
      }
    ),
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true',
    }),
  ];

  /** @type {import('next').NextConfig} */
  const config = {
    // appDir: true,
    output: 'standalone',
    compiler: {
      // Remove console aside from 'error' in production
      // removeConsole: {
      //   exclude: ['error'],
      // },
      // Remove data-testid used for React Testing Library in production
      reactRemoveProperties: {
        properties: ['^data-custom$', '^data-testid$'],
      },
    },
    swcMinify: true,
    experimental: {
      swcPlugins: [
        [
          'next-superjson-plugin',
          {
            excluded: [],
          },
        ],
      ],
      serverActions: true,
      esmExternals: true,
      // Google fonts
      // optimizeFonts: true,
      // removeConsole: {
      //   exclude: ['error'],
      // },
    },
    // i18n,
      /**
     * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
     * out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    env: {
      appVersion: '0.0.1',
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
      unoptimized: true,
      domains: [
        'www.gravatar.com',
        'iph.href.lu',
        // 加入 wordpress 相关域名
        'blog.tongdelove.com',
        '127.0.0.1',
        'localhost',
      ],
      remotePatterns: [],
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
            destination: 'http://localhost:7001/api/:path*',
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
    // webpack: (cfg) => {
    //   // Enable WebAssembly support
    //   cfg.experiments = {
    //     asyncWebAssembly: true, // Enable async WebAssembly modules
    //     layers: true, // Enable layers experiment
    //   }
    // },

    // Hack to make Tailwind darkMode 'class' strategy with CSS Modules
    // Ref: https://github.com/tailwindlabs/tailwindcss/issues/3258#issuecomment-968368156
    // webpack: config => {
    //   const rules = config.module.rules.find(r => !!r.oneOf);
    //   rules.oneOf.forEach(loaders => {
    //     if (Array.isArray(loaders.use)) {
    //       loaders.use.forEach(l => {
    //         if (typeof l !== 'string' && typeof l.loader === 'string' && /(?<!post)css-loader/.test(l.loader)) {
    //           if (!l.options.modules) return;
    //           const { getLocalIdent, ...others } = l.options.modules;
    //           l.options = {
    //             ...l.options,
    //             modules: {
    //               ...others,
    //               getLocalIdent: (ctx, localIdentName, localName, options) => {
    //                 if (localName === 'dark') return localName;
    //                 return getLocalIdent(ctx, localIdentName, localName, options);
    //               },
    //             },
    //           };
    //         }
    //       });
    //     }
    //   });
    // return config;
    // },
    typescript: {
      ignoreBuildErrors: true,
    },
  };

  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...defaultConfig,
    ...config,
  });
};

export default nextConfig;
