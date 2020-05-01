import {applyMiddleware, createStore, combineReducers} from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

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
	  setAuthorizationToken(localStorage.authToken);
	  store.dispatch(setCurrentUser(jwtDecode(localStorage.authToken)));
}

export default store;