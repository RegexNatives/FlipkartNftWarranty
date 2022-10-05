import * as actionTypes from '../reducers/types';
import warrantyContract from "../helpers/contract";
import { ethers } from "ethers";
import {networks} from '../config';
import { errorToast, successToast } from '../utils/toast';
import {changeWarrantyRequestStatus} from './warranty.actions';
import {changeAvailRequestStatus} from './avail.actions';
import axios from 'axios';
import {convertIPFSURL} from "../utils/getNFT"

const {ethereum} = window;

export const fetchNFTsMintedBy = (currentAccount) =>async (dispatch) =>{
    try{
      if(ethereum){
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: true
        })
        const NFTs = await warrantyContract.fetchNFTsMintedBy(currentAccount);
        // console.log(NFTs);
        dispatch(convertFetchedNFT(NFTs));
        // return NFTs;
      }
      else{
        alert("Error in wallet connection!");
      }
    }
    catch(err){
      console.log(err);
    }
}

export const convertNFTs = async (nft) =>{
    let hitUrl = convertIPFSURL(nft?.uri);
    const res = await axios.get(hitUrl);
    // console.log(res.data);
    let data = {
      image: res.data.image,
      name: res.data.name,
      token: parseInt(nft.tokenId._hex, 16),
      validUnitll: parseInt(nft.validUntil._hex, 16),
      redemptionLimit : parseInt(nft?.redemptionLimit,16),
      redemptionCount : parseInt(nft?.redemptionCount,16),
    };
    console.log(data);
    return data
}

export const convertFetchedNFT = (NFTs) =>async (dispatch) =>{
  let data = [];
  for(let i=0;i<NFTs.length;i++){
    let nft = await convertNFTs(NFTs[i]);
    data.push(nft);
  }
  // console.log(data,"data");
  dispatch({
    type: actionTypes.SET_MY_NFT,
    payload: data
  })
}



export const availWarranty =  (connectWallet,tokenId,availId,setLoader) => async (dispatch) => {
    try{
      if(ethereum){
        await connectWallet("reset");
        const NFTs = await warrantyContract.availWarranty(tokenId);
        // console.log(NFTs);
        dispatch(fetchNFTsMintedBy(ethereum.selectedAddress));
        // setLoader(false);
        dispatch(changeAvailRequestStatus(tokenId,availId,"Completed",setLoader));
        // successToast("Warranty availed successfully!");
        // return NFTs;
      }
      else{
        errorToast("Error in wallet connection!");
        setLoader(false);
      }
    }
    catch(err){
      console.log(err);
      errorToast("Not Authorized, Please change account!");
      setLoader(false);
    }
}


export const createNFTAction = (connectWallet,data,setLoader) => async (dispatch) =>{
  try{

    if(ethereum){
      await connectWallet("reset")
      const { receiver,tokenURI,minutesValid ,orderId,warrantyId,currentAccount } = data;
      const NFTHash = await warrantyContract.createWarranty(receiver,tokenURI,minutesValid,5);
      await NFTHash.wait();
      // console.log(NFTHash);
      dispatch(changeWarrantyRequestStatus(orderId,warrantyId,"Minted",setLoader));
      dispatch(fetchNFTsMintedBy(currentAccount));
    }
    else{
      errorToast("Error in wallet connection!");
    }
  }
  catch(err){
    console.log(err);
    errorToast("Not Authorized, Please change account!");
    setLoader(false);
  }
}