import axios from 'axios';
import {LANG_MESSAGE} from "./types.jsx";
import {setLang} from "../utils/utils.jsx";

export function notifyLang(lang) 
{
  return {
		    type: LANG_MESSAGE,
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