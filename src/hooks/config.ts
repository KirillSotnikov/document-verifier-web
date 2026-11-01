// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  ETHEREUM_SEPOLIA: {
    DOCUMENT_VERIFIER: '0x67e2b7744aae91c051baa22cb4bb66516e6840b1',
  },
  POLYGON_AMOY: {
    DOCUMENT_VERIFIER: '0xCD665c37419DdcF8b5D1e7E7d419D332Fe1a54b1',
  },
  MONAD_TESTNET: {
    DOCUMENT_VERIFIER: '0x277B9A6ea0c30b1b850e20745815295d7a5B60F0',
  },
} as const;

// Network configuration
export const NETWORKS = {
  ETHEREUM_SEPOLIA: {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    explorer: 'https://sepolia.etherscan.io',
  },
  MONAD_TESTNET: {
    chainId: 10143,
    name: 'Monad Testnet',
    explorer: 'https://testnet.monadscan.com',
  },
  POLYGON_AMOY: {
    chainId: 80002,
    name: 'Polygon Amoy',
    explorer: 'https://amoy.polygonscan.com',
  },
} as const;

export const getNetwork = (chainId: number) => {
  switch (chainId) {
    case (NETWORKS.ETHEREUM_SEPOLIA.chainId):
      return 'ETHEREUM_SEPOLIA'
    case (NETWORKS.MONAD_TESTNET.chainId):
      return 'MONAD_TESTNET'
    case (NETWORKS.POLYGON_AMOY.chainId):
      return 'POLYGON_AMOY'
    default:
      return null;
  }
}

export const getContractAddress = (network: keyof typeof NETWORKS) => {
  return CONTRACT_ADDRESSES[network].DOCUMENT_VERIFIER;
};

export const getExplorerUrl = (network: keyof typeof NETWORKS, address: string) => {
  return `${NETWORKS[network].explorer}/address/${address}`;
};
