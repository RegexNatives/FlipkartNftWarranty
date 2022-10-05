import axios from "../helpers/axios";
import * as actionTypes from "../reducers/types";
import { errorToast, successToast } from "../utils/toast";



export const createWarrantyRequestAction = (data,setModal) => async (dispatch) => {
    try{
        const res = await axios.post('/warranty/create', data);
        if(res.data.status){
            dispatch(getWarrantyRequest(data.orderId))
            // dispatch({
            //     type: actionTypes.SET_WARRANTY_STATUS,
            //     payload: res.data
            // });
            setModal(false);
            successToast('Request created successfully');
        }
        else{
            errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}

export const getWarrantyRequest = (orderId) =>async (dispatch) => {
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