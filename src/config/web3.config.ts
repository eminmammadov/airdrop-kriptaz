/**
 * Web3 Configuration
 * Wagmi and Reown AppKit setup
 */

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient } from '@tanstack/react-query'
import { cookieStorage, createStorage } from 'wagmi'
import { REOWN_CONFIG, NETWORK_CONFIG, FEATURE_FLAGS, validateWeb3Config } from '@/constants/web3'
import { defineChain } from 'viem'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Validate configuration on import
validateWeb3Config()

// Define Monad Testnet for Wagmi
const monadTestnetChain = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'Testnet Monad',
    symbol: 'tMON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com',
    },
  },
  testnet: true,
})

// Define Monad Testnet for AppKit
const monadTestnet: AppKitNetwork = {
  id: 10143,
  caipNetworkId: 'eip155:10143',
  chainNamespace: 'eip155',
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'Testnet Monad',
    symbol: 'tMON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com',
    },
  },
  testnet: true,
}

// Define networks - Only Monad Testnet for now
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [monadTestnet]

// Set up the Wagmi Adapter (Config)
const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  networks: [monadTestnetChain],
  projectId: REOWN_CONFIG.PROJECT_ID
})

// Set up metadata
const metadata = {
  name: REOWN_CONFIG.APP_NAME,
  description: REOWN_CONFIG.APP_DESCRIPTION,
  url: REOWN_CONFIG.APP_URL,
  icons: [REOWN_CONFIG.APP_ICON]
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: REOWN_CONFIG.PROJECT_ID,
  networks,
  defaultNetwork: monadTestnet,
  metadata,
  features: {
    analytics: FEATURE_FLAGS.ANALYTICS,
    email: false, // Disable email login
    socials: [], // Disable all social logins
    emailShowWallets: false, // Don't show wallets in email flow
    onramp: false // Disable onramp for testnet
  },
  themeMode: 'dark'
  // Note: 403 error is expected and doesn't affect functionality
})

// Create a new QueryClient instance
export const queryClient = new QueryClient()

// Export the wagmiAdapter config
export const config = wagmiAdapter.wagmiConfig

// Export the modal for programmatic control
export { modal }

// Export network utilities
export const getNetworkById = (chainId: number) => {
  return networks.find(network => network.id === chainId)
}

export const getSupportedNetworks = () => {
  return networks.filter(network => 
    NETWORK_CONFIG.SUPPORTED_NETWORKS.includes(network.name.toLowerCase())
  )
}

export const getDefaultNetwork = () => {
  return networks.find(network =>
    network.name.toLowerCase() === NETWORK_CONFIG.DEFAULT_NETWORK
  ) || monadTestnet
}
