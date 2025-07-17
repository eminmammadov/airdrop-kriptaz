'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PriceData {
  price: number;
  change24h?: number;
  volume24h?: number;
  source: string;
  cached?: boolean;
}

export function KaPrice() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch price data function
  const fetchPrice = async () => {
    try {
      setError(null);
      const response = await fetch('/api/v1/price');
      const data = await response.json();

      if (data.success) {
        setPriceData(data.data);
        setIsLoading(false);
      } else {
        setError('Price unavailable');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Connection error');
      setIsLoading(false);
      console.error('KA Price fetch error:', err);
    }
  };

  // Initial load and update every 20 seconds
  useEffect(() => {
    fetchPrice(); // Initial load

    const interval = setInterval(() => {
      fetchPrice();
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 0.000001) {
      return `$${price.toFixed(8)}`;
    } else if (price < 0.0001) {
      return `$${price.toFixed(7)}`;
    } else if (price < 0.001) {
      return `$${price.toFixed(6)}`;
    } else if (price < 0.01) {
      return `$${price.toFixed(5)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(2)}`;
    }
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <div className="w-6 h-6 rounded-full bg-gray-600 animate-pulse"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-red-400">
        <div className="w-6 h-6 rounded-full bg-red-600"></div>
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  if (!priceData) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-1 border border-gray-700">
      {/* KA Token Logo */}
      <div className="relative w-5 h-5">
        <Image
          src="/images/ka.png"
          alt="KA Token"
          width={20}
          height={20}
          className="rounded-full"
          onError={(e) => {
            // Fallback to a simple colored circle if image fails
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          KA
        </div>
      </div>

      {/* Price */}
      <span className="text-white font-medium text-sm">
        {formatPrice(priceData.price)}
      </span>

      {/* 24h Change */}
      {priceData.change24h !== undefined && (
        <span className={`text-xs font-medium ${
          priceData.change24h >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {formatChange(priceData.change24h)}
        </span>
      )}

      {/* Live indicator */}
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  );
}
