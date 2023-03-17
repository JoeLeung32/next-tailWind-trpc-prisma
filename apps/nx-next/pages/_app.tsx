// -- Tailwind CSS
import './styles.css'
// -- Google Fonts
import { inter, notoSansTC, nunito, rubik } from '../constants/fonts'
// -- Fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
// -- React/Next
import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { trpc } from '../utils/trpc'
import { SiteProvider } from '../contexts/site'
import TopBar from '../components/Topbar/topbar'
import Footer from '../components/Footer/footer'

const fontGoogle = `${inter.variable} ${notoSansTC.variable} ${nunito.variable} ${rubik.variable}`

function WebApp({ Component, pageProps }: AppProps) {
    return (
        <SiteProvider>
            <>
                <Head>
                    <title>Learnbook</title>
                    <meta name="description" content="" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                </Head>
                <main className={`app ${fontGoogle} font-sans`}>
                    <TopBar />
                    <Component {...pageProps} />
                    <Footer />
                </main>
            </>
        </SiteProvider>
    )
}

export default trpc.withTRPC(WebApp)
