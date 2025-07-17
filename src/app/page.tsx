import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/utils';
import { pageSEOConfigs } from '@/config/site';

export const metadata: Metadata = generatePageMetadata({
  title: pageSEOConfigs.home.title,
  description: pageSEOConfigs.home.description,
  keywords: pageSEOConfigs.home.keywords,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  ogImage: 'https://airdrop-kriptaz.vercel.app//images/og-image.png',
}, '/');

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Kriptaz
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Blockchain innovation starts here
        </p>
      </div>
    </div>
  );
}
