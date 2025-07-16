'use client';

import React, { useState } from 'react';

export function ConnectButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnected) {
      // Disconnect logic
      setIsConnected(false);
      return;
    }

    setIsConnecting(true);
    
    // Simulate wallet connection
    try {
      // Here you would implement actual wallet connection logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`
        px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-200 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center whitespace-nowrap cursor-pointer
        ${isConnected
          ? 'text-green-400 hover:text-black hover:bg-white'
          : 'text-gray-300 hover:text-black hover:bg-white'
        }
        ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isConnecting ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Connecting...</span>
        </div>
      ) : isConnected ? (
        'Disconnect'
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
}
