import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { trpc } from "@/utils/trpc";
import { BaseLayout } from '@/components/layouts';
import React from 'react';
import nextI18NextConfig from '../../next-i18next.config';
import { AppProviders } from '@/providers/AppProviders';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@/styles/globals.css';

if (typeof window === 'undefined') {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  React.useLayoutEffect = () => { }
}

/**
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return (
    <AppProviders>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <BaseLayout>
        <Component {...pageProps} />
        <Analytics />
      </BaseLayout>
    </AppProviders>
  )
}

// https://github.com/i18next/next-i18next#unserializable-configs
export default trpc.withTRPC(appWithTranslation(MyApp, {
  ...nextI18NextConfig,
}));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

