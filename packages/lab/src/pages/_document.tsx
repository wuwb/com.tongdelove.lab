import * as React from 'react';
import { NextPage } from 'next';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { Helmet } from 'react-helmet';
import { Meta } from '@/components/common';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@/createEmotionCache';
import theme from '@/theme/theme';
import i18nextConfig from '../../next-i18next.config';

// avoid CSS animation transition flashing
export const DISABLE_SSR_TRANSITION = 'disable-SSR-transition';

type MyDocumentProps = {
  locale: 'en' | 'zh';
  helmet: any;
};

process.on('unhandledRejection', err => {
  // Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  // Sentry.captureException(err);
});

class MyDocument extends Document<MyDocumentProps & DocumentInitialProps> {
  static defaultProps = {
    locale: 'en',
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

    const initialProps = await super.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      helmet: Helmet.renderStatic(),
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
      // emotionStyleTags,
    };
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  render() {
    const [lang] = this.props.locale;
    const currentLocale = this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

    // todo 参数抽离到配置中
    return (
      <Html lang={lang} dir="ltr" {...this.helmetHtmlAttrComponents}>
        <Head>
          <Meta title="NextJS App" description="an example of NextJS app with 100% accessible lighthouse score"></Meta>
          {this.helmetHeadComponents}
          {/* PWA primary color */}
          {/*

          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body {...this.helmetBodyAttrComponents} s>
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


export default MyDocument;
