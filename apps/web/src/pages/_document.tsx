import React from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

const MyDocument = () => {
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   const styles = extractCritical(initialProps.html)
  //   const styles2 = CssBaseline.flush()

  //   return {
  //     ...initialProps,
  //     styles: (
  //       <>
  //         {initialProps.styles}
  //         {styles2}
  //         <style
  //           data-emotion-css={styles.ids.join(' ')}
  //           dangerouslySetInnerHTML={{ __html: styles.css }}
  //         />
  //       </>
  //     ),
  //   };
  // }

  return (
    <Html lang="zh-cn">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(){
                  if (!window.localStorage) return
                  if (window.localStorage.getItem('theme') === 'dark') {
                      document.documentElement.style.background = '#000'
                      document.body.style.background = '#000'
                  };
                })()
              `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?9af1de4a8ba999c41ffc6667bf8b1012";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
              `,
          }}
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD5H2RG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-26TZGP2HCH"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-26TZGP2HCH');
            `
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    })

  const initialProps = await Document.getInitialProps(ctx)
  const style = extractStyle(cache, true)

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  }
}

export default MyDocument
