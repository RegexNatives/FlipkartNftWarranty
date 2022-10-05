import React, { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { errorToast } from "../utils/toast";
import { networks } from "../config";
const { ethereum } = window;

export const BasicContext = createContext();

export const ContextProvider = ({ children }) => {

  const dispatch = useDispatch();
  const [currentAccount, setCurrentAccount] = useState(null);

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


  const changeNetwork = async ({ networkName }) => {
    try {
      if (!window.ethereum) errorToast("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      alert(err.message);
    }
  };


  function isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }

  const connectWallet = async (type="normal") => {
    if (isMetaMaskInstalled()) {
      try {
        if(type == "reset") await resetWallet();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (chainId != 80001) {
          await changeNetwork({networkName: 'polygon'});
        }
        const accounts = await ethereum.request({method:"eth_requestAccounts"});
        const acc = await provider.listAccounts();
        // ethereum.request({ method: "eth_requestAccounts"});
        dispatch({
          type: "SET_ACCOUNT",
          payload: accounts[0]
        })
        setCurrentAccount(accounts[0]);
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
        resetWallet
      }}
    >
      {children}
    </BasicContext.Provider>
  );
  
};


export function useAppContext() {
  return useContext(ContextProvider);
}
