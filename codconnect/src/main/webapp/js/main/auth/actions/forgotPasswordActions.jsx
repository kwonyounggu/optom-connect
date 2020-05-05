import axios from 'axios';
import {serviceHost} from "../../utils/utils.jsx";

export function forgotPasswordRequest(data) 
{
	return dispatch => 
	  {
		  return axios.post(serviceHost + "jsp/api/users/forgotPassword.jsp", data)
	  }
}