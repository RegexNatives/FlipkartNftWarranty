import axios from "../helpers/axios";
import { errorToast, successToast } from "../utils/toast";
import * as actionTypes from "../reducers/types";
import { sellNFTAction } from "./nft.actions";

export const sendOtpAction = (data) => async (dispatch) => {
    try{
        const res = await axios.post('/otp/initiateTransfer', data);
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_SELL,
                payload: {wallet : data.walletAddress , buyer : data.userId}
            });
            dispatch({
                type: actionTypes.SET_OTP,
                payload: true
            })
            successToast('OTP sent successfully');
        }
        else{
            errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
        errorToast("Something went wrong");
    }
}

/* Logging the values of the formik form. */
export const verifyOtpAction = (otpData,token,sellWallet,setOpen,resetWallet,navigate) => async (dispatch) => {
    try{
        const res = await axios.post('/otp/completeTransfer', otpData);
        if(res.data.status){
            successToast('OTP verified successfully');
            dispatch({
                type: actionTypes.SET_OTP,
                payload: false
            })
            await resetWallet();
            dispatch(sellNFTAction(token,sellWallet,setOpen,otpData,navigate));
        }
        else{
            errorToast('Invalid OTP');
        }
    }
    catch(err){
        console.log(err);
        // errorToast("Something went wrong");
        // setOpen(false);
    }
}

export const confirmSending = (data) => async (dispatch) => {
    try{
        const res = await axios.post('/otp/sendConfirmation', data);
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_OTP,
                payload: false
            })
            successToast('Warranty sold successfully !');
            dispatch({
                type: actionTypes.SET_SOLD,
                payload: true,
            });
        }
        else{
            errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
        errorToast("Cannot Send Email");
    }
}