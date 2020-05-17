import axios from 'axios';

export function setAuthorizationToken(token) 
{
	  if (token) 
	  {
		  localStorage.setItem("authToken", token);
		  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	  } 
	  else 
	  {
		  localStorage.removeItem('authToken');
		  delete axios.defaults.headers.common['Authorization'];
	  }
}

axios.defaults.baseURL = 'https://192.168.1.81:8443/';

/*
https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
 */