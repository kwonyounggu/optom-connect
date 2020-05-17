import {applyMiddleware, createStore, combineReducers} from "redux";
import axios from 'axios';
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import isEmpty from "lodash/isEmpty";

import combinedReducers from "./reducers/combinedReducers.jsx";
import {setAuthorizationToken} from "./auth/utils/utils.jsx";


import jwtDecode from "jwt-decode";
import {setCurrentUser, refreshToken} from "./auth/actions/loginActions.jsx";

import {SET_CURRENT_USER} from './auth/actions/types.jsx';

import {serviceHost} from "./utils/utils.jsx";

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
		if ((action.user.exp - (Date.now()/1000)) < 5000) //if expired
		{
			//1. logout and login again
			//1. logout and get a token again
			console.log("Token expired...");
			refreshToken(action.user); 
			/*
			axios.post(serviceHost + "jsp/api/users/refreshToken.jsp", action.user).then
		  (
			
				(response) =>
				{
					console.log("[INFO refreshToken response of loginActions.jsx] successful, the response object=",response);
					setAuthorizationToken(false);//reset
					setAuthorizationToken(response.data.token);
					//dispatch(setCurrentUser(jwtDecode(response.data.token)));

				},
				(error) =>
				{
					console.log("[INFO refreshToken response] error,", error);
				}
			).
			catch // Without returning a response object 
			(
				(error) =>			
				{
					//show this error in a page or a top of the current page - Oct-19-2017
					//this error consists of an html page cotents
					console.log("[ERROR in refreshToken of loginActions.jsx]: ", error);
				}
			)
			*/
		}
	}
  return next(action);
};


const middleware = applyMiddleware(promise(), checkTokenExpirationMiddleware, thunk, logger);
const store = createStore(combinedReducers, middleware);

/* Commented the following statement since it requires store object to get the api, dispatch
export default createStore(combinedReducers, middleware);
*/

if (localStorage.authToken) 
{
	  setAuthorizationToken(localStorage.authToken);
	  store.dispatch(setCurrentUser(jwtDecode(localStorage.authToken)));
}

export default store;