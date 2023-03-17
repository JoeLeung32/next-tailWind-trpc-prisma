const { withNx } = require('@nrwl/next/plugins/with-nx')
const withMDX = require('@next/mdx')()

const nextConfig = {
    optimizeFonts: false,
    env: {
        site: 'site-var'
    },
    nx: {
        svgr: false
    },
    experimental: {
        appDir: true,
        mdxRs: true
    }
}

module.exports = withNx(withMDX(nextConfig))
