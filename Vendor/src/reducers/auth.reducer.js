import { LOADING_USER, AUTH_LOGIN, AUTH_LOGOUT, SET_USER,SET_ACCOUNT } from './types';


const initialState = {
	loggedIn: false,
	loading: false,
	error: null,
	user: null,
    currentAccount : null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_USER:
			return {
				...state,
				loading: true,
			};
		case AUTH_LOGIN:
			return {
				...state,
				loggedIn: true,
				loading: false,
			};
		case AUTH_LOGOUT:
			return initialState;
		case SET_USER:
			return {
				user: action.payload,
				loading: false,
				loggedIn: true,
			};
        case SET_ACCOUNT:
            return {
                ...state,
                currentAccount : action.payload,
            }
		default:
			return state;
	}
};

export default authReducer;
