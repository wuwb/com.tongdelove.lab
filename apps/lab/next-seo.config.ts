import { DefaultSeoProps } from 'next-seo';

export const config: DefaultSeoProps = {
  title: 'Printlake Lab',
  description: 'Explore the innovative world of Printlake Lab with our cutting-edge technology and creative solutions.',
  openGraph: {
    type: 'website',
    title: 'Printlake Lab',
    description: 'Explore the innovative world of Printlake Lab with our cutting-edge technology and creative solutions.',
    url: 'https://lab.printlake.com/',
    locale: 'zh_CN',
    siteName: 'Printlake Lab',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
