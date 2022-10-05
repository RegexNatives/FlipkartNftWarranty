import axios from "../helpers/axios";
import * as actionTypes from "../reducers/types";
import { errorToast, successToast } from "../utils/toast";


export const getAllOrder =() => async (dispatch) => {

    try{
        const res = await axios.get('/order/vendor/getAll');
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_MY_ORDERS,
                payload: res.data.data
            });
        }
        else{
            errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}


export const updateOrderStatus = (orderId,status) => async (dispatch) => {
    try{
        const res = await axios.put(`/order/status/${orderId}`, {status});
        if(res.data.status){
            dispatch(getAllOrder());
            successToast(`Order ${status} successfully`);
        }
        else{
            errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}