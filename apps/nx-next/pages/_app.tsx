import Head from 'next/head';
import {AppProps} from 'next/app';
import {trpc} from '../utils/trpc';
import './styles.css';

function CustomApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to nx-next!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default trpc.withTRPC(CustomApp);
