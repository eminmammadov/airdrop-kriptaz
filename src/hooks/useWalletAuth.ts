'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { UserApiService } from '@/infrastructure/api/user-api.service';

/**
 * Custom hook for wallet authentication and navigation
 */
export const useWalletAuth = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const router = useRouter();

  // Update cookies and handle user connection/disconnection
  useEffect(() => {
    if (isConnected && address) {
      // Set wallet connection cookies
      Cookies.set('wallet-connected', 'true', { expires: 7 }); // 7 days
      Cookies.set('wallet-address', address, { expires: 7 });

      // Handle user login in database
      handleUserConnection(address);
    } else {
      // Get previous address before clearing cookies
      const previousAddress = Cookies.get('wallet-address');

      // Remove wallet connection cookies
      Cookies.remove('wallet-connected');
      Cookies.remove('wallet-address');

      // Handle user disconnect in database if there was a previous connection
      if (previousAddress) {
        handleUserDisconnection(previousAddress);
      }
    }
  }, [isConnected, address]);

  // Handle user login/registration in database
  const handleUserConnection = async (walletAddress: string) => {
    try {
      const result = await UserApiService.handleUserLogin(walletAddress);

      if (!result.success) {
        console.error('Failed to handle user login:', result.error);
      }
    } catch (error) {
      console.error('User login error:', error);
    }
  };

  // Handle user disconnection in database
  const handleUserDisconnection = async (walletAddress: string) => {
    try {
      const result = await UserApiService.handleUserDisconnect(walletAddress);

      if (!result.success) {
        console.error('Failed to handle user disconnect:', result.error);
      }
    } catch (error) {
      console.error('User disconnect error:', error);
    }
  };

  // Navigate to dashboard after connection
  const navigateToDashboard = () => {
    if (isConnected && address) {
      router.push(`/users/${address}/dashboard`);
    }
  };

  // Navigate to home if disconnected
  const navigateToHome = () => {
    router.push('/');
  };

  // Check if user can access dashboard
  const canAccessDashboard = isConnected && address;

  return {
    address,
    isConnected,
    isConnecting,
    canAccessDashboard,
    navigateToDashboard,
    navigateToHome,
  };
};
