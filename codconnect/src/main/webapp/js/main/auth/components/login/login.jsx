import React from "react";
import Grid from '@material-ui/core/Grid';
import {Alert, AlertTitle} from '@material-ui/lab';
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
				<Grid container>
					<Grid item xs={12}>
				
						{
					    	this.props.auth.isAuthenticated ?
					    			
					    	<Alert severity="warning" >
								<AlertTitle>Ooops! You forgot to logout first, please try again after.</AlertTitle>
							</Alert>
								:
							<LoginForm 
								loginRequest={this.props.loginRequest}
								addAlertMessage={this.props.addAlertMessage}
								setCurrentUser={this.props.setCurrentUser}
								{...this.props.location}
							/>
					    }
				
				
				
							
					</Grid>
				</Grid>
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