import { useReadContract } from 'wagmi';
import { DocumentVerifier__factory } from '../contracts/factories/DocumentVerifier__factory';
import { useAccount } from 'wagmi';
import { useCurrentNetwork } from './useCurrentNetwork';

export const useVerifyDocument = (documentHash?: `0x${string}`) => {
  const { address, isConnected } = useAccount();
  const { contractAddress, isSupported } = useCurrentNetwork();
  
  const { 
    data: document, 
    isLoading, 
    error, 
    refetch 
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: DocumentVerifier__factory.abi,
    functionName: 'verifyDocument',
    args: documentHash ? [documentHash] : undefined,
    query: {
      enabled: !!documentHash && isConnected && isSupported,
    },
  });

  const verifyDocument = async (hash: `0x${string}`) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    if (!isSupported) {
      throw new Error('Unsupported network. Please switch to Polygon Amoy or Ethereum Sepolia');
    }
    
    // This will trigger the read contract call
    return refetch();
  };

  return {
    document,
    verifyDocument,
    isLoading,
    error,
    isConnected: isConnected && isSupported,
    userAddress: address,
    isSupported,
  };
}; 