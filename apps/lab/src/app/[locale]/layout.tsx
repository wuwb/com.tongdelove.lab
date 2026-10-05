import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { config } from '../../../next-seo.config'
import { isValidLocale } from '@/i18n/routing'
import { AppProviders } from '@/contexts/AppProviders'
import { ClientI18nInitializer } from '@/i18n/client-provider'
import { FeatureProviders } from '@/contexts/FeatureProviders'
import { SessionProvider } from 'next-auth/react'
import { Layout } from '@/components/Layout'
import { TRPCReactProvider } from '@/trpc/react'
import { auth } from '@/auth'
import '@/styles/globals.css'

/**
 * 迁移自 pages/_document.tsx + pages/_app.tsx：
 * - _document 的 <Head> 内容改为这里的 metadata / <head> 元素
 * - _app 的全局 Provider 栈、Layout 包裹搬到这里
 */
export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  icons: {
    icon: [
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon/favicon.ico', sizes: '16x16' },
    ],
    apple: '/images/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/images/favicon/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Printlake Lab',
  },
  other: {
    'msapplication-TileColor': '#da532c',
    'msapplication-config': '/images/favicon/browserconfig.xml',
  },
  openGraph: config.openGraph as Metadata['openGraph'],
  twitter: {
    card: 'summary_large_image',
    creator: 'wuwb_',
  },
  robots: {
    follow: true,
    index: true,
  },
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const session = await auth()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://${locale}.vercel.app`}
        />
        {/* 迁移自 _document.tsx 的百度统计 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?4f4cd00ad9a4344b61ec0e69523ea883";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          `,
          }}
        />
        {/* 迁移自 _document.tsx 的 Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JCGSDTJ20H"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JCGSDTJ20H');
          `,
          }}
        />
      </head>
      <body>
        <ClientI18nInitializer locale={locale}>
          <AppProviders>
            <TRPCReactProvider>
              <SessionProvider session={session}>
                <FeatureProviders>
                  <Layout>{children}</Layout>
                </FeatureProviders>
              </SessionProvider>
            </TRPCReactProvider>
          </AppProviders>
        </ClientI18nInitializer>
      </body>
    </html>
  )
}
