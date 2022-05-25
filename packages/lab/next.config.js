// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
    'bar', 'api'
]);
const withImages = require('next-images');
const withOffline = require('next-offline')
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = withPlugins([
    [withTM],
    [withImages],
    [withOffline, {
        workboxOpts: {
            swDest: 'static/service-worker.js',
            runtimeCaching: [
                {
                    urlPattern: /[.](png|jpg|ico|css)/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'assets-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: /^http.*/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'http-cache',
                    },
                },
            ],
        },
    }],
    {
        compiler: {
            // Remove console aside from 'error' in production
            removeConsole: {
              exclude: ['error'],
            },
            // Remove data-testid used for React Testing Library in production
            reactRemoveProperties: { properties: ['^data-testid$'] },
          },
          // Google fonts
          experimental: {
            optimizeFonts: true,
        },
        i18n,
        reactStrictMode: true,
        // Required by Next i18n with API routes, otherwise API routes 404 when fetching without trailing slash
        trailingSlash: true,
        eslint: {
            dirs: ['pages', 'src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
        },
    }
]);
