import axios from 'axios';

export function setAuthorizationToken(token) 
{
	  if (token) 
	  {
		  localStorage.setItem("authTokenForAdmin", token);
		  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	  } 
	  else 
	  {
		  localStorage.removeItem('authTokenForAdmin');
		  delete axios.defaults.headers.common['Authorization'];
	  }
}

//PRODUCTION
//axios.defaults.baseURL = 'https://od.webmonster.ca/';

//DEVELOPMENT
//axios.defaults.baseURL = 'https://localhost:8443/';
axios.defaults.baseURL = 'https://192.168.1.3:8443/';

/*
https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
 */