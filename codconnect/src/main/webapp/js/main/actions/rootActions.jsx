import axios from "axios";
import ActionTypes from "./actionTypes.jsx";
import {setLang} from "../utils/utils.jsx";

export function notifyLang(lang) 
{
  return {
		    type: ActionTypes.LANG_MESSAGE,
		    payload: {lang: lang}
		 };
}
export function changeLang(lang)
{
	return dispatch => 
	{
	    setLang(lang);
	    dispatch(notifyLang(lang));
	};
}
export function convertMroToCSV(formData) 
{
	  return { 
		  		type: ActionTypes.CONVERT_MRO_FILE,
		  		payload: axios.post("upload", formData)
	  		 };
}
export function resetMROData()
{
	return { type: ActionTypes.RESET_MRO_DATA};
}