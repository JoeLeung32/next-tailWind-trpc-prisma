import Head from 'next/head'
import { AppProps } from 'next/app'
import { trpc } from '../utils/trpc'
import { SiteProvider } from '../contexts/site'
import './styles.css'
import { inter, notoSansTC, nunito, rubik } from '../constants/fonts'

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
                    <Component {...pageProps} />
                </main>
            </>
        </SiteProvider>
    )
}

export default trpc.withTRPC(WebApp)
