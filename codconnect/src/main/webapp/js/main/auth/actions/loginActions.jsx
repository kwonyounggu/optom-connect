import axios from 'axios';
import {setAuthorizationToken} from "../utils/utils.jsx";
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from "./types.jsx";
import {deleteAllAlertMessages} from "../../actions/alertMessageActions.jsx";
import {serviceHost} from "../../utils/utils.jsx";
import https from 'https';

export function setCurrentUser(user) 
{
  return {
		    type: SET_CURRENT_USER,
		    user
		 };
}

export function logout() 
{
	  return (dispatch) => 
	  {
	    setAuthorizationToken(false);
	    dispatch(setCurrentUser({}));
	    //dispatch(deleteAllAlertMessages());
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
	console.log("[INFO IN loginRequest(..) in loginActions.jsx] axios.post(", serviceHost, "jsp/api/users/login.jsp", data, ")");
	return (dispatch) => 
	  {
		  return axios.post(serviceHost + "jsp/api/users/login.jsp", data)
	  }
}
/************************************************************************************
//To customized ssl usage
const httpsAgent = new https.Agent({
  rejectUnauthorized: false//, // (NOTE: this will disable client verification)
  //cert: fs.readFileSync("./usercert.pem"),
  //key: fs.readFileSync("./key.pem"),
  //passphrase: "YYY"
})
****************************************************************************************/
export function refreshToken(user)
{
	console.log("[INFO IN refreshToken(..) in loginActions.jsx] axios.post(", serviceHost, "jsp/api/users/refreshToken.jsp", user, ")");
	axios.post(serviceHost + "jsp/api/users/refreshToken.jsp", user).then
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
}