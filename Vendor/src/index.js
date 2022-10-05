import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import "./index.css"
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import axios from './helpers/axios';
import { logout } from './actions/auth.actions';
import * as actionTypes from './reducers/types';

const { Persistor, store } = configureStore();

const token = localStorage.JWTToken;
if (token) {
	store.dispatch({ type: actionTypes.AUTH_LOGIN });
	axios.defaults.headers.common.Authorization = `Bearer ${token}`;
} else {
	store.dispatch(logout());
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
