import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DocumentVerifier__factory } from '../contracts/factories/DocumentVerifier__factory';
import { useAccount } from 'wagmi';
import { useCurrentNetwork } from './useCurrentNetwork';

export const useDocumentVerifier = () => {
  const { address, isConnected } = useAccount();
  const { contractAddress, isSupported } = useCurrentNetwork();
  
  const { data: contract, isLoading, error } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: DocumentVerifier__factory.abi,
    query: {
      enabled: !!contractAddress && isSupported,
    },
  });

  return {
    contract,
    isLoading,
    error,
    isConnected: !!contract && isConnected && isSupported,
    userAddress: address,
    isSupported,
  };
}; 