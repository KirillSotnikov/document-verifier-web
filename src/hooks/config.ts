// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  ETHEREUM_SEPOLIA: {
    DOCUMENT_VERIFIER: '0x67e2b7744aae91c051baa22cb4bb66516e6840b1',
  },
  POLYGON_AMOY: {
    DOCUMENT_VERIFIER: '0xCD665c37419DdcF8b5D1e7E7d419D332Fe1a54b1',
  },
} as const;

// Network configuration
export const NETWORKS = {
  ETHEREUM_SEPOLIA: {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    explorer: 'https://sepolia.etherscan.io',
  },
  POLYGON_AMOY: {
    chainId: 80002,
    name: 'Polygon Amoy',
    explorer: 'https://amoy.polygonscan.com',
  },
} as const;

export const getContractAddress = (network: keyof typeof NETWORKS) => {
  return CONTRACT_ADDRESSES[network].DOCUMENT_VERIFIER;
};

export const getExplorerUrl = (network: keyof typeof NETWORKS, address: string) => {
  return `${NETWORKS[network].explorer}/address/${address}`;
}; 