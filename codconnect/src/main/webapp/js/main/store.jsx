import {applyMiddleware, createStore, combineReducers} from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import isEmpty from "lodash/isEmpty";

import combinedReducers from "./reducers/combinedReducers.jsx";
import {setAuthorizationToken} from "./auth/utils/utils.jsx";


import jwtDecode from "jwt-decode";
import {setCurrentUser} from "./auth/actions/loginActions.jsx";

import {SET_CURRENT_USER} from './auth/actions/types.jsx';

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
		console.log("action.type is " + action.type);
		if ((action.user.exp - (Date.now()/1000)) < 5000) //if expired
		{
			//1. logout and login again
			//1. logout and get a token again
			console.log("Token expired...");
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