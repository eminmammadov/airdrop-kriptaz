/**
 * Web3 Type Definitions
 * Centralized type definitions for Web3 integration
 */

// Wallet Connection State
export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  address?: string;
  chainId?: number;
  balance?: string;
  ensName?: string;
}

// Wallet Connection Result
export interface WalletConnectionResult {
  success: boolean;
  address?: string;
  chainId?: number;
  error?: string;
}

// Network Information
export interface NetworkInfo {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  isTestnet: boolean;
}

// User Profile Data
export interface UserProfile {
  address: string;
  ensName?: string;
  avatar?: string;
  balance: {
    eth: string;
    ka: string;
    formatted: {
      eth: string;
      ka: string;
    };
  };
  network: NetworkInfo;
  connectedAt: Date;
  lastActivity: Date;
}

// Transaction Data
export interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  timestamp: Date;
  status: 'pending' | 'success' | 'failed';
  type: 'send' | 'receive' | 'contract';
}

// Wallet Provider Types
export type WalletProvider = 'metamask' | 'walletconnect' | 'coinbase' | 'injected';

// AppKit Modal Views
export type ModalView = 
  | 'Connect' 
  | 'Account' 
  | 'Networks' 
  | 'WhatIsAWallet' 
  | 'OnRampProviders';

// Web3 Error Types
export enum Web3ErrorType {
  USER_REJECTED = 'USER_REJECTED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  CONTRACT_ERROR = 'CONTRACT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface Web3Error {
  type: Web3ErrorType;
  message: string;
  code?: number;
  data?: unknown;
}

// Hook Return Types
export interface UseWalletReturn {
  // State
  isConnected: boolean;
  isConnecting: boolean;
  address?: string;
  chainId?: number;
  balance?: string;
  ensName?: string;

  // Computed values
  networkName?: string;
  formattedAddress?: string;
  formattedBalance?: string;

  // Actions
  connect: () => Promise<WalletConnectionResult>;
  disconnect: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;

  // Utils
  formatAddress: (address: string) => string;
  formatBalance: (balance: string) => string;

  // Modal controls
  openAccountModal: () => void;
  openConnectModal: () => void;
  openNetworkModal: () => void;
}

export interface UseProfileReturn {
  profile?: UserProfile;
  isLoading: boolean;
  error?: Web3Error;
  refetch: () => Promise<void>;
}
