import React, { useCallback, useState, useEffect, FC } from 'react';
import App, { NextWebVitalsMetric } from "next/app"
import Head from 'next/head';
import type { AppProps } from 'next/app';
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import SiteConfig from '@/config/site';
import { AuthProvider } from '@/contexts/auth';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from "nextjs-progressbar";
import nextI18NextConfig from '../../next-i18next.config';
import '@/styles/globals.css';

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const Layout = (Component as any).Layout || Noop;

  const [authorized, setAuthorized] = useState(false);
  const [themeType, setThemeType] = useState('light');
  // const domain = useMemo(() => getDNSPrefetchValue(SiteConfig.domain), []);
  
  // useEffect(() => {
  //   if (typeof localStorage !== 'object') return null;
  //   const themeType = localStorage.getItem('theme');
  //   setThemeType(themeType === 'dark' ? 'dark' : 'light');
  //   localStorage.setItem('theme', themeType), [themeType];
  //   document.body.classList?.remove('loading');
  // }, []);

  return (
    <AuthProvider>
      <Head>
        <title>{SiteConfig.title}</title>
        {/* {domain && <link rel="dns-prefetch" href={domain} />} */}
        
        <meta name="copyright" content={SiteConfig.domain} />
        <meta name="renderer" content="webkit" />
        <meta name="theme-color" content="#000000" />
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="strict-origin" />
        <meta name="generator" content={SiteConfig.domain} />
        <meta name="author" content={SiteConfig.author} />
        <meta name="viewport" content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover" />
      </Head>
      <NextNProgress height={1} color="rgb(156, 163, 175, 0.9)" options={{ showSpinner: false }} />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   // console.log(metric);
//   const body = JSON.stringify(metric);
//   const url = 'https://api.tongdelove.com/analytics/printlake';

//   // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
//   if (navigator.sendBeacon) {
//     navigator.sendBeacon(url, body);
//   } else {
//     fetch(url, { body, method: 'POST', keepalive: true });
//   }
// }
