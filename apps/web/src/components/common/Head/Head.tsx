import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import { Config } from '@/config/seo'
import { SiteConfig } from '@/config/site'
import { Organization, WebSite } from '@/components/common/StructuredData'

export const Head = (props) => {
  return (
    <>
      <DefaultSeo {...Config} />
      <Organization />
      <WebSite />
      <NextHead>
        <meta charSet="utf-8" />

        {/* meta */}
        <meta httpEquiv="Cache-Control" content="no-transform" />
        <meta httpEquiv="Content-Language" content={SiteConfig.language} />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta httpEquiv="cleartype" content="on" />

        {/* viewport minium-ui */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        <meta name="keywords" content={SiteConfig.keywords.join(',')} />
        <meta name="author" content={SiteConfig.author} />
        <meta name="copyright" content={SiteConfig.domain} />
        <meta name="renderer" content="webkit" />
        <meta name="theme-color" content="#000000" />
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* <link rel="stylesheet" href="/vendor/bootstrap/4.2.1/bootstrap.min.css" /> */}
        {/* <link rel="stylesheet" href="/common/css/index.css" /> */}
        {/* <script src="/vendor/popper/1.14.6/popper.min.js"></script> */}
        {/* <script src="/vendor/bootstrap/4.2.1/bootstrap.min.js"></script> */}
        {/* <script src="/common/js/index.js"></script> */}
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="alternate"
          type="application/rss+xml"
          title={SiteConfig.title}
          href="/atom.xml"
        />

        <link rel="canonical" href={SiteConfig.siteUrl} />

        {SiteConfig.googleSearchConsole && (
          <meta
            name="google-site-verification"
            content={SiteConfig.googleSearchConsole}
          />
        )}

        {SiteConfig.bingWebmasterTools && (
          <meta name="msvalidate.01" content={SiteConfig.bingWebmasterTools} />
        )}
      </NextHead>
    </>
  )
}
