'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoWallet } from 'react-icons/io5';
import { useWallet } from '@/hooks/useWallet';

export function ConnectButton() {
  const {
    isConnected,
    isConnecting,
    formattedAddress,
    formattedBalance,
    openAccountModal,
    openConnectModal
  } = useWallet();

  const [isAnimating, setIsAnimating] = useState(false);

  // Reset animation when wallet connects
  useEffect(() => {
    if (isConnected && isAnimating) {
      setIsAnimating(false);
    }
  }, [isConnected, isAnimating]);

  const handleConnect = async () => {
    if (isConnected) {
      // Show account modal for connected users
      openAccountModal();
    } else {
      // Start animation and show connect modal
      setIsAnimating(true);

      // Small delay to show animation before opening modal
      setTimeout(() => {
        openConnectModal();
      }, 1000);
    }
  };

  const showAnimation = isConnecting || isAnimating;

  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-md p-0.2 border border-gray-700/50">
      <button
        onClick={handleConnect}
        disabled={showAnimation}
        className={`
          relative overflow-hidden rounded-md font-medium text-sm transition-all duration-200 flex items-center justify-center cursor-pointer w-full
          ${isConnected
            ? 'text-black'
            : 'text-gray-300'
          }
          ${showAnimation ? 'cursor-not-allowed' : ''}
          disabled:cursor-not-allowed
        `}
        style={{ minWidth: isConnected ? '180px' : '136px', height: '36px' }}
      >
        {/* Yellow expanding background - hide when connected */}
        {!isConnected && (
          <div
            className={`
              absolute left-1 top-1 bottom-1 transition-all duration-1000 ease-out rounded-sm shadow-lg
              ${isAnimating ? 'right-1' : 'w-8'}
            `}
            style={{
              background: isAnimating
                ? 'linear-gradient(90deg, #FFE600, #C0F003, #FFE600)'
                : 'linear-gradient(90deg, #FFE600, #C0F003)'
            }}
          />
        )}

        {/* Icon hover background */}
        <div className="absolute left-1 top-1 bottom-1 w-8 rounded-sm bg-white opacity-0 hover:opacity-100 transition-opacity duration-200" />

        {/* Icon section */}
        <div className={`
          relative z-20 flex items-center justify-center w-8 h-full transition-opacity duration-200
          ${isAnimating ? 'opacity-0' : 'opacity-100'}
        `}>
          {isConnected ? (
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center shadow-sm p-1">
              <Image
                src="/images/mon.svg"
                alt="MON Logo"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>
          ) : (
            <IoWallet className="w-4 h-4 text-black" />
          )}
        </div>

        {/* Loading animation - centered */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Text section */}
        <div
          className={`
            relative z-10 flex-1 px-3 transition-all duration-200
            ${isAnimating ? 'opacity-0' : 'opacity-100'}
          `}
        >
          {isConnected ? (
            <div className="flex flex-col items-start justify-center h-full text-left">
              <div className="text-white text-sm font-medium">
                {formattedBalance || '0.0000'} tMON
              </div>
              <div className="text-gray-400 text-xs font-mono">
                {formattedAddress}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span>Connect</span>
            </div>
          )}
        </div>

        {/* Chevron down icon - only when connected */}
        {isConnected && (
          <div className="relative z-10 flex items-center justify-center w-6 h-full pr-2">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}
