/**
 * Web3 Configuration
 * Wagmi and Reown AppKit setup
 */

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient } from '@tanstack/react-query'
import { cookieStorage, createStorage } from 'wagmi'
import { REOWN_CONFIG, NETWORK_CONFIG, validateWeb3Config } from '@/shared/constants/web3'
import { defineChain } from 'viem'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Validate configuration on import
validateWeb3Config()

// Suppress Reown config warnings in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (typeof message === 'string' &&
        (message.includes('Reown Config') ||
         message.includes('Failed to fetch remote project configuration') ||
         message.includes('Your local configuration for'))) {
      return; // Suppress Reown config warnings
    }
    originalWarn.apply(console, args);
  };
}

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
      webSocket: ['wss://testnet-rpc.monad.xyz'],
    },
    public: {
      http: ['https://testnet-rpc.monad.xyz'],
      webSocket: ['wss://testnet-rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com',
      apiUrl: 'https://testnet.monadexplorer.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
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
  icons: [REOWN_CONFIG.APP_ICON],
  verifyUrl: REOWN_CONFIG.APP_URL,
  redirect: {
    native: 'airdrop-kriptaz://',
    universal: REOWN_CONFIG.APP_URL
  }
}

// Create the modal with error handling
let modal: unknown;

try {
  modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId: REOWN_CONFIG.PROJECT_ID,
    networks,
    defaultNetwork: monadTestnet,
    metadata,
    // Features are now managed via dashboard.reown.com
    themeMode: 'dark',
    enableWalletConnect: true,
    enableInjected: true,
    enableEIP6963: true,
    enableCoinbase: true
  });
} catch (error) {
  console.warn('AppKit initialization warning:', error);
  // Fallback initialization
  modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId: REOWN_CONFIG.PROJECT_ID,
    networks,
    defaultNetwork: monadTestnet,
    metadata: {
      name: REOWN_CONFIG.APP_NAME,
      description: REOWN_CONFIG.APP_DESCRIPTION,
      url: REOWN_CONFIG.APP_URL,
      icons: [REOWN_CONFIG.APP_ICON]
    },
    themeMode: 'dark'
  });
}

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
