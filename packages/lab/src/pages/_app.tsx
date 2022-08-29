import React, { useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ErrorBoundary } from '@/components/common';
import ThemeProvider from '@/theme/ThemeProvider';
import createEmotionCache from '@/createEmotionCache';
import reportWebVitals from '@/reportWebVitals';
import { title } from '@/constants';
import '@/styles/globals.scss';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/index';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: any; // NextPageWithLayout;
}

const helmetContext = {};

function MyApp(props: MyAppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  let getLayout = Component.getLayout || (page => page);

  // if (Component.layout) {
  //   // eslint-disable-next-line no-console
  //   getLayout = (page) => (<Component.layout>{page}</Component.layout>);
  // }

  // useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side')
  //   if (jssStyles) {
  //     jssStyles?.parentElement?.removeChild(jssStyles)
  //   }
  // }, []);

  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <HelmetProvider context={helmetContext}>
                  <CacheProvider value={emotionCache}>
                    <Head>
                      <title>{title}</title>
                      {/* Use minimum-scale=1 to enable GPU rasterization */}
                      <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                      />
                    </Head>
                    <ThemeProvider>
                      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                      <CssBaseline />
                      <NextNProgress height={1} color="rgb(156, 163, 175, 0.9)" options={{ showSpinner: false }} />
                      {getLayout(<Component {...pageProps} />)}
                    </ThemeProvider>
                  </CacheProvider>
                </HelmetProvider>
              </Hydrate>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ErrorBoundary>
        </PersistGate>
      </ReduxProvider>
    </>

  );
}

export default appWithTranslation(MyApp); //

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
