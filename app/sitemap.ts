import type { MetadataRoute } from 'next'
import { config } from '@/lib/portfolio-config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.meta.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
