import type { NextApiRequest, NextApiResponse } from 'next'
import { SiteConfig } from '@/config/site'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}

const staticPages: SitemapUrl[] = [
  { loc: '/', changefreq: 'daily', priority: 1.0 },
  { loc: '/about', changefreq: 'monthly', priority: 0.8 },
  { loc: '/products', changefreq: 'weekly', priority: 0.9 },
  { loc: '/products/carton', changefreq: 'weekly', priority: 0.8 },
  { loc: '/products/folding-carton', changefreq: 'weekly', priority: 0.8 },
  { loc: '/products/corrugatedbox', changefreq: 'weekly', priority: 0.8 },
  { loc: '/products/bags', changefreq: 'weekly', priority: 0.8 },
  { loc: '/products/accessories', changefreq: 'weekly', priority: 0.7 },
  { loc: '/solutions', changefreq: 'monthly', priority: 0.8 },
  { loc: '/services', changefreq: 'monthly', priority: 0.8 },
  { loc: '/features', changefreq: 'monthly', priority: 0.7 },
  { loc: '/why', changefreq: 'monthly', priority: 0.7 },
  { loc: '/customers', changefreq: 'monthly', priority: 0.7 },
  { loc: '/pricing', changefreq: 'monthly', priority: 0.7 },
  { loc: '/team', changefreq: 'yearly', priority: 0.6 },
  { loc: '/introduce', changefreq: 'monthly', priority: 0.7 },
  { loc: '/certifications', changefreq: 'yearly', priority: 0.6 },
  { loc: '/sustainability', changefreq: 'monthly', priority: 0.7 },
  { loc: '/materials', changefreq: 'monthly', priority: 0.7 },
  { loc: '/industry', changefreq: 'monthly', priority: 0.7 },
  { loc: '/guides/dielines', changefreq: 'monthly', priority: 0.6 },
  { loc: '/guides/vectorizing', changefreq: 'monthly', priority: 0.6 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
  { loc: '/help', changefreq: 'monthly', priority: 0.6 },
  { loc: '/terms', changefreq: 'yearly', priority: 0.5 },
  { loc: '/privacy', changefreq: 'yearly', priority: 0.5 },
]

function generateSitemapXml(urls: SitemapUrl[]): string {
  const baseUrl = SiteConfig.siteUrl

  const urlEntries = urls
    .map((url) => {
      const parts = [`<loc>${baseUrl}${url.loc}</loc>`]
      if (url.lastmod) {
        parts.push(`<lastmod>${url.lastmod}</lastmod>`)
      }
      if (url.changefreq) {
        parts.push(`<changefreq>${url.changefreq}</changefreq>`)
      }
      if (url.priority !== undefined) {
        parts.push(`<priority>${url.priority.toFixed(1)}</priority>`)
      }
      return `<url>${parts.join('')}</url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemapXml = generateSitemapXml(staticPages)

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate'
  )

  return res.status(200).send(sitemapXml)
}
