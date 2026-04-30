import type { NextApiRequest, NextApiResponse } from 'next'
import { SiteConfig } from '@/config/site'

function generateRobotsTxt(): string {
  const baseUrl = SiteConfig.siteUrl

  return `# robots.txt for ${SiteConfig.title}
# See https://www.robotstxt.org/robotstxt.html for documentation

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay (in seconds) - optional
# Crawl-delay: 1
`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsTxt = generateRobotsTxt()

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate'
  )

  return res.status(200).send(robotsTxt)
}
