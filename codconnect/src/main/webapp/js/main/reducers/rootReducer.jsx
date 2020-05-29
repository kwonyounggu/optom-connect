import ActionTypes from '../actions/actionTypes.jsx';

function rootReducer
(   state=
    {
		lang: "kr"
    },
    action
 )
{
	console.log("[INFO rootReducer() of rootReducer.jsx] action: ", action);
    switch(action.type)
    {
    	case ActionTypes.LANG_MESSAGE:
        {
            state={...state, lang: action.payload.lang};
            break;
        }
    	case ActionTypes.CONVERT_MRO_FILE_PENDING://only for Promise while bringing data from the server
    	{
    		state={...state, convertFetching: true, convertFetched: false};
            break;
    	}
    	case ActionTypes.CONVERT_MRO_FILE_FULFILLED: //for both Promise and Thunk
    	{   		
    		state={...state, convertFetching: false, convertFetched: true, data: action.payload.data};
            break;
    	}
    	case ActionTypes.CONVERT_MRO_FILE_REJECTED: //for both Promise and Thunk
    	{
			state={...state, convertFetching: false, convertFetched: false, error: action.payload};
            break;
    	}
        default: 
        {
            break;
        }
    }
    
    return state;
}

export default rootReducer;