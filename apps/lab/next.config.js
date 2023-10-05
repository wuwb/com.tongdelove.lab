/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const withTM = require('next-transpile-modules');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
const { i18n } = require('./next-i18next.config');
const packageJson = require('./package.json');
const { createSecureHeaders } = require('next-secure-headers');

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const { loadCustomBuildParams } = require('./next-utils.config')

const { tsconfigPath } =
  loadCustomBuildParams()

// @link https://github.com/jagaapple/next-secure-headers
const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives:
      process.env.NEXT_BUILD_ENV_CSP === true
        ? {
          defaultSrc: "'self'",
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://unpkg.com/@graphql-yoga/graphiql/dist/style.css',
            'https://meet.jitsi.si',
            'https://8x8.vc',
          ],
          scriptSrc: [
            "'self'",
            "'unsafe-eval'",
            "'unsafe-inline'",
            'https://unpkg.com/@graphql-yoga/graphiql',
            // 'https://meet.jit.si/external_api.js',
            // 'https://8x8.vc/external_api.js',
          ],
          frameSrc: [
            "'self'",
            // 'https://meet.jit.si',
            // 'https://8x8.vc',
          ],
          connectSrc: [
            "'self'",
            'https://vitals.vercel-insights.com',
            'https://*.sentry.io',
            // 'wss://ws.pusherapp.com',
            // 'wss://ws-eu.pusher.com',
            // 'https://sockjs.pusher.com',
            // 'https://sockjs-eu.pusher.com',
          ],
          imgSrc: ["'self'", 'https:', 'http:', 'data:'],
          workerSrc: ['blob:'],
        }
        : {},
  },
  ...(process.env.NEXT_BUILD_ENV_CSP === true &&
    process.env.NODE_ENV === 'production'
    ? {
      forceHTTPSRedirect: [
        true,
        { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true },
      ],
    }
    : {}),
  referrerPolicy: 'same-origin',
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // output: 'standalone',
  // compiler: {
  // Remove console aside from 'error' in production
  // removeConsole: {
  //   exclude: ['error'],
  // },
  // Remove data-testid used for React Testing Library in production
  // emotion: true,
  // reactRemoveProperties: {
  //   properties: ['^data-custom$', '^data-testid$'],
  // },
  // },

  // @link https://nextjs.org/docs/advanced-features/compiler#minification
  // Sometimes buggy so enable/disable when debugging.
  // swcMinify: false,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n,

  env: {
    APP_NAME: packageJson.name ?? '',
    APP_VERSION: packageJson.version ?? '',
    BUILD_TIME: new Date().toISOString(),
  },

  // poweredByHeader: false,
  // basePath: '',
  reactStrictMode: false,
  // optimizeFonts: true,
  // httpAgentOptions: {
  //   // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
  //   keepAlive: true,
  // },
  // Required by Next i18n with API routes, otherwise API routes 404 when fetching without trailing slash
  // trailingSlash: true,

  // @link https://nextjs.org/docs/basic-features/image-optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    loader: 'default',
    dangerouslyAllowSVG: false,
    disableStaticImages: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    unoptimized: false,
    domains: [
      'www.gravatar.com',
      'iph.href.lu',
      // 加入 wordpress 相关域名
      'blog.tongdelove.com',
      '127.0.0.1',
      'localhost',
    ],
  },

  experimental: {
    // swcPlugins: [
    //   [
    //     'next-superjson-plugin',
    //     {
    //       excluded: [],
    //     },
    //   ],
    // ],

    // https://nextjs.org/docs/app/api-reference/functions/server-actions
    serverActions: true,
    serverActionsBodySizeLimit: '2mb',

    esmExternals: true,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
    // Google fonts
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },

  // typescript: {
  //   tsconfigPath,
  //   ignoreBuildErrors: true,
  // },

  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },

  eslint: {
    dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    ignoreDuringBuilds: !!process.env.CI
  },

  // async headers() {
  //   return [
  //     {
  //       // All page routes, not the api ones
  //       source: '/:path((?!api).*)*',
  //       headers: [
  //         ...secureHeaders,
  //         { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  //         { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
  //       ],
  //     },
  //     {
  //       source: '/about',
  //       headers: [
  //         {
  //           key: 'X-About-Custom-Header',
  //           value: 'about_header_value',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/news/:id',
  //       headers: [
  //         {
  //           key: 'X-News-Custom-Header',
  //           value: 'news_header_value',
  //         },
  //       ],
  //     },
  //   ];
  // },
  // async redirects() {
  //   return [
  //     // Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
  //     {
  //       source: '/blog/:slug*',
  //       destination: '/news/:slug*',
  //       permanent: false,
  //     },
  //   ];
  // },
  // async rewrites() {
  //   // if (isDev) {
  //   //   return [
  //   //     {
  //   //       source: '/api/:path*',
  //   //       destination: 'http://localhost:7001/api/:path*',
  //   //     },
  //   //   ];
  //   // }

  //   return {
  //     beforeFiles: [
  //       // These rewrites are checked after headers/redirects
  //       // and before all files including _next/public files which
  //       // allows overriding page files
  //       {
  //         source: '/some-page',
  //         destination: '/somewhere-else',
  //         has: [{ type: 'query', key: 'overrideMe' }],
  //       },
  //     ],
  //     afterFiles: [
  //       // These rewrites are checked after pages/public files
  //       // are checked but before dynamic routes
  //       {
  //         source: '/blog',
  //         destination: '/postss',
  //       },
  //     ],
  //     // fallback: [
  //     //   // These rewrites are checked after both pages/public files
  //     //   // and dynamic routes are checked
  //     //   {
  //     //     source: '/:path*',
  //     //     destination: `https://localhost:3000/:path*`,
  //     //   },
  //     // ],
  //   };
  // },

  // Hack to make Tailwind darkMode 'class' strategy with CSS Modules
  // Ref: https://github.com/tailwindlabs/tailwindcss/issues/3258#issuecomment-968368156
  webpack: (config, { isServer, webpack }) => {

    // Nextjs with Prisma 4.11.0+ (helps standalone build in monorepos)
    // https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-monorepo
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    config.resolve.fallback = {
      fs: false,
      os: false,
      path: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false
    }

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

    //   // Enable WebAssembly support
    //   config.experiments = {
    //     asyncWebAssembly: true, // Enable async WebAssembly modules
    //     layers: true, // Enable layers experiment
    //   }

    return config
  },
};

const plugins = [
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

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = async (phase, { defaultConfig }) => {
  let result = config

  if (process.env.CI === 'true') {
    result = withSentryConfig(
      config,
      {
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options

        // Suppresses source map uploading logs during build
        silent: true,

        org: 'httpsgithubcomflowgpt',
        project: 'flow-gpt',
      },
      {
        // For all available options, see:
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        tunnelRoute: '/monitoring',

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,

        // To disable the automatic instrumentation of API route handlers and server-side data fetching functions
        // In other words, disable if you prefer to explicitly handle sentry per api routes (ie: wrapApiHandlerWithSentry)
        // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#configure-server-side-auto-instrumentation
        autoInstrumentServerFunctions: false,
      }
    )
  }

  return plugins.reduce((acc, next) => next(acc), {
    ...defaultConfig,
    ...result,
  });
};

module.exports = nextConfig;
