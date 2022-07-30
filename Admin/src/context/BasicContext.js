import React, { useEffect, useState, createContext, useContext } from "react";
import { ethers } from "ethers";
import { axios } from "axios";
import { getAllOrders } from "../api/orders";
import { contractABI, contractAddress } from "../utils/warranty";
import {toast} from 'react-toastify';
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
    {
      shippingInfo: {
        address: "House No. 157 Moh Neel Khudana Sikhola Chowk Jwalapur",
        city: "Haridwar",
        state: "UK",
        country: "IN",
        pincode: 249407,
        phoneNo: 8449129069,
      },
      paymentInfo: {
        id: "20220724111212800110168631303907828",
        status: "TXN_SUCCESS",
      },
      _id: "62dd5d9c23ed77d3be77e849",
      orderItems: {
        name: "Apple iPhone 12",
        price: "$999",
        image: "",
        description:
          "This is the new Apple iPhone 12 with extra and astonishing new feautures",
        _id: "62e287083a6a1f39982ed8a1",
        qty: 1,
      },
      user: "62dd1695fe702a25e7766fa9",
      paidAt: "2022-07-24T14:56:28.297Z",
      totalPrice: 499,
      orderStatus: "Delivered",
      shippedAt: "2022-07-22T14:56:28.297Z",
      deliveredAt: "2022-07-24T14:56:28.297Z",
      createdAt: "2022-07-21T14:56:28.301Z",
      __v: 0,
    },
    {
      shippingInfo: {
        address: "House No. 157 Moh Neel Khudana Sikhola Chowk Jwalapur",
        city: "Haridwar",
        state: "UK",
        country: "IN",
        pincode: 249407,
        phoneNo: 8449129069,
      },
      paymentInfo: {
        id: "20220724111212800110168631303907828",
        status: "TXN_SUCCESS",
      },
      _id: "62dd5d9c23ed77d3be7723b1",
      orderItems: {
        name: "Apple Watch",
        price: "$299",
        image: "",
        description:
          "This is the new Apple Watch with extra and astonishing new feautures",
        _id: "62e287083a6a1f39982ed8a2",
        qty: 1,
      },
      user: "62dd1695fe702a25e7766fa9",
      paidAt: "2022-07-24T14:56:28.297Z",
      totalPrice: 41999,
      orderStatus: "Processing",
      createdAt: "2022-07-24T14:56:28.301Z",
      __v: 0,
    },
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
        console.log("finally");
      });
  }, []);

  const createNFT = async (formData) =>{
    try{
      if(ethereum){
        const {receiver,tokenURI,minutesValid} = formData;
        const warrantyContract = createEthereumContract();
        const NFTHash = await warrantyContract.createWarranty(receiver,tokenURI,minutesValid);
        await NFTHash.wait();
        return NFTHash;
      }
      else{
        toast.error("Error in wallet connection!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    catch(err){
      console.log(err);
      return {errorStatus : true}
    }
  }

  const assignSeller = async (address) => {
    try {
      if (ethereum) {
        const warrantyContract = createEthereumContract();
        const NFTs = await warrantyContract.assignSeller(address);
        return NFTs;
      } else {
        toast.error("Error in wallet connection!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log(err);
      return { errorStatus: true };
    }
  };

  const fetchNFTsMintedBy = async () =>{
    try{
      if(ethereum){
        const warrantyContract = createEthereumContract();
        const NFTs = await warrantyContract.fetchNFTsMintedBy(currentAccount);
        return NFTs;
      }
      else{
        toast.error("Error in wallet connection!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        toast.error("Error in wallet connection!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    catch(err){
      console.log(err);
      return {errorStatus : true}
    }
  }
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

        setCurrentAccount(accounts[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };


  return (
    <BasicContext.Provider
      value={{
        connectWallet,
        currentAccount,
        setCurrentAccount,
        isLoading,
        orders,
        setOrders,
        cart,
        setCart,
        createNFT,
        fetchNFTsMintedBy,
        assignSeller,
        availNFT,
      }}
    >
      {children}
    </BasicContext.Provider>
  );
};

export function useAppContext() {
  return useContext(ContextProvider);
}
