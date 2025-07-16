import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/utils';
import { pageSEOConfigs } from '@/config/site';

export const metadata: Metadata = generatePageMetadata({
  title: pageSEOConfigs.home.title,
  description: pageSEOConfigs.home.description,
  keywords: pageSEOConfigs.home.keywords,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  ogImage: 'http://localhost:3000/images/og-image.png',
}, '/');

export default function Home() {
  return (
    <div className="h-full bg-black text-white">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            Welcome to Kriptaz Airdrop
          </h1>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              Join the future of blockchain technology with Kriptaz.
              Connect your wallet and participate in our exclusive airdrop campaign.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Airdrop Details</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Total Supply: 1,000,000 KA Tokens
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Airdrop Allocation: 100,000 KA Tokens
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Eligibility: Early supporters and community members
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Distribution: Q1 2024
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">How to Participate</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Connect your wallet
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Check your eligibility
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Claim your tokens
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Join our community
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Connect Wallet & Start
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Connect your wallet to check eligibility and claim your tokens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
