// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['../bar'])
// const withOffline = require('next-offline')
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = withPlugins([
    [withTM],
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
    {
        i18n,
        reactStrictMode: true,
        // Required by Next i18n with API routes, otherwise API routes 404 when fetching without trailing slash
        trailingSlash: true,
    }
]);
