import clsx from 'clsx';
import Document, { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

import { fontSans } from '@/constants/fonts';

import { seoConfigDefault } from '@/variables/seo.data';

import { defaultLocale } from '@/cores/i18n';





type SeoConfigs = {
    canonical: string;
    description: string;
    title: string;
    thumbnail: string;
};

type Props = DocumentProps & {
    initialSeoConfig: SeoConfigs | undefined;
    test: any;
};

function MyDocument(props: Props) {
    const { initialSeoConfig } = props;
    const seoConfigs = (initialSeoConfig || {}) as SeoConfigs;
    return (
        <Html lang={defaultLocale}>
            <Head>
                {/* START: favicon */}
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/favicon/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon/favicon-16x16.png'
                />
                <link
                    rel='manifest'
                    href='/favicon/site.webmanifest'
                />
                <link
                    rel='shortcut icon'
                    href='/favicon/favicon.ico'
                />
                <link
                    rel='mask-icon'
                    href='/favicon/safari-pinned-tab.svg'
                    color='#009343'
                />
                <meta
                    name='msapplication-TileImage'
                    content='/favicon/mstile-144x144.png'
                />
                <meta
                    name='msapplication-config'
                    content='/favicon/browserconfig.xml'
                />
                <meta
                    name='theme-color'
                    content={'#ffffff'}
                />
                {/* END: favicon */}
                {/* START: SEO headers */}
                <meta
                    name='google-site-verification'
                    content=''
                />
                <link
                    rel='canonical'
                    href={seoConfigs.canonical}
                />
                <meta
                    name='title'
                    content={seoConfigs.title}
                />
                <meta
                    name='description'
                    content={seoConfigs.description}
                />
                <meta
                    name='twitter:card'
                    content='summary_large_image'
                />
                <meta
                    name='twitter:site'
                    content={'@VHS'}
                />
                <meta
                    property='og:type'
                    content='website'
                />
                <meta
                    property='og:locale'
                    content='en_US'
                />
                <meta
                    property='og:site_name'
                    content={seoConfigs.title}
                />
                <meta
                    property='og:url'
                    content={seoConfigs.canonical}
                />
                <meta
                    property='og:title'
                    content={seoConfigs.title}
                />
                <meta
                    property='og:description'
                    content={seoConfigs.description}
                />
                <meta
                    property='og:image'
                    content={seoConfigs.thumbnail}
                />
                <meta
                    property='og:type'
                    content='website'
                />
                <meta
                    property='og:image:width'
                    content='800'
                />
                <meta
                    property='og:image:height'
                    content='600'
                />
                {/* END: SEO headers */}
                <meta
                    name='robots'
                    content='index,follow'
                />
                <meta
                    name='googlebot'
                    content='index,follow'
                />
            </Head>
            <body className={clsx('h-full font-sans antialiased', fontSans.variable)}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: any) => {
    const initialProps = await Document.getInitialProps(ctx);

    const { req,  } = ctx;

    const { headers, url: pathname } = ctx.req || {};
    const { referer } = headers;

    const nextRequestMeta = req[Reflect.ownKeys(req).find((s) => String(s) === 'Symbol(NextRequestMeta)') as any];

    const { lng } = nextRequestMeta?.__NEXT_INIT_QUERY || {};

    const _lng: 'vi' | 'en' = lng || 'en';

    const canonical: string = referer;

    // fetching SEO configs for each page in here
    let initialSeoConfig: any = { canonical: (canonical || '').split('?')[0], pathname };



    try {
        switch (true) {

            default:
                initialSeoConfig = {
                    ...initialSeoConfig,
                    title: seoConfigDefault.title[_lng],
                    description: seoConfigDefault.desc[_lng],
                };
                break;
        }
    } catch (error) {
        console.log(`🚀 DEBUG::getPost _document -> error`, error);
    }

    return {
        ...initialProps,
        initialSeoConfig,
        test: {
            headers,
            url: pathname,
        },
    };
};

export default MyDocument;
