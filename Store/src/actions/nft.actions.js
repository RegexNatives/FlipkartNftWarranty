import * as actionTypes from '../reducers/types';
import warrantyContract from "../helpers/contract";
import { ethers } from "ethers";
import {networks} from '../config';
import { errorToast, successToast } from '../utils/toast';
import axios from 'axios';
import { convertIPFSURL } from '../utils/getNFT';
import { confirmSending } from './sell.actions';

const {ethereum } = window

export const fetchMyNFTs =()=> async (dispatch) =>{
    try{
      if(ethereum){
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: true
        })
        const NFTs = await warrantyContract.fetchMyNFTs();
        console.log(NFTs)
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
  // console.log(res.data.attributes[3]?.retailerId);
  let data = {
    image: convertIPFSURL(res.data.image),
    name: res?.data?.name,
    description : res?.data?.description,
    token: parseInt(nft.tokenId._hex, 16),
    validUnitll: parseInt(nft.validUntil._hex, 16),
    vendorId : res.data?.attributes[3]?.retailerId,
    redemptionLimit : parseInt(nft?.redemptionLimit,16),
    redemptionCount : parseInt(nft?.redemptionCount,16),
  };
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


export const sellNFTAction =  (tokenId,address,setOpen,otpData) => async(dispatch) => {
    try{
      if(ethereum){
        const NFTs = await warrantyContract.resellWarrantyNft(tokenId,address);
        // console.log(NFTs);
        setOpen(false);
        dispatch({
          type:actionTypes.SET_SOLD,
          payload : true
        })
        dispatch({
          type : actionTypes.RELOAD_WARRANTIES,
          payload : "Yes",
        })
        dispatch(confirmSending(otpData));
      }
      else{
        errorToast("Error in wallet connection!");
        setOpen(false);
      }
    }
    catch(err){
      console.log(err);
      errorToast("Something went wrong");
      setOpen(false);
    }
  }


  export const validateNFT = (token) => async (dispatch) =>{
    try{
      if(ethereum){
        const NFTs = await warrantyContract.validateNft(token);
        console.log(NFTs);
        successToast("Congratulations Warranty is valid!")
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


export const requestWarranty = async (tokenId,address) => {
  
}

