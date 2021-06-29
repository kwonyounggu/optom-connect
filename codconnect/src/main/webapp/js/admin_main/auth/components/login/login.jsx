import React from "react";
import {Container, Row, Col, Alert} from "react-bootstrap";
import LoginForm from "./loginForm.jsx";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {setCurrentUser, loginRequest} from "../../actions/loginActions.jsx";

class Login extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		console.log("INFO [render() of login.jsx] is called: this.props, ", this.props);
		
		return (
				<Container>
					<Row>
						<Col>
				
						{
					    	this.props.auth.isAuthenticated ?
					    			
					    	<Alert valiant="warning">
								Ooops! You forgot to logout first, please try again after. 
							</Alert>
								:
							<LoginForm 
								loginRequest={this.props.loginRequest}
								setCurrentUser={this.props.setCurrentUser}
								{...this.props}
							/>
							
					    }
				
				
				
							
						</Col>
					</Row>
				</Container>
			   );

	}
}

/*<LoginForm 
								loginRequest={this.props.loginRequest}
								setCurrentUser={this.props.setCurrentUser}
								{...this.props.location}
							/>*/
Login.propTypes=
{
	loginRequest: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, {loginRequest, setCurrentUser})(Login);