import React from "react";
import Grid from '@material-ui/core/Grid';
import {Alert, AlertTitle} from '@material-ui/lab';
import ResetPasswordForm from "./resetPasswordForm.jsx";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import queryString from "query-string";
import {Redirect} from "react-router-dom";

import {resetPasswordRequest} from "../../actions/resetPasswordActions.jsx";
import {addAlertMessage} from "../../../actions/alertMessageActions.jsx";

class ResetPassword extends React.Component
{
	constructor(props)
	{
		super(props);
		this.params = queryString.parse(props.location.search);
		this.renderResetPasswordForm = (this.params.status != null && 
									     parseInt(this.params.status) == 1 && 
										 this.params.email !=null && 
										 this.params.name != null && 
									     this.params.token != null);
	}

	componentDidMount()
	{
		if (!this.renderResetPasswordForm)
		{
			let errorMsg = "Oops! You can only reset your password following through your email link without any modification!!";
			if (this.params.status != null && parseInt(this.params.status) == 3)
				errorMsg = "Oops! We can't find a record with the given information. Please try again!!";
			this.props.addAlertMessage({turnOn: true, type: "error", level: 2, text: errorMsg});
		}
	}
	render()
	{
		console.log("----INFO (render() of resetPassword.jsx) is called------");
		
		if (this.renderResetPasswordForm)
		{
			return (
				<Grid container>
					<Grid item xs={12}>
						{
					    	this.props.auth.isAuthenticated ?
					    			
					    	<Alert severity="warning" >
								<AlertTitle>Ooops! You forgot to logout first, please try again after.</AlertTitle>
							</Alert>
								:
							<ResetPasswordForm 
									email={this.params.email}
									name={this.params.name}
									token={this.params.token}
									resetPasswordRequest={this.props.resetPasswordRequest}
									addAlertMessage={this.props.addAlertMessage}
									{...this.props}
								/>
					    }	
					</Grid>
				</Grid>
			   );

		}
		else
		{
			return (<div><Redirect to="/myAccount/forgotPassword" /></div>);
		}
	}
}


ResetPassword.propTypes=
{
	resetPasswordRequest: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired
}
function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer
		 };
}
//connect(incoming, outgoing)(ResetPassword)
export default connect(mapStateToProps, {resetPasswordRequest, addAlertMessage})(ResetPassword);