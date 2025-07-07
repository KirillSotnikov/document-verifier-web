import { Navigation } from './navigation';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { polygonAmoy, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@rainbow-me/rainbowkit/styles.css';


const config = getDefaultConfig({
  appName: 'Document Verifier',
  chains: [sepolia, polygonAmoy],
  projectId: import.meta.env.VITE_PROJECT_ID,
  ssr: false, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <BrowserRouter>
              <Navigation />
            </BrowserRouter>
            <ToastContainer />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
