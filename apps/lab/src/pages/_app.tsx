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
import { theme } from '../theme';
// import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { trpc } from "@/utils/trpc";
import { AppProviders } from '@/providers/AppProviders';
import Head from 'next/head';

import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@/styles/globals.css';
// import '@/styles/markdown.css';

type MyAppProps = AppProps

export type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout
}

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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  return (
    <AppProviders>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <ReduxProvider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <MantineProvider theme={theme}>
        <BaseLayout>
          <Component {...pageProps} />
          {/* <Analytics /> */}
        </BaseLayout>
      </MantineProvider>
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
export default trpc.withTRPC(appWithTranslation(MyApp, nextI18NextConfig));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

