import React from "react";
import {Container, Row, Col, Alert} from "react-bootstrap";
import LoginForm from "./loginForm.jsx";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {setCurrentUser, loginRequest} from "../../actions/loginActions.jsx";
import {addAlertMessage} from "../../../actions/alertMessageActions.jsx";

class Login extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO (constructor() of login.jsx, this.props: ", this.props);
	}
	
	render()
	{
		console.log("----INFO (render() of login.jsx) is called------");
		
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
							<LoginForm 
								loginRequest={this.props.loginRequest}
								addAlertMessage={this.props.addAlertMessage}
								setCurrentUser={this.props.setCurrentUser}
								{...this.props.location}
							/>
					    }
				
				
				
							
						</Col>
					</Row>
				</Container>
			   );

	}
}


Login.propTypes=
{
	loginRequest: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, {loginRequest, addAlertMessage, setCurrentUser})(Login);