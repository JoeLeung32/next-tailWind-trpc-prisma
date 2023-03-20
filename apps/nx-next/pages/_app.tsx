// -- Tailwind CSS
import './styles.css'
// -- Google Fonts
import { inter, notoSansTC, nunito, rubik } from '../constants/fonts'
// -- Fontawesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// -- React/Next
import React from 'react'
import { appWithTranslation } from 'next-i18next'
import i18nConfig from '../next-i18next.config'
import Router from 'next/router'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { trpc } from '../utils/trpc'
import { SiteProvider } from '../contexts/site'
import LoadingSpinner from '../components/LoadingSpinner'
import TopBar from '../components/Topbar/topbar'
import Footer from '../components/Footer/footer'

config.autoAddCss = false

const fontGoogle = `${inter.variable} ${notoSansTC.variable} ${nunito.variable} ${rubik.variable}`

function WebApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        const start = () => {
            setLoading(true)
        }
        const end = () => {
            setLoading(false)
        }
        Router.events.on('routeChangeStart', start)
        Router.events.on('routeChangeComplete', end)
        Router.events.on('routeChangeError', end)
        return () => {
            Router.events.off('routeChangeStart', start)
            Router.events.off('routeChangeComplete', end)
            Router.events.off('routeChangeError', end)
        }
    }, [])
    return (
        <SiteProvider>
            <>
                <Head>
                    <title>Learnbook</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                </Head>
                <main className={`app ${fontGoogle} font-sans`}>
                    <TopBar />
                    <>
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <Component {...pageProps} />
                                <Footer />
                            </>
                        )}
                    </>
                </main>
            </>
        </SiteProvider>
    )
}

export default trpc.withTRPC(appWithTranslation(WebApp, i18nConfig))
