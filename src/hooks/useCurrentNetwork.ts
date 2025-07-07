import { useChainId } from 'wagmi';
import { NETWORKS, getContractAddress } from './config';

export const useCurrentNetwork = () => {
  const chainId = useChainId();

  const currentNetwork = chainId === NETWORKS.POLYGON_AMOY.chainId 
    ? 'POLYGON_AMOY' 
    : chainId === NETWORKS.ETHEREUM_SEPOLIA.chainId 
    ? 'ETHEREUM_SEPOLIA' 
    : null;

  const contractAddress = currentNetwork ? getContractAddress(currentNetwork) : null;

  return {
    currentNetwork,
    contractAddress,
    chainId,
    isSupported: !!currentNetwork,
  };
}; 