import createEmotionServer from '@emotion/server/create-instance';
import {
  default as Document,
  type DocumentProps,
  Html,
  Main,
  Head,
  NextScript,
} from 'next/document';
import { createEmotionCache } from '@/lib/emotion';
import { defaultLocale } from '../../next-i18next.config.mjs';
import { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'
import i18nextConfig from '../../next-i18next.config'
import { ColorSchemeScript } from '@mantine/core';

type Props = DocumentProps & {
  // add custom document props
  emotionStyleTags?: string[];
};

class MyDocument extends Document<Props> {
  override render() {
    const locale = this.props.locale ?? defaultLocale;
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
    
    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="emotion-insertion-point" content="" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/images/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/images/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/images/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
	  <ColorSchemeScript defaultColorScheme="auto" />
        </Head>
        <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD5H2RG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Remove this method if not needed. Allows emotion to output the inlined css at insertion point (head)
// only useful when you need some way to override theme/styles (ie: using mui, mantine, chakra...).
MyDocument.getInitialProps = async (ctx) => {
  if (!ctx.req) {
    return ctx.defaultGetInitialProps(ctx);
  }
  const originalRenderPage = ctx.renderPage;
  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  return {
    ...initialProps,
    emotionStyleTags,
  };
};

// Example to process graceful shutdowns (ie: closing db or other resources)
// https://nextjs.org/docs/deployment#manual-graceful-shutdowns
if (process.env.NEXT_MANUAL_SIG_HANDLE) {
  // this should be added in your custom _document
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM: ', 'cleaning up');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT: ', 'cleaning up');
    process.exit(0);
  });
}

export default MyDocument

// process.on('unhandledRejection', err => {
//   // Sentry.captureException(err);
// });

// process.on('uncaughtException', err => {
//   // Sentry.captureException(err);
// });
