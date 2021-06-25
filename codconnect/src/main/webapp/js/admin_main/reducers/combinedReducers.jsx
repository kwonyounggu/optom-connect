/*
 * This will combine all reducers for the app
 * */
import {combineReducers} from "redux";

import alertMessageReducer from "./alertMessageReducer.jsx";
import authReducer from "../auth/reducers/authReducer.jsx";
import rootReducer from "./rootReducer.jsx";

export default combineReducers
(
	{
		alertMessageReducer,
		authReducer,
		rootReducer
	}
);