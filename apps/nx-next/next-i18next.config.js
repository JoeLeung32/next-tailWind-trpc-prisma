const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh']
    },
    fallbackLng: {
        default: ['en']
    },
    lowerCaseLng: true,
    cleanCode: true,
    nonExplicitSupportedLngs: true,
    localePath: path.resolve('./apps/nx-next/public/locales')
}
