import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tordar.no',
      lastModified: new Date('2026-03-31'),
      changeFrequency: 'monthly',
      priority: 1,
    }
  ]
} 