import axios from 'axios';
//import {serviceHost} from "../../utils/utils.jsx";

export function userSignupRequest(userData) 
{
	  //console.log("INFO: userSignupRequest(",userData,") is called");
	  return dispatch => 
	  {
		  return axios.post("jsp/api/users/signup.jsp", userData)
	  }
}

export function isUserExists(id, value) 
{
	  //console.log("isUserExists(",id, ", ",value,")");
	  return dispatch => 
	  {
	    return axios.get(`jsp/api/users/isUserExists.jsp?${id}=${value}`);
	  }
}