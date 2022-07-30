import React, { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { axios } from "axios";
import { getAllOrders } from "../api/orders";
import { contractABI, contractAddress } from "../utils/warranty";
const { ethereum } = window;
export const BasicContext = createContext();
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const warrantyContract = new ethers.Contract(contractAddress, contractABI, signer);

  return warrantyContract;
};
export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
  ]);
  const [error,setError] = useState(null);


  useEffect(() => {
    getAllOrders()
      .then((res) => {
        // console.log(res);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log("finally");
      });
  }, []);


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

  const changeNetwork = async ({ networkName, setError }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };


  function isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }

  const connectWallet = async () => {
    if (isMetaMaskInstalled()) {
      try {
        setIsLoading(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (chainId != 80001) {
          await changeNetwork({networkName: 'polygon', setError});
        }


        const accounts = await provider.send("eth_requestAccounts", []);
        // console.log(accounts,provider.provider);
        setCurrentAccount(accounts[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  const sellNFT = async (tokenId,address) => {
    try{
      if(ethereum){
        const warrantyContract = createEthereumContract();
        const NFTs = await warrantyContract.resellWarrantyNft(tokenId,address);
        return NFTs;
      }
      else{
        // alert("Error in wallet connection!");
        toast.error("Error in wallet connection!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }
    }
    catch(err){
      console.log(err);
    }
  }

  const availNFT = async (token) => {
    try{
      if(ethereum){
        const warrantyContract = createEthereumContract();
        const NFTs = await warrantyContract.validateNft(token);
        return NFTs;
      }
      else{
        alert("Error in wallet connection!");
      }
    }
    catch(err){
      console.log(err);
    }
  }

  
  const fetchMyNFTs = async () =>{
    // console.log(currentAccount)
    try{
      if(ethereum){
        const warrantyContract = createEthereumContract();
        const NFTs = await warrantyContract.fetchMyNFTs();
        return NFTs;
      }
      else{
        alert("Error in wallet connection!");
      }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <BasicContext.Provider
      value={{
        fetchMyNFTs,
        connectWallet,
        currentAccount,
        setCurrentAccount,
        isLoading,
        orders,
        setOrders,
        cart,
        setCart,
        sellNFT,
        availNFT
      }}
    >
      {children}
    </BasicContext.Provider>
  );
  
};


export function useAppContext() {
  return useContext(ContextProvider);
}
