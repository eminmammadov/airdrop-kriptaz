'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { redirect } from 'next/navigation';
import { FaWallet, FaCoins, FaChartLine } from 'react-icons/fa6';
import { IoTime, IoSettings } from 'react-icons/io5';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();

  // Client-side redirect if not connected
  React.useEffect(() => {
    if (!isConnected) {
      redirect('/');
    }
  }, [isConnected]);

  if (!isConnected) {
    return null; // Prevent flash of content
  }

  return (
    <div className="h-full bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Manage your KA tokens and staking rewards.</p>
        </div>

        {/* Wallet Info Card */}
        <div className="bg-ui-bg border border-ui-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Connected Wallet</h2>
              <p className="text-gray-400 font-mono text-sm">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
              </p>
            </div>
            <div className="bg-brand-green/20 p-3 rounded-lg">
              <FaWallet className="h-6 w-6 text-brand-green" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* KA Balance */}
          <div className="bg-ui-bg border border-ui-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">KA Balance</p>
                <p className="text-2xl font-bold text-white">0.00</p>
                <p className="text-gray-500 text-xs">≈ $0.00</p>
              </div>
              <div className="bg-desert-sand/20 p-3 rounded-lg">
                <FaCoins className="h-5 w-5 text-desert-sand" />
              </div>
            </div>
          </div>

          {/* Staked Amount */}
          <div className="bg-ui-bg border border-ui-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Staked KA</p>
                <p className="text-2xl font-bold text-white">0.00</p>
                <p className="text-gray-500 text-xs">≈ $0.00</p>
              </div>
              <div className="bg-brand-middle-green/20 p-3 rounded-lg">
                <FaChartLine className="h-5 w-5 text-brand-middle-green" />
              </div>
            </div>
          </div>

          {/* Rewards Earned */}
          <div className="bg-ui-bg border border-ui-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rewards Earned</p>
                <p className="text-2xl font-bold text-white">0.00</p>
                <p className="text-gray-500 text-xs">≈ $0.00</p>
              </div>
              <div className="bg-accent-yellow/20 p-3 rounded-lg">
                <FaCoins className="h-5 w-5 text-accent-yellow" />
              </div>
            </div>
          </div>

          {/* APY */}
          <div className="bg-ui-bg border border-ui-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current APY</p>
                <p className="text-2xl font-bold text-white">12.5%</p>
                <p className="text-gray-500 text-xs">Annual Percentage Yield</p>
              </div>
              <div className="bg-accent-cyan/20 p-3 rounded-lg">
                <FaChartLine className="h-5 w-5 text-accent-cyan" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-ui-bg border border-ui-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-brand-green hover:bg-brand-middle-green text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                Stake KA Tokens
              </button>
              <button className="w-full bg-desert-sand hover:bg-desert-sand/80 text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                Claim Rewards
              </button>
              <button className="w-full bg-ui-border hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                Unstake Tokens
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-ui-bg border border-ui-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <IoTime className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="text-center py-8">
                <p className="text-gray-400">No recent activity</p>
                <p className="text-gray-500 text-sm">Your transactions will appear here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-ui-bg border border-ui-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Settings</h3>
            <IoSettings className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-ui-border hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
              Notification Settings
            </button>
            <button className="bg-ui-border hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
              Security Settings
            </button>
            <button className="bg-ui-border hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
