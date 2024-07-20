import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
