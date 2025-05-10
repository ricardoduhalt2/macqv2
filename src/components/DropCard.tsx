import * as React from 'react';
import { useState, useEffect } from 'react';
import type { NftData } from '../types';
import { ClaimButton, MediaRenderer } from 'thirdweb/react';
import { type ThirdwebClient, getContract } from 'thirdweb'; // Added getContract
import { polygon } from 'thirdweb/chains';
import { getNFT } from "thirdweb/extensions/erc1155"; // Added getNFT

interface DropCardProps {
  nft: NftData;
  client: ThirdwebClient;
}

const DropCard: React.FC<DropCardProps> = ({ nft, client }) => {
  const [fetchedDescription, setFetchedDescription] = useState<string | undefined>(undefined);
  const [isLoadingDescription, setIsLoadingDescription] = useState<boolean>(true);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchNftDescription = async () => {
      if (!nft.editionContractAddress || !client) {
        setIsLoadingDescription(false);
        return;
      }
      setIsLoadingDescription(true);
      setErrorDescription(null);
      try {
        const contract = getContract({
          client,
          chain: polygon,
          address: nft.editionContractAddress,
        });
        // Assuming tokenId is 0n based on data structure and common practice for these drops
        const nftMetadata = await getNFT({
          contract,
          tokenId: 0n, 
        });
        setFetchedDescription(nftMetadata.metadata.description || "No description available.");
      } catch (error) {
        console.error("Error fetching NFT description:", error);
        setErrorDescription("Could not load description.");
      } finally {
        setIsLoadingDescription(false);
      }
    };

    fetchNftDescription();
  }, [nft.editionContractAddress, client]); // Removed nft.tokenUri as contractAddress is key for getContract

  const displaySplitRecipient = nft.splitContractAddress;

  return (
    <div className="group overflow-hidden h-full flex flex-col">
      <div className="aspect-square w-full overflow-hidden rounded-t-lg">
        <MediaRenderer
          client={client}
          src={nft.image}
          alt={nft.name}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-100 mb-2 truncate" title={nft.name}>
          {nft.name}
        </h3>
        {isLoadingDescription ? (
          <p className="text-slate-500 text-sm mb-3">Loading description...</p>
        ) : errorDescription ? (
          <p className="text-red-500 text-sm mb-3">{errorDescription}</p>
        ) : (
          fetchedDescription && (
            <p className="text-slate-400 text-sm mb-3">
              {fetchedDescription}
            </p>
          )
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
