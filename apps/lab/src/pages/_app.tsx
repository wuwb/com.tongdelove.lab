import { AppType, AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { trpc } from '@/utils/trpc'
import { Layout } from '@/components/Layout'
import React, { useEffect, ReactElement } from 'react'
import nextI18NextConfig from '../../next-i18next.config'
import { AppProviders } from '@/contexts/AppProviders'
import { FeatureProviders } from '@/contexts/FeatureProviders'
import { type Session } from 'next-auth'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { config } from '../../next-seo.config'
import { SessionProvider } from 'next-auth/react'
import { NextPage } from 'next'
import { useTranslation } from '@/i18n'

import '@/styles/globals.css'

if (typeof window === 'undefined') {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // React.useLayoutEffect = () => { }
}

/**
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */

type NextPageWithLayout = NextPage & {
  setLayout?: (page: ReactElement) => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const { t } = useTranslation()
  const setLayout = Component.setLayout ?? ((page) => <>{page}</>)

  // Forbid touch scale
  useEffect(() => {
    document.addEventListener(
      'wheel',
      function (e) {
        if (e.ctrlKey && Math.abs(e.deltaY) !== 0) {
          e.preventDefault()
        }
      },
      { passive: false }
    )
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <DefaultSeo {...config} />
      <AppProviders>
        <SessionProvider
          session={session}
          // refetchInterval={0}
          // refetchOnWindowFocus={false}
        >
          <FeatureProviders>
            <Layout>{setLayout(<Component {...pageProps} />)}</Layout>
          </FeatureProviders>
        </SessionProvider>
      </AppProviders>
    </>
  )
}

// https://github.com/i18next/next-i18next#unserializable-configs
export default trpc.withTRPC(
  appWithTranslation(MyApp, {
    ...nextI18NextConfig,
  })
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
