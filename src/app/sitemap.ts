import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Generate XML Sitemap
 * Automatically generates sitemap for all pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fonts-test`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dynamic pages can be added here
  // Example: blog posts, product pages, etc.
  const dynamicPages: MetadataRoute.Sitemap = [];

  return [...staticPages, ...dynamicPages];
}
