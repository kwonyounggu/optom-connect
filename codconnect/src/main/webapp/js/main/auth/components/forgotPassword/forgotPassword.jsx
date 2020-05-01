import React from "react";
import {Container, Row, Col, Alert} from "react-bootstrap";
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
		console.log("----INFO (render() of forgotPassword.jsx) is called------");
		
		return (
				<Container>
					<Row>
						<Col md={4} mdOffset={4} >
						{
					    	this.props.auth.isAuthenticated ?
					    			
					    	<Alert bsStyle="danger" >
								<h4>Ooops! You forgot to logout first, please try again after.</h4>
							</Alert>
								:
							<ForgotPasswordForm 
								forgotPasswordRequest={this.props.forgotPasswordRequest}
								addAlertMessage={this.props.addAlertMessage}
								{...this.props.location}
						    />
					    }	
						</Col>
					</Row>
				</Container>
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

