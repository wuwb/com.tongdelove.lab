import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'
import { GoogleAnalytics } from '@next/third-parties/google'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="zh-cn" suppressHydrationWarning>
        <Head />
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KD5H2RG"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
          <GoogleAnalytics gaId="G-26TZGP2HCH" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
