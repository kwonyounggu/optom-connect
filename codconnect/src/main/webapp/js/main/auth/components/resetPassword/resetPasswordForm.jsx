import React from "react";
import {Link} from "react-router-dom";
import {Form, FormGroup,  FormControl, HelpBlock, Button, Alert} from "react-bootstrap";
//import validateLoginForm from "./validateLoginForm.jsx";

import {setAuthorizationToken} from "../../utils/utils.jsx";
import {PropTypes} from "prop-types";
import FieldGroup from "../../../components/common/fieldGroup.jsx";
import jwtDecode from "jwt-decode";
import queryString from "query-string";

import validator from "validator";
import isEmpty from "lodash/isEmpty";

import {siteKey} from "../../../utils/utils.jsx";
import Recaptcha from "react-recaptcha";

/*
 * Thursday Jan-25-2018
 * Verify parameters if cheated
 * if verification failed then disable Submit button
 * */
class ResetPasswordForm extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			email: props.email,
			token: props.token,
			fullName: props.name,
		    password: "",
		    passwordConfirmation: "",
		    errors: {},
		    isLoading: false,
			invalid: false,
			isHuman: false
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.isValid = this.isValid.bind(this);
		
		this.callbackBot = this.callbackBot.bind(this);
		this.verifyCallbackBot = this.verifyCallbackBot.bind(this);
		this.expiredCallbackBot = this.expiredCallbackBot.bind(this);
	}
	
	/*
	 * Google Bot
	 */
	callbackBot()
	{
		this.setState({isHuman: false});
	}
	verifyCallbackBot(response)
	{
		this.setState({isHuman: true});
	}
	expiredCallbackBot()
	{
		this.setState({isHuman: false});
	}
	
	
	onChange(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}
	
	isValid()
	{		
		let errors = {};
		if (validator.isEmpty(this.state.password)) 
		{
		    errors.password = "This field is required.";
		}
		else if(!validator.isByteLength(this.state.password, {min: 2, max: 30}))
		{
			errors.password = "This field length requires between 2 and 30.";
		}
		  
		if (validator.isEmpty(this.state.passwordConfirmation)) 
		{
		    errors.passwordConfirmation = "This field is required.";
		}
		else if (!validator.equals(this.state.password, this.state.passwordConfirmation)) 
		{
		    errors.passwordConfirmation = "Passwords must match.";
		}
		  
		if(!this.state.isHuman)
		{
			errors.isHuman = "This field is required.";
		}
		
		let isValid = isEmpty(errors);
		if(!isValid)
		{
			this.setState({errors});
		}

		return isValid;
	}
	
	onSubmit(e)
	{
		e.preventDefault();
		//console.log("---INFO (onSubmit() of resetPassword.jsx) is called---, ",this.state);
		
		if(this.isValid())
		{
			this.setState({errors: {}, isLoading: true});
			this.props.resetPasswordRequest(this.state).then
			(
				(response) =>
				{
					console.log("successful, the response object=",response);
					if(response.data.invalid)
					{
						this.setState({errors: response.data.errors, isLoading: false});
					}
					else
					{
						//setAuthorizationToken(response.data.token);
						//this.props.setCurrentUser(jwtDecode(response.data.token));
						this.props.addAlertMessage
						(
							{
								type: "success",
								text: "You updated your new password successfully!"
							}
						);
						this.context.router.history.push("/login");
					}
				}
			).
			catch
			(
				(error) =>			
				{
					/*show this error in a page or a top of the current page - Oct-19-2017*/
					/*this error consists of an html page cotents*/
					console.log("ERROR: ", error);
					this.setState({isLoading: false, errors: {serverAPI: error+":::"}});
				}
			);
		}
	}
/**
 * Note display Hi, Someone you can reset ..., when submitted provide token back to server to prevent cheating
 */
    render()
	{
		return (<div>reset form</div>);
	}
	renderOrg()
	{	
		return(
				<Form onSubmit={this.onSubmit}>
					<h1>Reset Password?</h1>
					{this.state.errors.serverAPI && 
						<Alert bsStyle="danger" >
							<h4>{this.state.errors.serverAPI.split(":::")[0]}</h4>
							<h6>{this.state.errors.serverAPI.split(":::")[1]}</h6>
						</Alert>
					}
					<h4>Hi {this.props.name}, you may now set your new password!</h4>

					<FieldGroup
						id="password"
					 	type="password"
					    label="Password"
						value={this.state.password}
						name="password"
					    placeholder="Enter your password"
						onChange={this.onChange}
						help={this.state.errors.password}
				    />
					<FieldGroup
						id="passwordConfirmation"
					 	type="password"
					    label="Password Confirmation"
						value={this.state.passwordConfirmation}
						name="passwordConfirmation"
					    placeholder="Enter your password again"
						onChange={this.onChange}
						help={this.state.errors.passwordConfirmation}
					/>
					<FormGroup  validationState= "error">
				      <Recaptcha    	
						sitekey={siteKey}
						render="explicit"
						verifyCallback={this.verifyCallbackBot}
						onloadCallback={this.callbackBot}
						expiredCallback={this.expiredCallbackBot}
						size="compact"
					   />
				      <ControlLabel>{this.state.errors.isHuman ? this.state.errors.isHuman:""}</ControlLabel>
					</FormGroup>
					<FormGroup >
						<Button disabled={this.state.isLoading} type="submit">Submit</Button>
					</FormGroup>
				</Form>
			  );
	}
}
ResetPasswordForm.propTypes =
{
		resetPasswordRequest: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired
};
//This allows to use this.context.router...
ResetPasswordForm.contextTypes =
{
		router: PropTypes.object.isRequired
};
export default ResetPasswordForm;