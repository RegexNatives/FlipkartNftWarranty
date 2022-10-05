import axios from "../helpers/axios";
import * as actionTypes from "../reducers/types";
import { errorToast, successToast } from "../utils/toast";



export const getAvailWarrantyStatus = (token) =>async (dispatch) => {
    try{
        const res = await axios.get('/avail/status/'+token);
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_AVAIL_STATUS,
                payload: res.data.data
            });
        }
        else{
            dispatch({
                type: actionTypes.SET_AVAIL_STATUS,
                payload:null
            });
            // errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}


export const changeAvailRequestStatus = (token,availId,status,setLoader) =>async (dispatch) => {
    try{
        const res = await axios.put('/avail/status/'+availId,{status});
        if(res.data.status){
            dispatch(getAvailWarrantyStatus(token))
            successToast("Warranty availed successfully!");
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


export const getAllAvailRequests = () =>async (dispatch) => {
    try{
        const res = await axios.get('/avail/vendor/getAvailRequests');
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_ALL_AVAIL_REQUESTS,
                payload: res.data.data
            });
        }
        else{
            dispatch({
                type: actionTypes.SET_ALL_AVAIL_REQUESTS,    
                payload:null
            });
            // errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}