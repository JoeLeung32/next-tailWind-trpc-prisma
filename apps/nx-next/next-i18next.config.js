const path = require('path')

module.exports = {
    debug: process.env.NODE_ENV === 'development',
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    localePath: process.env.VERCEL_REGION
        ? path.resolve('./public/locales') // Serverless function: /var/task/apps/nx-next/public/locales
        : path.resolve('./apps/nx-next/public/locales'), // Server Path: /vercel/path0/apps/nx-next/public/locales
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh']
    },
    fallbackLng: {
        default: ['en']
    },
    lowerCaseLng: true,
    cleanCode: true,
    nonExplicitSupportedLngs: true
}
