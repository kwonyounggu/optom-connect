import {ADD_ALERT_MESSAGE, DELETE_ALERT_MESSAGE, DELETE_ALL_ALERT_MESSAGES} from "./types.jsx";

export function addAlertMessage(message)
{
	return {
				type: ADD_ALERT_MESSAGE,
				message
		   };
}

export function deleteAlertMessage(id)
{
	return {
				type: DELETE_ALERT_MESSAGE,
				id
		   };
}

export function deleteAllAlertMessages()
{
	return {
				type: DELETE_ALL_ALERT_MESSAGES
		   };
}