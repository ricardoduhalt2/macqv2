import * as React from 'react';
import type { NftData } from '../types'; // Error 1: Use type-only import
import { ClaimButton, MediaRenderer } from 'thirdweb/react';
import { type ThirdwebClient } from 'thirdweb'; // Removed getContract
import { polygon } from 'thirdweb/chains'; // Error 3: Import polygon chain
// import { client } from '../main'; // Error 2: We will ensure client is passed via props or context later

interface DropCardProps {
  nft: NftData;
  client: ThirdwebClient; // Pass client as a prop for now
}

const DropCard: React.FC<DropCardProps> = ({ nft, client }) => { // Add client to props
  // Prepare the contract object if needed for other operations, or pass address directly
  // For ClaimButton v5, often contractAddress is sufficient if client/chain are in Provider context
  // However, MediaRenderer also needs the client.
  // const contractForClaimButton = getContract({ // Error 3: Add chain
  //   client: client,
  //   address: nft.editionContractAddress,
  //   chain: polygon,
  // });

  // Placeholder for split recipient - this would ideally be fetched or part of NftData
  const displaySplitRecipient = nft.splitContractAddress; // Simplified for now

  return (
    // Styles like background, shadow, transform are now handled by 'card-base' in App.tsx
    // Keep 'group' for image hover effects and 'overflow-hidden'
    <div className="group overflow-hidden h-full flex flex-col"> {/* Ensure card takes full height of grid cell and content flows correctly */}
      <div className="aspect-square w-full overflow-hidden rounded-t-lg"> {/* Keep rounded top for image */}
        {/* Using Thirdweb's MediaRenderer for robust media display */}
        <MediaRenderer
          client={client}
          src={nft.image}
          alt={nft.name}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110" // Image hover effect
        />
      </div>
      {/* Added flex-grow to allow this section to fill space, pushing button to bottom if card heights vary */}
      <div className="p-6 flex flex-col flex-grow"> 
        <h3 className="text-2xl font-bold text-slate-100 mb-2 truncate" title={nft.name}>
          {nft.name}
        </h3>
        {nft.description && ( // Assuming description will be fetched and populated later
          <p className="text-slate-400 text-sm mb-3 h-10 overflow-hidden text-ellipsis">
            {nft.description}
          </p>
        )}
        <div className="mb-4">
          <p className="text-lg font-semibold text-cyan-400"> {/* Price color updated */}
            {nft.price ? nft.price : 'N/A'} {nft.currencySymbol}
          </p>
          <p className="text-xs text-slate-400 mt-1 truncate" title={`Split: ${displaySplitRecipient}`}> {/* Split contract text color updated */}
            Revenue Split: {displaySplitRecipient.substring(0, 6)}...{displaySplitRecipient.substring(displaySplitRecipient.length - 4)}
          </p>
        </div>
        
        {/* Spacer div to push button to the bottom */}
        <div className="flex-grow"></div>

        <ClaimButton
          contractAddress={nft.editionContractAddress}
          chain={polygon}
          client={client}
          claimParams={{
            type: "ERC1155",
            tokenId: 0n,
            quantity: 1n,
          }}
          // onClaimSuccess={(receipt) => alert(`Claimed! Tx: ${receipt.transactionHash}`)}
          // onClaimError={(err) => alert(`Claim error: ${err.message}`)}
          // Apply the new button-primary style, keep w-full for layout
          className="button-primary w-full mt-auto" // Added mt-auto to stick to bottom if content is short
        >
          Claim NFT
        </ClaimButton>
      </div>
    </div>
  );
};

export default DropCard;
