import type { AppContext, AppInitialProps, AppProps } from 'next/app';

import { HeroUIProvider } from '@heroui/system';
import App from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect } from 'react';

import { NextUILocale } from '@/types/nextui.type';

import { fontMono, fontSans } from '@/constants/fonts';

import { i18n, I18nProvider } from '@/cores/i18n';

import '@/styles/globals.css';

import PageRoot from './root';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    useEffect(() => {
        i18n.init();
    }, []);
    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover'
                />
            </Head>

            <HeroUIProvider
                locale={NextUILocale.En}
                navigate={router.push}
            >
                <NextThemesProvider>
                    <I18nProvider i18n={i18n}>
                        <PageRoot>
                            <Component {...pageProps} />
                        </PageRoot>
                    </I18nProvider>
                </NextThemesProvider>
            </HeroUIProvider>
        </>
    );
}

MyApp.getInitialProps = async (ctx: AppContext): Promise<AppInitialProps> => {
    const initialProps = await App.getInitialProps(ctx);
    return initialProps;
};

export default MyApp;

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily,
};
