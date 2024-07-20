import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import config from '@/config/seo'

const Head: FC = (props) => {
  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta charSet="utf-8" />

        {/* meta */}
        <meta httpEquiv="Cache-Control" content="no-transform " />
        <meta httpEquiv="Content-Language" content="zh-cn" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta httpEquiv="last-modified" content="" />
        <meta httpEquiv="cleartype" content="on" />

        {/* viewport minium-ui */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <meta name="keywords" content="包装,印刷" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/favicon/site.webmanifest" /> */}
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

        <meta property="og:image" content="" />

        {/* <link rel="stylesheet" href="/vendor/bootstrap/4.2.1/bootstrap.min.css" /> */}
        {/* <link rel="stylesheet" href="/common/css/index.css" /> */}
        {/* <script src="/vendor/popper/1.14.6/popper.min.js"></script> */}
        {/* <script src="/vendor/bootstrap/4.2.1/bootstrap.min.js"></script> */}
        {/* <script src="/common/js/index.js"></script> */}

        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  )
}

export default Head
