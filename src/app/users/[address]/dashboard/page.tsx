import { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';

interface DashboardPageProps {
  params: Promise<{
    address: string;
  }>;
}

/**
 * Generate metadata for user dashboard
 */
export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  const { address } = await params;
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return {
    title: `Dashboard - ${shortAddress} | Kriptaz Airdrop`,
    description: `Personal dashboard for wallet ${shortAddress}. View your KA token balance, staking rewards, and airdrop status.`,
    robots: {
      index: false, // Don't index user-specific pages
      follow: false,
    },
  };
}

/**
 * User Dashboard Page
 * Dynamic route: /users/[address]/dashboard
 */
export default async function DashboardPage({ params }: DashboardPageProps) {
  const { address } = await params;

  return <DashboardClient address={address} />;
}
