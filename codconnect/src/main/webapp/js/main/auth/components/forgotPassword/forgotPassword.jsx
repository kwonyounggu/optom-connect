import React from "react";
import Grid from '@material-ui/core/Grid';
import {Alert, AlertTitle} from '@material-ui/lab';

import ForgotPasswordForm from "./forgotPasswordForm.jsx";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import {forgotPasswordRequest} from "../../actions/forgotPasswordActions.jsx";
import {addAlertMessage} from "../../../actions/alertMessageActions.jsx";

class ForgotPassword extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO (constructor() of forgotPassword.jsx");
	}
	
	render()
	{
		//console.log("----INFO (render() of forgotpassowrd.jsx) is called------");
		
		return (
				<Grid container>
					<Grid item xs={12}>
				
						{
					    	this.props.auth.isAuthenticated ?
					    			
					    	<Alert severity="warning" >
								<AlertTitle>Ooops! You forgot to logout first, please try again after.</AlertTitle>
							</Alert>
								:
							<ForgotPasswordForm 
								forgotPasswordRequest={this.props.forgotPasswordRequest}
								addAlertMessage={this.props.addAlertMessage}
								{...this.props}
						    />
					    }
				
				
				
							
					</Grid>
				</Grid>
			   );

	}
}


ForgotPassword.propTypes=
{
	forgotPasswordRequest: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}
function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer
		 };
}
//connect(incoming, outgoing)(ForgotPassword)
export default connect(mapStateToProps, {forgotPasswordRequest, addAlertMessage})(ForgotPassword);

