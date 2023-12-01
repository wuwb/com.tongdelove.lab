import type { EmotionCache } from '@emotion/cache';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import nextI18nextConfig from '../../next-i18next.config.mjs';
import { AppProviders } from '../providers/AppProviders';
import { trpc } from "@/utils/trpc";
import { BaseLayout } from '@/components/layouts';
// import { persistor, store } from '@/stores/index';
import { type NextPageWithLayout } from '@/types/app';
// import { Analytics } from '@vercel/analytics/react';
import { type Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { type AppProps, type AppType } from 'next/app';
import React from 'react';
// import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import nextI18NextConfig from '../../next-i18next.config';
import { appWithTranslation } from 'next-i18next';
// import { useState } from 'react';
import { trpc } from "@/utils/trpc";
import { AppProviders } from '@/providers/AppProviders';
import Head from 'next/head';

import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@/styles/globals.css';

/**
 * Import global styles, global css or polyfills here
 * i.e.: import '@/assets/theme/style.scss'
 */
import '../styles/global.css';

import '@fontsource-variable/inter';

export type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

// const helmetContext = {};

// export const metadata = {
//   viewport: {
//     width: 'device-width',
//     initialScale: 1,
//     maximumScale: 1,
//     minimumScale: 1, // to enable GPU rasterization
//     // shrinkToFit: 'no'
//   },
//   metadata: {
//     'google-site-verification': '',
//   }
// }

/**
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp = (appProps: MyAppProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, pageProps, emotionCache } = appProps;
  return (
    <AppProviders emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <ReduxProvider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BaseLayout>
      <Component {...pageProps} />
      <Analytics />
      </BaseLayout>
      {/* </PersistGate> */}
      {/* </ReduxProvider> */}
    </AppProviders>
  );
};

// MyApp.getInitialProps = async ({ ctx }) => {
//   return {
//     session: await getSession(ctx),
//   };
// };

// https://github.com/i18next/next-i18next#unserializable-configs
export default trpc.withTRPC(appWithTranslation(MyApp, {
  ...nextI18NextConfig,
}));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

