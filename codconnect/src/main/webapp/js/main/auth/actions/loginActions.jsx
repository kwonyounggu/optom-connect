import axios from 'axios';
import {setAuthorizationToken} from "../utils/utils.jsx";
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from "./types.jsx";
import {deleteAllAlertMessages} from "../../actions/alertMessageActions.jsx";
import {serviceHost} from "../../utils/utils.jsx";

export function setCurrentUser(user) 
{
  return {
		    type: SET_CURRENT_USER,
		    user
		 };
}

export function logout() 
{
	  return dispatch => 
	  {
	    setAuthorizationToken(false);
	    dispatch(setCurrentUser({}));
	    dispatch(deleteAllAlertMessages());
	  };
}

export function login(data) 
{
	  return dispatch => 
	  {
	    return axios.post('/api/auth', data).then(res => 
	    {
	      setAuthorizationToken(res.data.token);
	      dispatch(setCurrentUser(jwtDecode(res.data.token)));
	    });
	  };
}

export function loginRequest(data) 
{   //console.log("[INFO IN loginRequest(..) in loginActions.jsx] axios.post(", serviceHost, "jsp/api/users/login.jsp)");
	console.log("[INFO IN loginRequest(..) in loginActions.jsx] axios.post(", serviceHost, "jsp/api/users/login.jsp", data, ")");
	return dispatch => 
	  {
		  return axios.post(serviceHost + "jsp/api/users/login.jsp", data)
	  }
}