import { SET_WARRANTY_STATUS,SET_ALL_WARRANTY_REQUESTS,SET_MY_NFT,SET_LOADING,SET_AVAIL_STATUS,SET_ALL_AVAIL_REQUESTS } from './types';


const initialState = {
	loading: false,
	error: null,
	myNFTs: null,
	warrantyRequest : null,
	allWarrantyRequests : null,
	availRequest : null,
	allAvailRequests : null,
};

const nftReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_WARRANTY_STATUS:
			return {
				...state,
				warrantyRequest : action.payload,
			};
		case SET_ALL_WARRANTY_REQUESTS:
			return {
				...state,
				allWarrantyRequests : action.payload,
			};
		case SET_MY_NFT:
			return {
				...state,
				myNFTs : action.payload,
				loading: false,
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SET_AVAIL_STATUS:
			return {
				...state,
				availRequest : action.payload,
			};
		case SET_ALL_AVAIL_REQUESTS:
			return {
				...state,
				allAvailRequests : action.payload,
			};
		default:
			return state;
	}
};

export default nftReducer;
