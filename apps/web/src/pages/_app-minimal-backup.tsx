import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { Noop } from '@/components/Noop'

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}
