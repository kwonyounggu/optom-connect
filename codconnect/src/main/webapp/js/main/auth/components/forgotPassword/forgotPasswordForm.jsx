import React from "react";
import {Link} from "react-router-dom";
import {Form, FormGroup, FormControl, HelpBlock, Button, Alert} from "react-bootstrap";

import {PropTypes} from "prop-types";
import FieldGroup from "../../../components/common/fieldGroup.jsx";
import queryString from "query-string";

import validator from "validator";
import isEmpty from "lodash/isEmpty";

import {siteKey} from "../../../utils/utils.jsx";
import Recaptcha from "react-recaptcha";

class ForgotPasswordForm extends React.Component
{
	constructor(props)
	{
		super(props);
		
		this.state =
		{
			email: "",
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
		if (validator.isEmpty(this.state.email)) 
		{
		    errors.email = "This field is required.";
		}
		else if (!validator.isEmail(this.state.email)) 
		{
		    errors.email = "Email is invalid.";
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
		console.log("---INFO (onSubmit() of forgotPasswordForm.jsx) is called---, ",this.state);
		
		if(this.isValid())
		{
			this.setState({errors: {}, isLoading: true});
			
			this.props.forgotPasswordRequest(this.state).then
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
						this.props.addAlertMessage
						(
							{
								type: "success",
								text: "Please check your email for the password reset link."
							}
						);
						this.context.router.history.push("/");
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
	
	render()
	{
		return (<div>forgot form</div>);
	}
	renderOrg()
	{	
		return(
				<Form onSubmit={this.onSubmit}>
					<h1>Forgot Password?</h1>
					{this.state.errors.serverAPI && 
						<Alert bsStyle="danger" >
							<h4>{this.state.errors.serverAPI.split(":::")[0]}</h4>
							<h6>{this.state.errors.serverAPI.split(":::")[1]}</h6>
						</Alert>
					}

					<h4>Enter your email, then we'll email you a password reset link.</h4>
					<FieldGroup
						id="email"
					 	type="email"
					    label="Email"
						value={this.state.email}
						name="email"
					    placeholder="example@example.com"
						onChange={this.onChange}
						help={this.state.errors.email}
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
					<FormGroup >
						<Link to="/login">Back to Login?</Link>
					</FormGroup>
				</Form>
			  );
	}
}
ForgotPasswordForm.propTypes =
{
		forgotPasswordRequest: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired
};
//This allows to use this.context.router...
ForgotPasswordForm.contextTypes =
{
		router: PropTypes.object.isRequired
};
export default ForgotPasswordForm;

