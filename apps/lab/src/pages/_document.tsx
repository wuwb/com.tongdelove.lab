import { Head, Html, Main, NextScript } from 'next/document'

import type { DocumentProps } from 'next/document'
import i18nextConfig from '../../next-i18next.config'
import { ColorSchemeScript } from '@mantine/core';

type Props = DocumentProps & {
  // add custom document props
}

export default function Document(props: Props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Lab"></meta>
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
  )
}


// Example to process graceful shutdowns (ie: closing db or other resources)
// https://nextjs.org/docs/deployment#manual-graceful-shutdowns
if (process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM: ', 'cleaning up');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT: ', 'cleaning up');
    process.exit(0);
  });
}

// process.on('unhandledRejection', err => {
//   // Sentry.captureException(err);
// });

// process.on('uncaughtException', err => {
//   // Sentry.captureException(err);
// });
