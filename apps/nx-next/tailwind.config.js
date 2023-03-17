const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')
const stylePack = require('./constants/colorPacks/2023-Spring.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname)
    ],
    theme: {
        extend: {
            colors: {
                ...stylePack
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100ch'
                    }
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography')
    ]
}
