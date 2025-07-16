import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/utils';
import { SEOTestPage } from '@/components/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'SEO Test Environment - Kriptaz Airdrop',
  description: 'Comprehensive SEO testing environment for Kriptaz airdrop campaign. Test meta tags, Open Graph, Twitter Cards, structured data, and social sharing functionality for optimal performance.',
  keywords: [
    'seo testing',
    'meta tags test',
    'open graph test',
    'twitter cards test',
    'kriptaz seo',
  ],
  ogType: 'website',
  twitterCard: 'summary_large_image',
  ogImage: 'http://localhost:3000/images/og-image.png',
  noindex: true, // Test pages should not be indexed
}, '/seo-test');

export default function SEOTestPageRoute() {
  return <SEOTestPage />;
}
