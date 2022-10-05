import axios from 'axios';
import {errorToast} from '../utils/toast';
import { logout } from '../actions/auth.actions';

const instance = axios.create({
	baseURL : "https://api.regexnatives.in/v1"
	// baseURL : "http://localhost:8000/v1"
});

instance.interceptors.response.use(
	function (res) {
		return res;
	},
	function (error) {
		// console.log(error.response.status);
		if(error.response.status == 401){
			logout();
			errorToast("Session expired, please login again");
		}
		if(error.message.includes('Email already registered')){
			errorToast('Email already exists');
		}
		else{
			errorToast('Something went wrong!');
		}
		return Promise.reject(error);
	},
);

export default instance;