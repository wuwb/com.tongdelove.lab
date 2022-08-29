// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
const withPlugins = require('next-compose-plugins');
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = withPlugins([
    {
        i18n,
        reactStrictMode: true,
        // Required by Next i18n with API routes, otherwise API routes 404 when fetching without trailing slash
        trailingSlash: true,
    }
]);
