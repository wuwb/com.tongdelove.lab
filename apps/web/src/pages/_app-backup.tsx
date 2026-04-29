import React, { useCallback, useState, useEffect, FC } from 'react'
import App, { NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { SiteConfig } from '@/config/site'
import { AuthProvider } from '@/contexts/auth'
import { appWithTranslation } from 'next-i18next'
import NextNProgress from 'nextjs-progressbar'
import nextI18NextConfig from '../../next-i18next.config'
import '@/styles/globals.css'
import { GlobalProviders } from '@/contexts/GlobalProviders'
import { Noop } from '@/components/Noop'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const Layout = (Component as any).Layout || Noop

  const [authorized, setAuthorized] = useState(false)
  const [themeType, setThemeType] = useState('light')

  return (
    <GlobalProviders>
      <AuthProvider>
        <Head>
          <title>{SiteConfig.title}</title>

          <meta name="copyright" content={SiteConfig.domain} />
          <meta name="renderer" content="webkit" />
          <meta name="theme-color" content="#000000" />
          <meta name="google" content="notranslate" />
          <meta name="referrer" content="strict-origin" />
          <meta name="generator" content={SiteConfig.domain} />
          <meta name="author" content={SiteConfig.author} />
          <meta
            name="viewport"
            content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
          />
        </Head>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </GlobalProviders>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
