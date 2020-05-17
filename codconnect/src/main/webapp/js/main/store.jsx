import {applyMiddleware, createStore, combineReducers} from "redux";
//import axios from 'axios';
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

//import isEmpty from "lodash/isEmpty";

import combinedReducers from "./reducers/combinedReducers.jsx";
import {setAuthorizationToken} from "./auth/utils/utils.jsx";


import jwtDecode from "jwt-decode";
import {setCurrentUser, refreshToken, logout} from "./auth/actions/loginActions.jsx";

import {SET_CURRENT_USER} from './auth/actions/types.jsx';

//import {serviceHost} from "./utils/utils.jsx";

const checkTokenExpirationMiddleware = store => next => action => 
{
	console.log("checkTokenExpirationMiddleware is called and will dispatch ", action);
  /*const token =
    JSON.parse(localStorage.getItem("user")) &&
    JSON.parse(localStorage.getItem("user"))["token"];
  if (jwtDecode(token).exp < Date.now() / 1000) 
  {
    next(action);
    localStorage.clear();
  }*/
	if (action.type == SET_CURRENT_USER && !isEmpty(action.user)) //empty object of auth
	{
		console.log("action.type is " + action.type + "Exp: " + new Date(action.user.exp * 1000) +"| current time: " + new Date() + "| Date.now(): "+Date.now()/1000);
		
		console.log("exp: "+action.user.exp+", now(): "+Date.now()/1000+" difference: " +(action.user.exp - (Date.now()/1000)));
		if (action.user.exp < (Date.now()/1000)) //if expired
		{
			//1. logout and login again
			//1. logout and get a token again
			console.log("Token is expired...");
			refreshToken(action.user); 

		}
	}
  return next(action);
};


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

export default store;