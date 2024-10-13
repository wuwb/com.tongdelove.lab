import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

const MyDocument = () => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta charSet="utf-8" />

        <meta
          name="Description"
          content="an example of NextJS app with 100% accessible lighthouse score"
        />

        {/* <link rel="manifest" href="/static/manifest.json" /> */}
        {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
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
