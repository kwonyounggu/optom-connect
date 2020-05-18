import {applyMiddleware, createStore, combineReducers} from "redux";
import axios from 'axios';
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

//import isEmpty from "lodash/isEmpty";

import combinedReducers from "./reducers/combinedReducers.jsx";
import {setAuthorizationToken} from "./auth/utils/utils.jsx";


import jwtDecode from "jwt-decode";
import {setCurrentUser} from "./auth/actions/loginActions.jsx";

const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(combinedReducers, middleware);

/* Commented the following statement since it requires store object to get the api, dispatch
export default createStore(combinedReducers, middleware);
*/

if (localStorage.authToken) 
{
	//New token expiring 365 days later will be allocated whenever a new login is performed
	//if the token is expired after 365 days then call logout so that it will clean localStorage

	let user = jwtDecode(localStorage.authToken);
	console.log("[INFO in store.jsx] token expire time: " + new Date(user.exp * 1000) +" | current time: " + new Date());
	if (user.exp < (Date.now()/1000)) 
	{
		console.log("[INFO in store.jsx]: the access token is expired.");
		//The following two statements are the same as in logout() function
		setAuthorizationToken(false);
	  	store.dispatch(setCurrentUser({}));
	}
	else
	{
		console.log("[INFO in store.jsx]: the access token is not expired yet.")
	  	setAuthorizationToken(localStorage.authToken);
	  	store.dispatch(setCurrentUser(user));
	}
}

axios.interceptors.request.use
(
	(config) =>
	{
	    // Do something before request is sent
		//check nagator.online and server is alive before
		console.log("[BEFORE axios request] config: ", config);
	    return config;
	}, 
	(error) =>
	{
	    // Do something with request error
		console.log("[BEFORE axios request] error: ", error);
	    return Promise.reject(error);
	}
);
axios.interceptors.response.use
(
    (response) => 
    {
		console.log("[RESPONSE value]: ", reponse);
        return response
    },
    (error) => 
	{
        if (!error.response) 
		{
            console.log("Please check your internet connection.");
        }

        //return Promise.reject(error);
    }
);



export default store;