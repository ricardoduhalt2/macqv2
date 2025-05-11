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
      <header className="header w-full max-w-7xl flex justify-between items-center py-6 mb-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center"> {/* Added flex container for logo and titles */}
          <img 
            src="https://petgascoin.com/wp-content/uploads/2025/05/Captura-de-Pantalla-2022-01-04-a-las-18.09.3-e1746994623535.webp"
            alt="UCA Logo"
            className="app-logo w-16 h-auto mb-2" // Reduced width, margin bottom for logo
          />
          {/* Apply .header h1 styles implicitly via App.css, font-size now from Tailwind class */}
          <h1 className="text-6xl">NFT Boutique</h1> {/* Changed text */}
          <h2 className="text-5xl mt-1">Marketplace</h2> {/* Added Marketplace subtitle, adjusted size & margin */}
          {/* Changed subtitle to h1 to match title style, adjusted margin, increased size */}
          <div className="marquee-container mt-4">
            <h1 className="text-4xl marquee-text">Arte Eterno Collection - Exhibiting at the Museum of Contemporary Art, Quintana Roo (MACQ)</h1> {/* Updated text and size */}
          </div>
        </div>
        <ConnectButton
          client={client}
          chain={polygon}
          theme="dark" // Explicitly set dark theme for ConnectButton for consistency
          connectModal={{ size: "compact" }} // Use compact modal
        />
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
