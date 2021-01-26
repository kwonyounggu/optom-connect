import axios from 'axios';
import {setAuthorizationToken} from "../utils/utils.jsx";
import ActionTypes from "../../actions/actionTypes.jsx";

//import https from 'https';

export function setCurrentUser(user) 
{
  return {
		    type: ActionTypes.SET_CURRENT_USER,
		    user
		 };
}

export function logout() 
{
	  return (dispatch) => 
	  {
	    setAuthorizationToken(false);
	    dispatch(setCurrentUser({}));
	  };
}

/*
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
*/
export function loginRequest(data) 
{   
	console.log("[INFO IN loginRequest(..) in loginActions.jsx] axios.post(jsp/api/users/login.jsp", data, ")");
	return (dispatch) => 
	  {
		  return axios.post("jsp/api/users/login.jsp", data)
	  }
}
