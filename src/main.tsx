import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThirdwebProvider } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
// import { polygon } from 'thirdweb/chains'; // We'll use polygon where needed, e.g. ConnectButton or specific components

import './index.css';

// Initialize the Thirdweb client
// TODO: Replace "YOUR_CLIENT_ID" with your actual client ID from thirdweb.com/dashboard for production
// For local development, you can often proceed without it or use a placeholder if the SDK allows.
// If you don't have one, some features might be rate-limited or use public RPCs.
// Using the provided Client ID.
export const client = createThirdwebClient({
  clientId: "a37f843ccef648163abc82ab025e7cf7", 
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </StrictMode>,
);
