import React from "react";
import Grid from '@material-ui/core/Grid';
import {Alert, AlertTitle} from '@material-ui/lab';

//import {Container, Row, Col, Alert} from "react-bootstrap";

import SignupForm from "./signupForm.jsx";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {userSignupRequest, isUserExists} from "../../actions/signupActions.jsx";
import {setCurrentUser} from "../../actions/loginActions.jsx";
import {addAlertMessage} from "../../../actions/alertMessageActions.jsx";

class Signup extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO (constructor() of signup.jsx");
	}
	render()
	{
		console.log("----INFO (render() of signup.jsx) is called, authenticated: ", this.props.auth.isAuthenticated, "------");
		
		return (
				<Grid container>
					<Grid item xs={12}>
				
						{
					    	this.props.auth.isAuthenticated ?
					    			
					    	<Alert severity="warning" >
								<AlertTitle>Ooops! You forgot to logout first, please try again after.</AlertTitle>
							</Alert>
								:
							<SignupForm 
								isUserExists={this.props.isUserExists}
								userSignupRequest={this.props.userSignupRequest}
								addAlertMessage={this.props.addAlertMessage}
								setCurrentUser={this.props.setCurrentUser}
								{...this.props}
							/>
					    }
				
				
				
							
					</Grid>
				</Grid>
			   );

	}
}


Signup.propTypes=
{
	userSignupRequest: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}
function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer
		 };
}
//connect(incoming, outgoing)(Signup)
export default connect(mapStateToProps, {userSignupRequest, addAlertMessage, isUserExists, setCurrentUser})(Signup);