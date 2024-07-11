import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';

class MyDocument extends Document {

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

    render() {
      return (
        <Html lang="zh-cn">
          <Head>
            <script dangerouslySetInnerHTML={{
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
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
}

export default MyDocument;
