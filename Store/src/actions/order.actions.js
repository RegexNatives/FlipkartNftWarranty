import axios from "../helpers/axios";
import * as actionTypes from "../reducers/types";
import { errorToast, successToast } from "../utils/toast";


export const getAllOrder =() => async (dispatch) => {

    try{
        const res = await axios.get('/order/all');
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
        // console.log(err);
    }
}

export const createOrderAction = (data,setModal,navigate) => async (dispatch) => {
    try{
        const res = await axios.post('/order/create', data);
        if(res.data.status){
            dispatch(getAllOrder());
            setModal(false);
            successToast('Order created successfully');
            navigate('/orders')
        }
        else{
            errorToast(res.data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}