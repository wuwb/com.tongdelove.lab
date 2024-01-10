import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from '../src/theme/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />

          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
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
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
  };
};
