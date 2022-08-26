import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SEO } from '../SEO';

type IMetaProps = {
    title: string;
    description: string;
    canonical?: string;
    twitterCardType?: string;
    twitterUsername?: string;
    locale?: string;
    site_name?: string;
};

const Meta = (props: IMetaProps) => {
    const router = useRouter();

    return (
        <>
            <meta charSet="utf-8" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta charSet="UTF-8" key="charset" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
                key="viewport"
            />
            <meta name="robots" content="follow, index" />
            {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="referrer" content="no-referrer" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
            <link rel="manifest" href="/static/manifest.json" />
            <link rel="shortcut icon" href="/static/favicon.ico" />
            <link rel="apple-touch-icon" href="/favicons/logo192.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png" />
            <link rel="icon" href="/static/favicon.svg" />
            <link rel="icon" type="image/png" sizes="192x192" href="/static/android-chrome-192x192.png" />
            <link rel="icon" type="image/png" sizes="512x512" href="/static/android-chrome-512x512.png" />
            <link rel="icon" type="image/png" sizes="48x48" href="/static/favicon.ico" />

            <link
                rel="apple-touch-icon"
                href={`/apple-touch-icon.png`}
                key="apple"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={`/favicon-32x32.png`}
                key="icon32"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={`/favicon-16x16.png`}
                key="icon16"
            />
            <SEO
                title={props.title}
                description={props.description}
                canonical={props.canonical}
                ogLocale={props.locale}
                ogSiteName={props.site_name}
                twitterCardType={props.twitterCardType}
                twitterUsername={props.twitterUsername}
            />
        </>
    );
};

export { Meta };
