/**
 * Web3 Utilities
 * Helper functions for Web3 operations
 */

import { formatEther, parseEther, isAddress } from 'viem'
import { type Address } from 'viem'

/**
 * Format wallet address for display
 */
export const formatAddress = (address: string, chars = 4): string => {
  if (!address || !isAddress(address)) return ''
  
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Format balance for display
 */
export const formatBalance = (balance: string | bigint, decimals = 4): string => {
  try {
    const formatted = typeof balance === 'string' 
      ? parseFloat(balance) 
      : parseFloat(formatEther(balance))
    
    if (formatted === 0) return '0'
    if (formatted < 0.0001) return '< 0.0001'
    
    return formatted.toFixed(decimals)
  } catch (error) {
    console.error('Error formatting balance:', error)
    return '0'
  }
}

/**
 * Format balance with currency symbol
 */
export const formatBalanceWithSymbol = (
  balance: string | bigint, 
  symbol = 'ETH', 
  decimals = 4
): string => {
  const formatted = formatBalance(balance, decimals)
  return `${formatted} ${symbol}`
}

/**
 * Convert ETH to Wei
 */
export const ethToWei = (eth: string): bigint => {
  try {
    return parseEther(eth)
  } catch (error) {
    console.error('Error converting ETH to Wei:', error)
    return BigInt(0)
  }
}

/**
 * Convert Wei to ETH
 */
export const weiToEth = (wei: bigint): string => {
  try {
    return formatEther(wei)
  } catch (error) {
    console.error('Error converting Wei to ETH:', error)
    return '0'
  }
}

/**
 * Validate Ethereum address
 */
export const isValidAddress = (address: string): address is Address => {
  return isAddress(address)
}

/**
 * Get network name by chain ID
 */
export const getNetworkName = (chainId: number): string => {
  const networks: Record<number, string> = {
    10143: 'Monad Testnet',
    1: 'Ethereum',
    42161: 'Arbitrum',
    137: 'Polygon',
    8453: 'Base',
    10: 'Optimism',
    11155111: 'Sepolia',
    80001: 'Mumbai'
  }

  return networks[chainId] || `Chain ${chainId}`
}

import { generateExplorerUrl, EXPLORER_LINKS } from '@/config/links';

/**
 * Get network explorer URL
 */
export const getExplorerUrl = (chainId: number): string => {
  const explorers: Record<number, string> = {
    10143: EXPLORER_LINKS.monadTestnet,
    1: EXPLORER_LINKS.ethereum,
    42161: EXPLORER_LINKS.arbitrum,
    137: EXPLORER_LINKS.polygon,
    8453: EXPLORER_LINKS.base,
    10: EXPLORER_LINKS.optimism,
    11155111: EXPLORER_LINKS.sepolia,
    80001: EXPLORER_LINKS.mumbai
  }

  return explorers[chainId] || EXPLORER_LINKS.ethereum
}

/**
 * Get transaction URL
 */
export const getTransactionUrl = (chainId: number, txHash: string): string => {
  return generateExplorerUrl(chainId, 'tx', txHash)
}

/**
 * Get address URL
 */
export const getAddressUrl = (chainId: number, address: string): string => {
  return generateExplorerUrl(chainId, 'address', address)
}

/**
 * Check if network is testnet
 */
export const isTestnet = (chainId: number): boolean => {
  const testnets = [10143, 11155111, 80001, 421614, 84532] // Monad Testnet, Sepolia, Mumbai, Arbitrum Sepolia, Base Sepolia
  return testnets.includes(chainId)
}

/**
 * Get network color for UI
 */
export const getNetworkColor = (chainId: number): string => {
  const colors: Record<number, string> = {
    10143: '#00D2FF', // Monad cyan
    1: '#627EEA', // Ethereum blue
    42161: '#28A0F0', // Arbitrum blue
    137: '#8247E5', // Polygon purple
    8453: '#0052FF', // Base blue
    10: '#FF0420' // Optimism red
  }

  return colors[chainId] || '#6B7280' // Default gray
}

/**
 * Truncate transaction hash
 */
export const formatTxHash = (hash: string, chars = 6): string => {
  if (!hash) return ''
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`
}

/**
 * Format gas price in Gwei
 */
export const formatGasPrice = (gasPrice: bigint): string => {
  const gwei = Number(gasPrice) / 1e9
  return `${gwei.toFixed(2)} Gwei`
}
