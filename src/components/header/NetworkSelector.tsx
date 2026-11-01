import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { useChainId, useSwitchChain } from 'wagmi';
import { getNetwork, NETWORKS } from '../../hooks/config';
import { CheckIcon, ChevronDownIcon } from '../ui/icons';

type NetworkKey = keyof typeof NETWORKS;

const networkDot: Record<NetworkKey, string> = {
  ETHEREUM_SEPOLIA: '#627EEA',
  POLYGON_AMOY: '#8247E5',
  MONAD_TESTNET: '#6E54FF',
};

const Dot: FC<{ color: string }> = ({ color }) => (
  <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
    <span className="absolute inset-0 rounded-full" style={{ backgroundColor: color }} />
    <span className="absolute -inset-[3px] rounded-full opacity-20" style={{ backgroundColor: color }} />
  </span>
);

export const NetworkSelector: FC<{ fullWidth?: boolean }> = ({ fullWidth }) => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentNetwork = getNetwork(chainId);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleNetworkSwitch = (networkKey: NetworkKey) => {
    const targetChainId = NETWORKS[networkKey].chainId;
    if (switchChain) {
      switchChain({ chainId: targetChainId });
    }
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative ${fullWidth ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex h-10 items-center gap-2.5 rounded-md border px-3 text-sm font-medium transition-colors ${
          fullWidth ? 'w-full' : ''
        } ${
          currentNetwork
            ? 'border-rule bg-sheet text-ink hover:border-ink-faint'
            : 'border-caution/40 bg-caution-wash text-caution hover:border-caution'
        }`}
      >
        {currentNetwork ? <Dot color={networkDot[currentNetwork]} /> : <Dot color="#C58A00" />}
        <span className="truncate">{currentNetwork ? NETWORKS[currentNetwork].name : 'Unsupported network'}</span>
        <ChevronDownIcon className={`ml-auto size-4 text-ink-faint transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select network"
          className={`absolute z-50 mt-2 overflow-hidden rounded-md border border-rule bg-sheet py-1 shadow-[0_12px_32px_-12px_rgba(27,34,56,0.35)] ${
            fullWidth ? 'inset-x-0' : 'right-0 w-56'
          }`}
        >
          {(Object.keys(NETWORKS) as NetworkKey[]).map((key) => {
            const isCurrent = key === currentNetwork;
            return (
              <li key={key} role="option" aria-selected={isCurrent}>
                <button
                  type="button"
                  onClick={() => handleNetworkSwitch(key)}
                  className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors ${
                    isCurrent ? 'bg-paper font-medium text-ink' : 'text-ink-soft hover:bg-paper hover:text-ink'
                  }`}
                >
                  <Dot color={networkDot[key]} />
                  <span>{NETWORKS[key].name}</span>
                  {isCurrent && <CheckIcon className="ml-auto size-4 text-verified" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
