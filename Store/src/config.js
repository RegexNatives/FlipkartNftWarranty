export const apiURL = "https://nft-warranty-backend.herokuapp.com/v1/";
// export const apiURL = "http://localhost:8000/v1/";

export const networks = {
    polygon: {
      chainId: `0x13881`,
      chainName: "Mumbai Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
  };