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

axios.defaults.baseURL = 'https://173.206.1.161:8443/';
//axios.defaults.baseURL = 'https://localhost:8443/';
/*
https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
 */