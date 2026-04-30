import type { AppProps } from 'next/app'
import { Head } from '@/components/common/Head'
import { GlobalProviders } from '@/contexts/GlobalProviders'
import '@/styles/globals.css'
import { Noop } from '@/components/Noop'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop
  return (
    <GlobalProviders>
      <Head />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </GlobalProviders>
  )
}

export default MyApp
