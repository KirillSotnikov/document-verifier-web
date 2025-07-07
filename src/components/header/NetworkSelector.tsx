import { FC, useState } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { NETWORKS } from '../../hooks/config';

export const NetworkSelector: FC = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);

  const currentNetwork = chainId === NETWORKS.POLYGON_AMOY.chainId 
    ? 'POLYGON_AMOY' 
    : chainId === NETWORKS.ETHEREUM_SEPOLIA.chainId 
    ? 'ETHEREUM_SEPOLIA' 
    : null;

  const handleNetworkSwitch = (networkKey: keyof typeof NETWORKS) => {
    const targetChainId = NETWORKS[networkKey].chainId;
    if (switchChain) {
      switchChain({ chainId: targetChainId });
    }
    setIsOpen(false);
  };

  const getNetworkIcon = (networkKey: keyof typeof NETWORKS) => {
    switch (networkKey) {
      case 'POLYGON_AMOY':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
            <path d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
          </svg>
        );
      case 'ETHEREUM_SEPOLIA':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
            <path d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getNetworkColor = (networkKey: keyof typeof NETWORKS) => {
    switch (networkKey) {
      case 'POLYGON_AMOY':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'ETHEREUM_SEPOLIA':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!currentNetwork) {
    return (
      <div className="relative flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Select Network</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {Object.entries(NETWORKS).map(([key, network]) => (
              <button
                key={key}
                onClick={() => handleNetworkSwitch(key as keyof typeof NETWORKS)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                {getNetworkIcon(key as keyof typeof NETWORKS)}
                <span>{network.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex justify-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${getNetworkColor(currentNetwork)}`}
      >
        {getNetworkIcon(currentNetwork)}
        <span>{NETWORKS[currentNetwork].name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {Object.entries(NETWORKS).map(([key, network]) => (
            <button
              key={key}
              onClick={() => handleNetworkSwitch(key as keyof typeof NETWORKS)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                key === currentNetwork
                  ? 'bg-gray-50 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {getNetworkIcon(key as keyof typeof NETWORKS)}
              <span>{network.name}</span>
              {key === currentNetwork && (
                <svg className="w-4 h-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 