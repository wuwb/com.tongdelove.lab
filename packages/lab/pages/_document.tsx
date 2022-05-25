import * as React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/createEmotionCache';
import theme from '../src/theme/theme';

// avoid CSS animation transition flashing
export const DISABLE_SSR_TRANSITION = 'disable-SSR-transition';

type MyDocumentProps = {
  locale: 'en' | 'zh';
};

process.on('unhandledRejection', (err) => {
  // Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
  // Sentry.captureException(err);
});

export default class MyDocument extends Document<MyDocumentProps & DocumentInitialProps> {
  static defaultProps = {
    locale: 'es',
  };

  // `getInitialProps` belongs to `_document` (instead of `_app`),
  // it's compatible with static-site generation (SSG).
  static async getInitialProps(ctx: DocumentContext) {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags
      ]
      // emotionStyleTags,
    };
  }

  render() {
    const [lang] = this.props.locale;

    return (
      <Html lang={lang} dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="Description"
            content="an example of NextJS app with 100% accessible lighthouse score"
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="referrer" content="no-referrer" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicons/logo192.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png" />
          <link rel="icon" href="/static/favicon.svg" />
          <link rel="icon" type="image/png" sizes="192x192" href="/static/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/static/android-chrome-512x512.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/static/favicon.ico" />

          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <style
            id={DISABLE_SSR_TRANSITION}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: '*, *::before, *::after { transition: none !important; }',
            }}
          />
        </body>
      </Html>
    );
  }
}


