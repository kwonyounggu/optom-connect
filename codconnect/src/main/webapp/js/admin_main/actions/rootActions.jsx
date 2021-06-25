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
export function resetClaimFileData()
{
	return { type: ActionTypes.RESET_CLAIM_FILE_DATA};
}
export function getBillingCodes() 
{
	  return { 
		  		type: ActionTypes.GET_BILLING_CODES,
		  		payload: axios.post("jsp/api/ohip/getBillingCodes.jsp", {})
	  		 };
}
export function getClaimFile(data) 
{
	  return { 
		  		type: ActionTypes.GET_CLAIM_FILE,
		  		payload: axios.post("jsp/api/ohip/getClaimFile.jsp", data)
	  		 };
}