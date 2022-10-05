import axios from "../helpers/axios";
import * as actionTypes from "../reducers/types";


export const getAllProducts = () => async (dispatch) => {
    try{
        const res = await axios.get('/products/all');
        if(res.status === 200){
            dispatch({
                type: actionTypes.SET_PRODUCTS,
                payload: res.data.data
            });
        }
    }
    catch(err){
        console.log(err);
    }
}

