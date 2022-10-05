import axios from "../helpers/axios";
import * as actionTypes from "../reducers/types";
import { errorToast, successToast } from "../utils/toast";



export const getWarrantyRequestStatus = (orderId) =>async (dispatch) => {
    try{
        const res = await axios.get('/warranty/status/'+orderId);
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_WARRANTY_STATUS,
                payload: res.data
            });
        }
        else{
            dispatch({
                type: actionTypes.SET_WARRANTY_STATUS,
                payload:null
            });
            // errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}


export const changeWarrantyRequestStatus = (orderId,warrantyId,status,setLoader) =>async (dispatch) => {
    try{
        const res = await axios.put('/warranty/status/'+warrantyId,{status});
        if(res.data.status){
            dispatch(getWarrantyRequestStatus(orderId))
            successToast("Warranty assigned successfully!");
        }
        else{
            dispatch({
                type: actionTypes.SET_WARRANTY_STATUS,
                payload:null
            });
            errorToast(res.data.message);
        }
        setLoader(false);
    }
    catch(err){
        console.log(err);
        setLoader(false);
    }
}


export const getAllWarrantyRequests = () =>async (dispatch) => {
    try{
        const res = await axios.get('/warranty/vendor/getWarrantyRequests');
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_ALL_WARRANTY_REQUESTS,
                payload: res.data.data
            });
        }
        else{
            dispatch({
                type: actionTypes.SET_ALL_WARRANTY_REQUESTS,    
                payload:null
            });
            // errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}