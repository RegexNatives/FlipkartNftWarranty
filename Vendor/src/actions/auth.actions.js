import * as actionTypes from '../reducers/types';
import axios from '../helpers/axios';
import { errorToast, successToast } from '../utils/toast';

export const loginUser = (data,navigate) => async (dispatch) => {
    try{
        const res = await axios.post('/auth/login/vendor', data);
        if(res.data.status){
            dispatch({
                type: actionTypes.SET_USER,
                payload: res.data.data
            });
            setAuthorizationHeader(res.data.data.accessToken);
            successToast('User logged in successfully');
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

export const logout = () => (dispatch) => {
	localStorage.removeItem('JWTToken');
	delete axios.defaults.headers.common.Authorization;
	dispatch({ type: actionTypes.AUTH_LOGOUT });
};



const setAuthorizationHeader = (token) => {
	localStorage.setItem('JWTToken', token);
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

