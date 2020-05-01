import {ADD_ALERT_MESSAGE, DELETE_ALERT_MESSAGE, DELETE_ALL_ALERT_MESSAGES} from "../actions/types.jsx";
import shortid from "shortid";
import findIndex from "lodash/findIndex";
export default (state=[], action={}) =>
{
	console.log("INFO: alertMessageReducer(",state,", ",action,")");
	switch(action.type)
	{
		case ADD_ALERT_MESSAGE:
			 return [
			        	...state,
			        	{
			        		id: shortid.generate(),
			        		type: action.message.type,
			        		text: action.message.text
			        	}
			       ];
			 
		case DELETE_ALERT_MESSAGE:
			 const index = findIndex(state, {id: action.id});
			 if(index >= 0)
			 {
				 //1st slice is to put before id
				 //2nd slice is to put after id
				 //so the id portion obj will be gone
				 return [
				         	...state.slice(0, index),
				         	...state.slice(index + 1)
				        ];
			 }
			 return state;
		case DELETE_ALL_ALERT_MESSAGES:
			 return [];
		default: return state;
	}
}