import {LANG_MESSAGE} from '../actions/types.jsx';

function rootReducer
(   state=
    {
		lang: "kr"
    },
    action
 )
{
    switch(action.type)
    {
    	case LANG_MESSAGE:
        {
            state={...state, lang: action.payload.lang};
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