import { SET_PRODUCTS,SET_MY_ORDERS } from './types';

const initialState = {
	products: [],
	orders : [],
	loading: false,
	error: null,
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
		case SET_MY_ORDERS:
			return {
				...state,
				orders: action.payload,
				loading: false,
			}
		default:
			return state;
	}
};

export default productReducer;
