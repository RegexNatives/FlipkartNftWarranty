import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import productReducer from './products.reducer';
import nftReducer from './nft.reducer';
import { AUTH_LOGOUT } from './types';

const appReducer = combineReducers({
	user: authReducer,
	products : productReducer,
	warranty : nftReducer,
});

const rootReducer = (state, action) => {
	if (action.type === AUTH_LOGOUT) {
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
};

export default rootReducer;
