import ActionTypes from "./actionTypes.jsx";

//message={text: "",  type: "error/warning/success", turnOn: true/false}
export function addAlertMessage(message)
{
	return {
				type: ActionTypes.ADD_ALERT_MESSAGE,
				payload: message
		   };
}
