import { Navigation } from './navigation';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider, fallback, http } from 'wagmi';
import { polygonAmoy, sepolia, monadTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';

const rpc = (envUrl: string | undefined, publicUrls: string[]) =>
  fallback([...(envUrl ? [envUrl] : []), ...publicUrls].map((url) => http(url)));

const config = getDefaultConfig({
  appName: 'Document Verifier',
  chains: [sepolia, polygonAmoy, monadTestnet],
  projectId: import.meta.env.VITE_PROJECT_ID,
  ssr: false, // If your dApp uses server side rendering (SSR)
  transports: {
    [sepolia.id]: rpc(import.meta.env.VITE_SEPOLIA_RPC_URL, [
      'https://ethereum-sepolia-rpc.publicnode.com',
      'https://sepolia.gateway.tenderly.co',
    ]),
    // viem's default (rpc-amoy.polygon.technology) no longer resolves in DNS.
    [polygonAmoy.id]: rpc(import.meta.env.VITE_POLYGON_AMOY_RPC_URL, [
      'https://polygon-amoy-bor-rpc.publicnode.com',
      'https://polygon-amoy.gateway.tenderly.co',
    ]),
    [monadTestnet.id]: rpc(import.meta.env.VITE_MONAD_TESTNET_RPC_URL, monadTestnet.rpcUrls.default.http as unknown as string[]),
  },
});

const queryClient = new QueryClient();

const rainbowTheme = lightTheme({
  accentColor: '#2f44c9',
  accentColorForeground: '#ffffff',
  borderRadius: 'small',
  fontStack: 'system',
});
rainbowTheme.fonts.body = "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif";
rainbowTheme.shadows.connectButton = 'none';

function App() {

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={rainbowTheme}>
            <BrowserRouter>
              <Navigation />
            </BrowserRouter>
            <ToastContainer position="bottom-right" newestOnTop />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
