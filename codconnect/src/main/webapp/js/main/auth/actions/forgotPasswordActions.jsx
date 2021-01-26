import axios from 'axios';

export function forgotPasswordRequest(data) 
{
	return dispatch => 
	  {
		  return axios.post("jsp/api/users/forgotPassword.jsp", data)
	  }
}