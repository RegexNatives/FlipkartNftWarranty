import React, { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";
import { errorToast } from "../utils/toast";
const { ethereum } = window;

export const BasicContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }

  const networks = {
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

  const changeNetwork = async ({ networkName }) => {
    try {
      if (!window.ethereum) errorToast("No Wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      errorToast(err.message);
    }
  };

  const resetWallet = async () => {
    setCurrentAccount(null);
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  };

  
  const connectWallet = async () => {
    if (isMetaMaskInstalled()) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (chainId !== 80001) {
          await changeNetwork({ networkName: "polygon" });
        }
        const accounts = await provider.send("eth_requestAccounts", []);

        setCurrentAccount(accounts[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      errorToast("Please install Metamask!");
    }
  };

  return (
    <BasicContext.Provider
      value={{
        connectWallet,
        currentAccount,
        setCurrentAccount,
        isLoading,
        resetWallet,
      }}
    >
      {children}
    </BasicContext.Provider>
  );
};

export function useAppContext() {
  return useContext(ContextProvider);
}
