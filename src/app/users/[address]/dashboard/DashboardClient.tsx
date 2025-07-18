'use client';

import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import {
  FaWallet,
  FaCoins,
  FaChartLine,
  FaGift,
  FaClock,
  FaCircleCheck
} from 'react-icons/fa6';

interface DashboardClientProps {
  address: string;
}

export function DashboardClient({ address }: DashboardClientProps) {
  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();

  // Security check: ensure user can only access their own dashboard
  useEffect(() => {
    if (!isConnected) {
      router.push('/?auth=required');
      return;
    }

    if (connectedAddress?.toLowerCase() !== address.toLowerCase()) {
      router.push(`/users/${connectedAddress}/dashboard`);
      return;
    }
  }, [isConnected, connectedAddress, address, router]);

  // Show loading while checking authentication
  if (!isConnected || connectedAddress?.toLowerCase() !== address.toLowerCase()) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Verifying access...</p>
        </div>
      </div>
    );
  }

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-black to-ui-bg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-yellow to-accent-yellow-green rounded-full flex items-center justify-center">
              <FaWallet className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 font-mono">{shortAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* KA Token Balance */}
          <div className="bg-bg border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-desert-sand rounded-lg flex items-center justify-center">
                <FaCoins className="w-5 h-5 text-forest-black" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">KA Balance</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">0.00</div>
            <div className="text-sm text-gray-400">≈ $0.00 USD</div>
          </div>

          {/* Staking Rewards */}
          <div className="bg-bg border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-brand-green rounded-lg flex items-center justify-center">
                <FaChartLine className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Staking</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">0.00</div>
            <div className="text-sm text-gray-400">Total Rewards</div>
          </div>

          {/* Airdrop Status */}
          <div className="bg-bg border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-accent-cyan rounded-lg flex items-center justify-center">
                <FaGift className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Airdrop</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">Eligible</div>
            <div className="text-sm text-brand-green flex items-center">
              <FaCircleCheck className="w-3 h-3 mr-1" />
              Active
            </div>
          </div>

          {/* Next Claim */}
          <div className="bg-ui-bg border border-gray-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-accent-orange rounded-lg flex items-center justify-center">
                <FaClock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Next Claim</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">24h</div>
            <div className="text-sm text-gray-400">Remaining</div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-ui-bg border border-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                    <FaGift className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Airdrop Claim</div>
                    <div className="text-gray-400 text-sm">2 hours ago</div>
                  </div>
                </div>
                <div className="text-brand-green font-medium">+100 KA</div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-cyan rounded-full flex items-center justify-center">
                    <FaChartLine className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Staking Reward</div>
                    <div className="text-gray-400 text-sm">1 day ago</div>
                  </div>
                </div>
                <div className="text-brand-green font-medium">+25 KA</div>
              </div>
              
              <div className="text-center py-4">
                <button className="text-accent-cyan hover:text-white transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-ui-bg border border-gray-700/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-accent-yellow to-accent-yellow-green text-black font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity">
                Claim Airdrop
              </button>
              
              <button className="w-full bg-brand-green text-white font-medium py-3 px-4 rounded-lg hover:bg-brand-middle-green transition-colors">
                Start Staking
              </button>
              
              <button className="w-full bg-ui-border text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                View Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
