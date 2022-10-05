import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import { AUTH_LOGOUT } from './types';

const appReducer = combineReducers({
	user: authReducer,
});

const rootReducer = (state, action) => {
	if (action.type === AUTH_LOGOUT) {
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
};

export default rootReducer;
