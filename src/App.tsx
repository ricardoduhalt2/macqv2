import './App.css'; // Re-enable App.css for the new styles
import { ConnectButton } from 'thirdweb/react';
import { polygon } from 'thirdweb/chains';
import { client } from './main'; // Import the initialized client
import DropCard from './components/DropCard';
import { allNftsData } from './types'; // Import the actual NFT data
import Chatbot from './components/Chatbot'; // Import the Chatbot component

function App() {
  return (
    // Use the new .app-container for overall layout and background
    <div className="app-container">
      <header className="header w-full max-w-7xl flex flex-col items-center py-6 mb-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center min-w-0 overflow-hidden">
          <img
            src="https://petgascoin.com/wp-content/uploads/2025/05/Unlockable-Content-Agency.png"
            alt="UCA Logo"
            className="app-logo w-8 h-auto mt-12 mb-2"
          />
          <h1 className="text-6xl">NFT Boutique</h1>
          <h2 className="text-5xl mt-1">Marketplace Mobile</h2>
          <div className="marquee-container mt-4">
            <h1 className="text-2xl marquee-text">
              Arte Eterno Collection - Exhibiting at the Museum of Contemporary Art, Quintana Roo (MACQ)&nbsp;&nbsp;&nbsp;&nbsp;Arte Eterno Collection - Exhibiting at the Museum of Contemporary Art, Quintana Roo (MACQ)
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <ConnectButton
            client={client}
            chain={polygon}
            theme="dark"
            connectModal={{ size: "compact" }}
          />
        </div>
      </header>

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8"> {/* Reverted: max-w-7xl restored, grid classes on inner div */}
        {/* Apply .card-base to each DropCard for the new card styling and animations */}
        {/* Reverted to simplified 3-column layout for desktop stability */}
        <div className="grid grid-cols-3 gap-16"> {/* Increased gap from gap-12 to gap-16 */}
          {allNftsData.map((nft) => (
            <div key={nft.id} className="card-base"> {/* Wrap DropCard in a div with .card-base */}
              <DropCard nft={nft} client={client} />
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full max-w-7xl text-center py-10 mt-auto px-4 sm:px-6 lg:px-8">
        <p className="read-the-docs"> {/* Use .read-the-docs for footer styling */}
          Arte Eterno - Museo de Arte Contemporáneo
        </p>
      </footer>
      <Chatbot />
    </div>
  );
}

export default App;
