// NftData remains the primary interface for rich NFT details
export interface NftData {
  id: string; // Unique identifier (e.g., SYMBOL or contract address)
  name: string;
  description?: string; // Will be fetched from tokenUri later if needed
  image: string; // HTTP URL for the NFT's primary image/media
  animation_url?: string; // Optional HTTP URL for animation/video
  editionContractAddress: string; // Smart contract address of the ERC1155 Edition Drop
  price?: string; // Formatted price string, e.g., "10 MATIC"
  currencySymbol?: string; // e.g., "MATIC" / "POL"
  splitContractAddress: string; // Smart contract address of the associated Split contract
  tokenUri?: string; // IPFS or HTTP URI for metadata
  // sellerAddress (Split) is the splitContractAddress for now, recipient can be fetched
}

const THIRDWEB_CLIENT_ID = "a37f843ccef648163abc82ab025e7cf7";

function formatIpfsUri(ipfsUri: string): string {
  if (!ipfsUri || !ipfsUri.startsWith("ipfs://")) {
    return ipfsUri; // Return as is if not a valid IPFS URI
  }
  const hashAndPath = ipfsUri.substring("ipfs://".length);
  return `https://${THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/${hashAndPath}`;
}

// Populate with the provided 16 NFTs
export const allNftsData: NftData[] = [
  {
    id: "TEM",
    name: "Tides of the Eternal Mind",
    image: formatIpfsUri("ipfs://QmfW2F29peaJPKCxYLEjMkFRbeEcRDa3MUFyqoTkjTAYqf/0.jpg"),
    editionContractAddress: "0xaa26Ef9831D0F8737032D8CE29fbaf3Efb0eDFe7",
    splitContractAddress: "0xF01643896624973A97baCB5525fcc49562d0679e",
    price: "8903",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmTHtfxtG5788q5vUwqUxcvfg6XmRNuCV3kiWA7Xn5jx7Y/0"),
    // description will come from tokenUri metadata
  },
  {
    id: "GCC",
    name: "Galactic Clean-Up Crew",
    image: formatIpfsUri("ipfs://QmNcTwgWp3rMW3RxSbeKArNHiSpA3qZmMYv61m7LKHj4N7/0.jpg"),
    editionContractAddress: "0xBF186Cb90ac092B16c97064046502c695340eEd9",
    splitContractAddress: "0x48791b0D7DD55FB6fde9b2e2F37DDe33507c8275",
    price: "1001",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmcWxYyYMUi5EsYCBArF3TZTpnaGUnWYpnD1uWfFhferDH/0"),
  },
  {
    id: "EVC",
    name: "C0mMzoVeRLoAD",
    image: formatIpfsUri("ipfs://QmYpogwdFMRonvU7p26S8JeUcU46TFk6aTBhGyyUEAX8E3/0.jpg"),
    editionContractAddress: "0xd988b058be7F2AfAa5dF95a17527ba14263Da394",
    splitContractAddress: "0xB9dCbBe08c33475C990251B173149bb774916C0B",
    price: "3557",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmWvMhx65gCEunRhtCH5aRYUdeNWQBctmm4hw4nJxjhnpd/0"),
  },
  {
    id: "CMV",
    name: "Entre la Vida y el Plástico",
    image: formatIpfsUri("ipfs://Qmant6X4GE4o7bMDuYDCyGr3wRwUpTejAzBjgDJucWR6H5/0.jpg"),
    editionContractAddress: "0xDCfeBA9001D7296790ed2c5ea6d38B528BAB4d1c",
    splitContractAddress: "0xA74645BFe396Fe28FF1B8C0218277fb77FE6e717",
    price: "1001",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmZCqas9VQ2hwtJTbhQN8snfV4hVM4rBvi99SWPXjxBhmj/0"),
  },
  {
    id: "BBB",
    name: "Bit-Beats Bliss",
    image: formatIpfsUri("ipfs://QmV7oRsZvLCW7hjapbYZeSW9FvarxwqStAwrUNEYUXzzjV/0.gif"), // This is a GIF
    editionContractAddress: "0xD9a6579358e55C546136b65E901929C4E2176110",
    splitContractAddress: "0xe041018914bDce2d7B9dCEb11Ca18f4856B2AA48",
    price: "400",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmUXvTJngrWAEhxeUcuhK9oaTX2gRKgY8JnVcWJ3uq6pqj/0"),
  },
  {
    id: "IVT",
    name: "I vow to take care of you",
    image: formatIpfsUri("ipfs://QmfZ3cSxD4Zri5XjCDNEjFyZpnVFa7xPkfYHesKyef3idX/0.jpg"),
    editionContractAddress: "0x8088bC8eAA829FD64C6124A932D51142A96bb568",
    splitContractAddress: "0xaca28FfDFd647719eE9bb77db4D307De06F6ed25",
    price: "3557",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmQfmB1gmRSLajXvDntwDCfaWVUbfjoUQNZHpYJzk1uNS2/0"),
  },
  {
    id: "YSL",
    name: "Yo Soy Libertad",
    image: formatIpfsUri("ipfs://QmVuTVZRZXoqx67LDtz96YQqcjSaLmYq9rPiMi1SHw3H2S/0.jpg"),
    editionContractAddress: "0x2f5F4fB5Df26DD4F4c7E4e100AE4a9e44FAd097F",
    splitContractAddress: "0x6D22d05728b8D14893630C7A438d56513f97D62E",
    price: "35259",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmYRiMFGBpTNBadd9e4TwfEmfqJx76dMLqwkhVak7P98ZZ/0"),
  },
  {
    id: "PSA",
    name: "Pirolisaurio: Born from the Fossil Age",
    image: formatIpfsUri("ipfs://QmRJ6B6FHAH8rvuyvRDFZFnT8btdfniDJpBpiNnPwXK1Mm/0.jpg"),
    editionContractAddress: "0xD7544C4d10a1EC19eD81F88E26ef49DC95c13994",
    splitContractAddress: "0xe2902e12B2C1284606beAfdb2B00608fD50970E5",
    price: "12020",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://Qmbx3pUD4WDG19s1Vd6Gj1WKHKcY7Tepzy4PfbgB1zfDXK/0"),
  },
  {
    id: "PLL",
    name: "Petgaserito Laser Luca",
    image: formatIpfsUri("ipfs://QmcxLvSAnCXH3DBiYm6ipTto2PWHxJuzadpJDAyUZ32Zr7/0.jpg"),
    editionContractAddress: "0x554f00371855B4181383a81D755670D84F7A8F9a",
    splitContractAddress: "0x8b829772C0FfBE94636EbB21EA66DEEB130b97Ba",
    price: "4006",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmdGYXHVQ1svTyopoRxbtAQUf32BZfdYKUwdnkdbqws2sN/0"),
  },
  {
    id: "MOL",
    name: "MOON LANDING",
    image: formatIpfsUri("ipfs://QmNxeKbAALatkoBCQkRx4cSEmU1osuKYP9XM648MBRmkzH/0.jpeg"),
    editionContractAddress: "0xFf36b502f2A33C1947faEfe04dE7aEf7153927f7",
    splitContractAddress: "0x78EFaA509364aEF819084714EB8281e64fd9bfa9",
    price: "1779",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmaVttEEYDomM61QMJwHHeEMmC9xH3X9LyP3tHWAThpCeT/0"),
  },
  {
    id: "HTC",
    name: "Hydrothermal Camouflage",
    image: formatIpfsUri("ipfs://QmQbTPd3SpWbyxN2so1xamFMKXNZiD6UC4omZRrp7ymm5T/0.jpg"),
    editionContractAddress: "0xC5629354Aa40E5CB1831Ce39b2cF055e9794a7e6",
    splitContractAddress: "0x176d6446519aCaBA2BE80769a4Ed9E489fe27a60",
    price: "3205",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmfKU5Qj6oGDzCXWvG6E3Zm3n2aKtxTeHoV1KAdtpzDjcY/0"),
  },
  {
    id: "FLC",
    name: "Floral Coral by IGLI",
    image: formatIpfsUri("ipfs://QmTEdDpohzRWcpmZdMEGjb58bqs1YpgXR77TyASD7Ty1Ky/0.jpg"),
    editionContractAddress: "0xA57078A4Ad37db2B2da0df0810946d1Acdb4EE29",
    splitContractAddress: "0x1AC6Ef1fED07956Bc5fA3f8A02CC24E9a62AB345",
    price: "320",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmfZ2DC2RDnWfNAeDqJk95DVQwijQWPknY2TocGXUMfSCs/0"),
  },
  {
    id: "SWH",
    name: "Snail Whale",
    image: formatIpfsUri("ipfs://QmTyR1C41vBLDRxr4sqgpPSWQBFzFcmofAqpHQtXYuxcsu/0.JPG"),
    editionContractAddress: "0x2F5318ff2814bbDcb0738453D901384AbEE3aF19",
    splitContractAddress: "0xE1d5AA169c0AEEF3DdDd9fE25AB1bBFDd5038BFE",
    price: "320",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmXyPGVAHBSuR1MeQYZUhr6xo3Dhn1F4URU7Utedhj8fz5/0"),
  },
  {
    id: "RAI",
    name: "regenAIssance (i.)",
    image: formatIpfsUri("ipfs://QmWj76x9aEPoeHHYjSKRoSvagbHbhFHf6bLrJsftixqfMH/0.jpg"),
    editionContractAddress: "0xcBc8c4Ac8936E54F87dBE613AdfaA2b6e056ba4C",
    splitContractAddress: "0xDEFC608F9831803b6A742FF25546600dA157928b",
    price: "13353",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://Qmf6UnAXSxurS6u2hEfJsXMQqEeMbp9HwB3Tt8BMurcuRo/0"),
  },
  {
    id: "TRG",
    name: "Treegeneration",
    image: formatIpfsUri("ipfs://QmQBj5qjjBqEn9TC2xmADMdm6Quk4AFfbwPUPnnE3FC81w/0.jpg"),
    editionContractAddress: "0x843cF0f7f2a52C0DAc274EAa42D3520C7E2Ba1De",
    splitContractAddress: "0x28dBF7b0D440cA2E95600363F70F82C59B0A0db1",
    price: "276",
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmcYqFCpwuG6p1Sbyxp4jzwVqwBLnDfYYUhQnb7vLKmoTn/0"),
  },
  {
    id: "CHIDO",
    name: "C.H.I.D.O.",
    image: formatIpfsUri("ipfs://Qmc9cJKQVH5vMHzvXHKWSPArjFJiYaG6EweQyDHsStEgzy/0.png"),
    editionContractAddress: "0x6BF74eB3D776A7c24f7fCe2e04E937bf8cF4296B",
    splitContractAddress: "0x76e4ae4B5d4d3416f34896a1715Dde718754A6Ee",
    price: "0.5", // This is a float, ensure ClaimButton handles it or it's converted
    currencySymbol: "POL",
    tokenUri: formatIpfsUri("ipfs://QmTxX7kWQQfWzeoTiPuXX51tFM9X24gqBwB36QNze7459N/0"),
  },
];
