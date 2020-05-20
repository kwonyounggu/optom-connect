import ActionTypes from "../actions/actionTypes.jsx";

export default (state={}, action={}) =>
{
	console.log("INFO: alertMessageReducer(",state,", ",action,")");
	switch(action.type)
	{
		case ActionTypes.ADD_ALERT_MESSAGE:
		{
			state = {...state, turnOn: action.payload.turnOn, type: action.payload.type, text: action.payload.text};
			break;
		}
		default: break;
	}
	
	return state;
}
