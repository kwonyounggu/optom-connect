import React from "react";
import {Container, Row, Col} from "react-bootstrap";
//import ResetPasswordForm from "./resetPasswordForm.jsx";
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
		console.log("INFO (constructor() of resetPassword.jsx");
	}

	render()
	{
		console.log("----INFO (render() of resetPassword.jsx) is called------");
		
		const params = queryString.parse(this.props.location.search);
		//console.log("params", params);
		if(params.status != null && parseInt(params.status) == 1 && params.email !=null && params.name != null && params.token != null)
		{
			return (
					<Container>
						<Row>
							<Col md={4} mdOffset={4} >
								{/*<ResetPasswordForm 
									email={params.email}
									name={params.name}
									token={params.token}
									resetPasswordRequest={this.props.resetPasswordRequest}
									addAlertMessage={this.props.addAlertMessage}
									{...this.props.location}
								/>*/}
							</Col>
						</Row>
					</Container>
				   );
		}
		else
		{
			let status = params.status != null ? parseInt(params.status) : -1;
			let msg = "Oops! You can only reset your password following through your email link.";
			if(status == 2)
				msg = "Oops! Resetting your password time is expired! please do again."
			else if(status == 3)
				msg = "Oops! Resetting your password is already done! please do again."
			
			this.props.addAlertMessage
			(
				{
					type: "failure",
					text: msg
				}
		    );
			return (<div><Redirect to="/forgotPassword" /></div>);
		}
		

	}
}


ResetPassword.propTypes=
{
	resetPasswordRequest: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired
}
//export default ResetPassword;
//connect(incoming, outgoing)(ResetPassword)
export default connect(null, {resetPasswordRequest, addAlertMessage})(ResetPassword);