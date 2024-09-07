import { MantineProvider } from '@mantine/core'
import { TRPCReactProvider } from '@/trpc/react'
// import AppContextProvider from '@/contexts/AppContext'
import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import { GoogleAnalytics } from '@/components/metrics/GoogleAnalytics'
import { MicrosoftClarity } from '@/components/metrics/MicrosoftClarity'
import { ThemeProvider, ThemeToggle } from '@tongdelove/ui/theme'
import { CartProvider } from '@/components/cart/cart-context'
import { Navbar } from '@/components/Layout/navbar'
import { WelcomeToast } from '@/components/welcome-toast'
import { getCart } from '@/lib/shopify'
import { ensureStartsWith } from '@/lib/utils'
import { cookies } from 'next/headers'
import { Toaster } from 'sonner'
import './globals.css'
import { env } from '@/env/client'

const baseUrl = env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

const twitterCreator = 'wuwb_' ? ensureStartsWith('wuwb_', '@') : undefined

const twitterSite = 'https://x.com/wuwb_'
  ? ensureStartsWith('https://x.com/wuwb_', 'https://')
  : undefined

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'printlake lab'!,
    template: `%s | ${'printlake lab'}`,
  },
  description: '',
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
    twitter: {
      card: 'summary_large_image',
      creator: twitterCreator,
      site: twitterSite,
    },
  }),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cartId = cookies().get('cartId')?.value
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId)

  return (
    <html lang="en" suppressHydrationWarning={false}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <AppContextProvider> */}
          <TRPCReactProvider>
            {/* <TRPCReactProvider cookies={cookies().toString()}> */}
            <MantineProvider>
              <CartProvider cartPromise={cart}>
                <Navbar />
                {/* <Layout> */}
                {children}
                {/* </Layout> */}
              </CartProvider>
            </MantineProvider>
          </TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
          <WelcomeToast />
        </ThemeProvider>

        {/* </AppContextProvider> */}
        <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_ID} />
        <MicrosoftClarity id={process.env.NEXT_PUBLIC_MC_ID} />
      </body>
    </html>
  )
}
