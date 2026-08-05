import type { MetadataRoute } from 'next'
import { config } from '@/lib/portfolio-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${config.meta.siteUrl}/sitemap.xml`,
  }
}
