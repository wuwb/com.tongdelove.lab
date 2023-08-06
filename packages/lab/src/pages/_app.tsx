import { BaseLayout } from '@/components/layouts';
import { title } from '@/constants';
import { persistor, store } from '@/store/index';
import { NextPageWithLayout } from '@/types/app';
import { QueryClient } from '@tanstack/query-core';
import { Analytics } from '@vercel/analytics/react';
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from 'next-plausible';
import { AppProps, type AppType } from 'next/app';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import nextI18NextConfig from '../../next-i18next.config.cjs';
import { api } from "@/utils/api";
import '../styles/code-highlight.css';
import '../styles/globals.css';
import '../styles/markdown.css';
import '../styles/quill.css';
import { appWithTranslation } from 'next-i18next';

type MyAppProps = AppProps

export type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout
}

const helmetContext = {};

export const metadata = {
  title,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1, // to enable GPU rasterization
    // shrinkToFit: 'no'
  },
  metadata: {
    'google-site-verification': '',
  }
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  }));

  return (
    <SessionProvider session={session}>
      <PlausibleProvider domain="flowgpt.com" trackOutboundLinks>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BaseLayout>
              <Component {...pageProps} />
              <Analytics />
            </BaseLayout>
          </PersistGate>
        </ReduxProvider>
      </PlausibleProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp, nextI18NextConfig)); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
