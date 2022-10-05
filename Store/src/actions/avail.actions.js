import axios from "../helpers/axios";
import * as actionTypes from "../reducers/types";
import { errorToast, successToast } from "../utils/toast";

export const createAvailWarrantyRequest = (data) => async (dispatch) => {
    try{
        const res = await axios.post('/avail/create', data);
        if(res.data.status){
            // dispatch({
            //     type: actionTypes.SET_AVAIL_WARRANTY_STATUS,
            //     payload: res.data.data
            // });
            dispatch(getAvailWarrantyRequest(data.token))
            successToast('Claim Request sent successfully');
        }
        else{
            errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}

export const getAvailWarrantyRequest = (token) =>async (dispatch) => {
    try{
        const res = await axios.get('/avail/status/'+token);
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_AVAIL_WARRANTY_STATUS,
                payload: res.data.data
            });
        }
        else{
            dispatch({
                type: actionTypes.SET_AVAIL_WARRANTY_STATUS,
                payload:null
            });
            // errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}