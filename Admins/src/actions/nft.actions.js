import * as actionTypes from '../reducers/types';
import warrantyContract from "../helpers/contract";
import { ethers } from "ethers";
import { errorToast, successToast } from '../utils/toast';

const {ethereum} = window;





export const assignAdminAction =  (walletAddress,setLoader) => async (dispatch) => {
    try{
      if(ethereum){
        const NFTs = await warrantyContract.assignAdmin(walletAddress);
        console.log(NFTs);
        setLoader(false);
        successToast("Assignment successfully!");
        // return NFTs;
      }
      else{
        errorToast("Error in wallet connection!");
      }
    }
    catch(err){
      console.log(err);
      setLoader(false);
      errorToast("Cannot Assign!");
    }
}



export const assignVendorAction =  (walletAddress,setLoader) => async (dispatch) => {
  try{
    if(ethereum){
      const NFTs = await warrantyContract.assignSeller(walletAddress);
      console.log(NFTs);
      setLoader(false);
      successToast("Assignment successfully!");
      // return NFTs;
    }
    else{
      errorToast("Error in wallet connection!");
    }
  }
  catch(err){
    console.log(err);
    setLoader(false);
    errorToast("Cannot Assign!");
  }
}

