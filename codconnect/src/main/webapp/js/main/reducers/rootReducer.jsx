import ActionTypes from '../actions/actionTypes.jsx';

function rootReducer
(   state=
    {
		lang: "kr",
		billingCodes: (localStorage.getItem("billingCodes") ? JSON.parse(localStorage.getItem("billingCodes")) : null),
		ohipClaimList: [{}],
		careProviderNumber: '',
		claimFile: null
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
		case ActionTypes.RESET_MRO_DATA://being called whenever the raReport, claimError report, etc are left from its pages.
		{
			state={...state, convertFetching: false, convertFetched: false, data: null};
			break;	
		}
		case ActionTypes.GET_BILLING_CODES_FULFILLED: //for both Promise and Thunk
    	{   		
			if (action.payload.data.isItValid)
    		{
				localStorage.setItem("billingCodes", JSON.stringify(action.payload.data));
				state={...state, billingCodes: action.payload.data};
			}
			else
			{
				let billingCodes = localStorage.getItem("billingCodes");
 				state={...state, billingCodes: (billingCodes ? JSON.parse(billingCodes) : null)};
			}
            break;
    	}
		case ActionTypes.GET_CLAIM_FILE_FULFILLED: //for both Promise and Thunk
    	{   		
			if (action.payload.data.isItValid)
    			state={...state, ohipClaimList: [{}], careProviderNumber: '', claimFile: action.payload.data};
		    else
			{
				let prevClaimData = JSON.parse(localStorage.getItem("claimFileData"));
				state={...state, ohipClaimList: prevClaimData.ohipClaimList, careProviderNumber: prevClaimData.careProviderNumber, claimFile: action.payload.data};
            }
			break;
    	}
		case ActionTypes.RESET_CLAIM_FILE_DATA: //for both Promise and Thunk
    	{   		
    		state={...state, claimFile: null};
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