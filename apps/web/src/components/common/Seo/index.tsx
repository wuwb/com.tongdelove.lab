import React from 'react'
import { NextSeo, NextSeoProps } from 'next-seo'
import { SiteConfig } from '@/config/site'

export interface SeoProps extends Partial<NextSeoProps> {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
  ...rest
}) => {
  const pageTitle = title ? `${title} - ${SiteConfig.title}` : SiteConfig.title

  const pageDescription = description || SiteConfig.description
  const pageImage = image || '/card.png'
  const pageUrl = url ? `${SiteConfig.siteUrl}${url}` : SiteConfig.siteUrl

  return (
    <NextSeo
      title={pageTitle}
      description={pageDescription}
      canonical={pageUrl}
      noindex={noindex}
      nofollow={noindex}
      openGraph={{
        type,
        url: pageUrl,
        title: pageTitle,
        description: pageDescription,
        images: [
          {
            url: pageImage.startsWith('http')
              ? pageImage
              : `${SiteConfig.siteUrl}${pageImage}`,
            width: 1200,
            height: 630,
            alt: pageTitle,
          },
        ],
        site_name: SiteConfig.title,
        locale: SiteConfig.language.replace('-', '_'),
      }}
      twitter={{
        handle: '@' + SiteConfig.twitter,
        site: '@' + SiteConfig.twitter,
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: SiteConfig.keywords.join(','),
        },
        {
          name: 'author',
          content: SiteConfig.author,
        },
        {
          property: 'og:locale',
          content: SiteConfig.language.replace('-', '_'),
        },
      ]}
      {...rest}
    />
  )
}
