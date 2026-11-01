import { useChainId } from 'wagmi';
import { getContractAddress, getNetwork } from './config';

export const useCurrentNetwork = () => {
  const chainId = useChainId();

  const currentNetwork = getNetwork(chainId);

  const contractAddress = currentNetwork ? getContractAddress(currentNetwork) : null;

  return {
    currentNetwork,
    contractAddress,
    chainId,
    isSupported: !!currentNetwork,
  };
};
