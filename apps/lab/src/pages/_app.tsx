import { Analytics } from '@vercel/analytics/react'
import { type AppType } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { trpc } from '@/utils/trpc'
import { Layout } from '@/components/Layout'
import React from 'react'
import nextI18NextConfig from '../../next-i18next.config'
import { AppProviders } from '@/providers/AppProviders'
import NextNProgress from 'nextjs-progressbar'
import '@/styles/globals.css'
import { type Session } from 'next-auth'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
// import { env } from '../env.js'

if (typeof window === 'undefined') {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // React.useLayoutEffect = () => { }
}

/**
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <AppProviders>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <NextNProgress color="#fff" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={false} />
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <Analytics />
        <SpeedInsights />
      </AppProviders>
    </SessionProvider>
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
