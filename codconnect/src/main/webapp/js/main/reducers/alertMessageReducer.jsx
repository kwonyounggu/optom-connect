import ActionTypes from "../actions/actionTypes.jsx";

//Note level==1 permanent alert until it is resolved
//     level==2 tempoary alert until a menu routing is changed
export default (state={}, action={}) =>
{
	console.log("INFO: alertMessageReducer(",state,", ",action,")");
	switch(action.type)
	{
		case ActionTypes.ADD_ALERT_MESSAGE:
		{
			state = {...state, turnOn: action.payload.turnOn, type: action.payload.type, level: action.payload.level, text: action.payload.text};
			break;
		}
		default: break;
	}
	
	return state;
}
