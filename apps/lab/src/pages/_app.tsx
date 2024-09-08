import { Analytics } from '@vercel/analytics/react'
import { type AppType } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { trpc } from '@/utils/trpc'
import { Layout } from '@/components/Layout'
import React from 'react'
import nextI18NextConfig from '../../next-i18next.config'
import { AppProviders } from '@/providers/AppProviders'
import NextNProgress from 'nextjs-progressbar'
import { type Session } from 'next-auth'
import Head from 'next/head'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ViewTransitions } from 'next-view-transitions'
import { DefaultSeo } from 'next-seo'
import { config } from '../../next-seo.config'
import { MantineProvider } from '@mantine/core'
import { theme } from '../theme'
import '@/styles/globals.css'
import { SSRHidden } from '@/components/Atom/SSRHidden'

/* @import "@mantine/core/styles.layer.css"; */
import '@mantine/core/styles.css'

/* Mantine foundational components */
import '@mantine/core/styles/ScrollArea.css'
import '@mantine/core/styles/UnstyledButton.css'
import '@mantine/core/styles/VisuallyHidden.css'
import '@mantine/core/styles/Paper.css'
import '@mantine/core/styles/Popover.css'
import '@mantine/core/styles/CloseButton.css'
import '@mantine/core/styles/Group.css'
import '@mantine/core/styles/Loader.css'
import '@mantine/core/styles/Overlay.css'
import '@mantine/core/styles/ModalBase.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/Flex.css'

/* Mantine components */
import '@mantine/core/styles/Button.css'

import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import { Notifications } from '@mantine/notifications'

if (typeof window === 'undefined') {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // React.useLayoutEffect = () => { }
}

/**
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <DefaultSeo {...config} />
      <AppProviders session={session}>
        <MantineProvider theme={theme}>
          <Notifications />
          <NextNProgress
            color="#fff"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={false}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Analytics />
          <SSRHidden>
            <SpeedInsights />
          </SSRHidden>
        </MantineProvider>
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
