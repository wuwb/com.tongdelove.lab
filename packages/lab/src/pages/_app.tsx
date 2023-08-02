import { ErrorBoundary } from '@/components/common';
import { title } from '@/constants';
import { persistor, store } from '@/store/index';
import '@/styles/nprogress.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import { NextPageWithLayout } from '@/types/app';
import { StyledEngineProvider } from '@mui/material/styles';
import { QueryClient } from '@tanstack/query-core';
import {
  Hydrate,
  QueryClientProvider
} from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import nextI18NextConfig from '../../next-i18next.config.js';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next'

interface MyAppProps extends AppProps {
}

export type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout
}

const helmetContext = {};

NProgress.configure({ showSpinner: false });

export const metadata: Metadata = {
  title,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1, // to enable GPU rasterization
    // shrinkToFit: 'no'
  },
}

const MyApp = (props: AppPropsWithLayout) => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  }));

  const { Component, pageProps } = props;
  let getLayout = Component.getLayout || (page => page);

  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, [router]);

  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <HelmetProvider context={helmetContext}>
                  <StyledEngineProvider injectFirst>
                    <ThemeProvider>
                      <Component {...pageProps} />
                    </ThemeProvider>
                  </StyledEngineProvider>
                </HelmetProvider>
              </Hydrate>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
          </ErrorBoundary>
        </PersistGate>
      </ReduxProvider>
      <Analytics />
    </>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
