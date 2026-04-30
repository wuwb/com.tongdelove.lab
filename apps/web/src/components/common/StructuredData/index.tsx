import React from 'react'
import { SiteConfig } from '@/config/site'

export interface OrganizationProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  foundingDate?: string
  sameAs?: string[]
}

export interface WebSiteProps {
  name?: string
  url?: string
  description?: string
  potentialAction?: {
    '@type': string
    target: string
    'query-input'?: string
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface BreadcrumbListProps {
  items: BreadcrumbItem[]
}

export interface ProductProps {
  name: string
  description?: string
  image?: string | string[]
  sku?: string
  mpn?: string
  brand?: {
    '@type': string
    name: string
  }
  offers?: {
    '@type': string
    price?: number
    priceCurrency?: string
    availability?: string
    url?: string
    priceValidUntil?: string
  }[]
  aggregateRating?: {
    '@type': string
    ratingValue?: number
    reviewCount?: number
  }
}

export const Organization: React.FC<OrganizationProps> = ({
  name = SiteConfig.organization.name,
  url = SiteConfig.siteUrl,
  logo = `${SiteConfig.siteUrl}${SiteConfig.organization.logo}`,
  description = SiteConfig.description,
  foundingDate = SiteConfig.organization.foundingDate,
  sameAs = [],
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    foundingDate,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const WebSite: React.FC<WebSiteProps> = ({
  name = SiteConfig.title,
  url = SiteConfig.siteUrl,
  description = SiteConfig.description,
  potentialAction,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: potentialAction || {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const BreadcrumbList: React.FC<BreadcrumbListProps> = ({ items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SiteConfig.siteUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const Product: React.FC<ProductProps> = ({
  name,
  description,
  image,
  sku,
  mpn,
  brand,
  offers,
  aggregateRating,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description || undefined,
    image: image
      ? Array.isArray(image)
        ? image.map((img) =>
            img.startsWith('http') ? img : `${SiteConfig.siteUrl}${img}`
          )
        : image.startsWith('http')
          ? image
          : `${SiteConfig.siteUrl}${image}`
      : undefined,
    sku: sku || undefined,
    mpn: mpn || undefined,
    brand: brand || {
      '@type': 'Brand',
      name: SiteConfig.organization.name,
    },
    offers: offers || undefined,
    aggregateRating: aggregateRating || undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const LocalBusiness: React.FC<{
  name?: string
  description?: string
  url?: string
  telephone?: string
  email?: string
  address?: {
    '@type': string
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  openingHours?: string[]
  priceRange?: string
}> = ({
  name = SiteConfig.organization.name,
  description = SiteConfig.description,
  url = SiteConfig.siteUrl,
  telephone,
  email = SiteConfig.email,
  address,
  openingHours,
  priceRange,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    telephone: telephone || undefined,
    email,
    address: address || undefined,
    openingHours: openingHours || undefined,
    priceRange: priceRange || undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
