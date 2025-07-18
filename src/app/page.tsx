import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/utils';
import { pageSEOConfigs } from '@/config/site';
import { UserStats } from '@/components/features';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* User Stats Component */}
      <div className="w-full px-4">
        <UserStats />
      </div>
    </div>
  );
}
