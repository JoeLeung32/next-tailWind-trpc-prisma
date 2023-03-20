const { withNx } = require('@nrwl/next/plugins/with-nx')
const { i18n } = require('./next-i18next.config')
const withMDX = require('@next/mdx')()

const nextConfig = {
    optimizeFonts: false,
    reactStrictMode: false,
    env: {
        site: 'site-var'
    },
    nx: {
        svgr: false
    },
    i18n,
    experimental: {
        appDir: true,
        mdxRs: true
    }
}

module.exports = withNx(withMDX(nextConfig))
