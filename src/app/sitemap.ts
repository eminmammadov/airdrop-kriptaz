import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Generate XML Sitemap
 * Automatically generates sitemap for all pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  // Static pages for Kriptaz Airdrop
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    }
  ];

  // Note: User dashboard pages are intentionally excluded from sitemap
  // for privacy and security reasons (user-specific content)

  return staticPages;
}
