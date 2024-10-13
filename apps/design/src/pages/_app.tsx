import React, { useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import createEmotionCache from 'src/createEmotionCache';
import reportWebVitals from 'src/reportWebVitals';
import nextI18NextConfig from '../../next-i18next.config';
import { Provider } from 'react-redux';
import store from '@/store';
import '@mantine/core/styles.css';
import '@/styles/global.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/styles/theme'
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    // Remove the server-side injected CSS.
    // const jssStyles = document.querySelectorAll('[data-emotion="css"]')
    // if (jssStyles) {
    //   jssStyles.forEach((el) => {
    //     el?.parentElement?.removeChild(el)
    //   });
    // }
  }, []);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <MantineProvider theme={theme}>
          <NavigationProgress size={1} color="rgb(156, 163, 175, 0.9)" />
          <Notifications />
          <ModalsProvider>
            <Head>
              <title>海维包装</title>
              {/* Use minimum-scale=1 to enable GPU rasterization */}
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </ModalsProvider>
        </MantineProvider>
      </CacheProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
