import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SiteConfig } from '@/config/site'
import { GlobalProviders } from '@/contexts/GlobalProviders'
import '@/styles/globals.css'
import { Noop } from '@/components/Noop'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop
  return (
    <GlobalProviders>
      <Head>
        <title>{SiteConfig.title}</title>
        <meta name="copyright" content="printlake.com" />
        <meta name="renderer" content="webkit" />
        <meta name="theme-color" content="#000000" />
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="strict-origin" />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </GlobalProviders>
  )
}

export default MyApp
