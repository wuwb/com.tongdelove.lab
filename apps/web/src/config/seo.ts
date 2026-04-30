import { SiteConfig } from './site'

export const Config = {
  title: SiteConfig.title,
  titleTemplate: `%s - ${SiteConfig.title}`,
  description: SiteConfig.description,
  openGraph: {
    title: SiteConfig.title,
    locale: 'zh_CN',
    url: `https://${SiteConfig.domain}`,
    site_name: SiteConfig.title,
    description: SiteConfig.description,
    type: 'website',
    images: [
      {
        url: '/card.png',
        width: 1200,
        height: 630,
        alt: SiteConfig.title,
      },
    ],
  },
  twitter: {
    handle: '@' + SiteConfig.twitter,
    site: '@' + SiteConfig.twitter,
    cardType: 'summary_large_image',
    image: '/card.png',
    creator: '@' + SiteConfig.twitter,
  },
}
