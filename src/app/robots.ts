import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/schools/', '/about', '/terms', '/privacy'],
      disallow: ['/recruit/', '/admin/', '/api/', '/login', '/register'],
    },
    sitemap: 'https://college-info-nine.vercel.app/sitemap.xml',
  }
}
