import { SET_WARRANTY_STATUS,SET_MY_NFT,SET_LOADING,SET_AVAIL_WARRANTY_STATUS,SET_SOLD,RELOAD_WARRANTIES } from './types';


const initialState = {
	loading: false,
	error: null,
	myNFTs: null,
	warrantyRequest : null,
	availRequest : null,
	nftSold : false,
	reloadWarranties : null,
};

const nftReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_WARRANTY_STATUS:
			return {
				...state,
				warrantyRequest : action.payload,
			};
		case SET_MY_NFT:
			return {
				...state,
				myNFTs: action.payload,
				loading: false,
			}
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			}
		case SET_AVAIL_WARRANTY_STATUS :
			return {
				...state,
				availRequest : action.payload,
			}
		case SET_SOLD : 
			return {
				...state,
				nftSold : action.payload,
			}
		case RELOAD_WARRANTIES :
			return {
				...state,
				reloadWarranties : action.payload,
			}
		default:
			return state;
	}
};

export default nftReducer;
