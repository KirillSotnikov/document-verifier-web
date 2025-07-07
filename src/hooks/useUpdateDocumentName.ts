import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DocumentVerifier__factory } from '../contracts/factories/DocumentVerifier__factory';
import { useAccount } from 'wagmi';
import { useCurrentNetwork } from './useCurrentNetwork';

export const useUpdateDocumentName = () => {
  const { address, isConnected } = useAccount();
  const { contractAddress, isSupported } = useCurrentNetwork();
  
  const { 
    data: hash, 
    writeContract, 
    isPending, 
    error: writeError 
  } = useWriteContract();

  const { 
    isLoading: isConfirming, 
    isSuccess, 
    error: receiptError 
  } = useWaitForTransactionReceipt({ hash });

  const updateDocumentName = async (documentHash: `0x${string}`, newName: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    if (!isSupported) {
      throw new Error('Unsupported network. Please switch to Polygon Amoy or Ethereum Sepolia');
    }

    if (!writeContract) {
      throw new Error('Contract not available');
    }

    writeContract({
      address: contractAddress as `0x${string}`,
      abi: DocumentVerifier__factory.abi,
      functionName: 'updateDocumentName',
      args: [documentHash, newName],
    });
  };

  return {
    updateDocumentName,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error: writeError || receiptError,
    isLoading: isPending || isConfirming,
  };
}; 