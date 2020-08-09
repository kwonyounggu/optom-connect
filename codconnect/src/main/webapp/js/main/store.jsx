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
import {addAlertMessage} from "./actions/alertMessageActions.jsx";

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
	console.log("[INFO in store.jsx] user: ", user, " | token expire time: " + new Date(user.exp * 1000) +" | current time: " + new Date());
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
		//console.log("[BEFORE axios request] config: ", config);
	    return config;
	}, 
	(error) =>
	{
	    // Do something with request error
		//console.log("[BEFORE axios request] error: ", error);
	    return Promise.reject(error);
	}
);
/*
validateStatus: function (status) {
    return status >= 200 && status < 300; // default in axios
  },
*/
axios.interceptors.response.use
(
    (response) => 
    {
		console.log("[INFO in axios.interceptors.response.use] response: ", response);
		if (response.status == 200)
		{
			if (typeof response.data === "object")
			{
				if (response.data.hasOwnProperty('isItValid') && !response.data.isItValid)
				{
					store.dispatch(addAlertMessage({turnOn: true, type: "error", level: 2, text: response.data.errorMessage}));
				}
				else if (response.data.hasOwnProperty('invalid') && response.data.invalid && response.data.errors.hasOwnProperty('serverAPI'))
				{
					let errorMsg = "There exists an error in that ", count = 0;
					for (const [key, value] of Object.entries(response.data.errors)) 
					{
						count++;
					    errorMsg += "("+count+") " + `${key}: ${value}` + " ";
					}
					store.dispatch(addAlertMessage({turnOn: true, type: "error", level: 2, text: errorMsg}));
				}
				else //result data comes here
				{
					store.dispatch(addAlertMessage({turnOn: false, type: "success", level: 2, text: ""}));
				}
			}
		}
		else if (response.status < 200 || response.status > 300)
		{
			//do something
			//return Promise.reject("There is an error having a status such as ...")
			console.log("[INFO 200>status>300] status: ", response.status);
			store.dispatch(addAlertMessage({turnOn: true, type: "error", level: 2, text: "Communication response status is not normal due to the status code, " + response.status}));
		}
			
        return response;
    },
    (error) => 
	{
        if (!error.response) 
		{
            //console.log("[INFO Please check your internet connection] error: ", error);
			store.dispatch(addAlertMessage({turnOn: true, type: "error", level: 2, text: "Oops, the server connection is failed, -- Check & try it later!"}));
        }

		return Promise.reject(error);
		//return Promise.resolve({error});
    }
);



export default store;