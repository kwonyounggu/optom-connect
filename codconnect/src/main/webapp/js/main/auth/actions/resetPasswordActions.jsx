import axios from 'axios';
//import {serviceHost} from "../../utils/utils.jsx";

export function resetPasswordRequest(data) 
{
	return dispatch => 
	  {
		  return axios.post("jsp/api/users/resetPassword.jsp", data)
	  }
}