/**
 * useWallet Hook
 * Custom hook for wallet connection management
 */

'use client';

import { useAccount, useBalance, useDisconnect, useEnsName } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { formatAddress, formatBalance, getNetworkName } from '@/shared/utils/web3.utils';
import { type UseWalletReturn, type WalletConnectionResult } from '@/shared/types/web3';

export function useWallet(): UseWalletReturn {
  const { open } = useAppKit();
  const { 
    address, 
    isConnected, 
    isConnecting, 
    chainId 
  } = useAccount();
  
  const { disconnect } = useDisconnect();
  
  const { data: balance } = useBalance({
    address: address,
    query: {
      enabled: !!address
    }
  });

  const { data: ensName } = useEnsName({
    address: address,
    query: {
      enabled: !!address
    }
  });

  // Connect wallet function
  const connect = async (): Promise<WalletConnectionResult> => {
    try {
      open({ view: 'Connect' });
      
      // Return a promise that resolves when connection is established
      return new Promise((resolve) => {
        const checkConnection = () => {
          if (isConnected && address) {
            resolve({
              success: true,
              address,
              chainId
            });
          } else {
            setTimeout(checkConnection, 100);
          }
        };
        checkConnection();
      });
    } catch (error) {
      console.error('Wallet connection error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      };
    }
  };

  // Disconnect wallet function
  const disconnectWallet = async (): Promise<void> => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Wallet disconnect error:', error);
    }
  };

  // Switch network function
  const switchNetwork = async (): Promise<void> => {
    try {
      open({ view: 'Networks' });
    } catch (error) {
      console.error('Network switch error:', error);
    }
  };

  // Format address for display
  const formatAddressForDisplay = (addr: string): string => {
    return formatAddress(addr);
  };

  // Format balance for display
  const formatBalanceForDisplay = (bal: string): string => {
    return formatBalance(bal);
  };

  return {
    // State
    isConnected,
    isConnecting,
    address,
    chainId,
    balance: balance?.formatted,
    ensName: ensName || undefined,
    
    // Computed values
    networkName: chainId ? getNetworkName(chainId) : undefined,
    formattedAddress: address ? formatAddressForDisplay(address) : undefined,
    formattedBalance: balance ? formatBalanceForDisplay(balance.formatted) : undefined,
    
    // Actions
    connect,
    disconnect: disconnectWallet,
    switchNetwork,
    
    // Utils
    formatAddress: formatAddressForDisplay,
    formatBalance: formatBalanceForDisplay,
    
    // Modal controls
    openAccountModal: () => open({ view: 'Account' }),
    openConnectModal: () => open({ view: 'Connect' }),
    openNetworkModal: () => open({ view: 'Networks' })
  };
}
