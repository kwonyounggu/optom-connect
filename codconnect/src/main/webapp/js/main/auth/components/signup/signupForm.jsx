import React from "react";
import {Form, FormGroup,  FormControl, HelpBlock, Button, Alert} from "react-bootstrap";

import timezones from "../../data/timezones.jsx";
import {PropTypes} from "prop-types";
import map from "lodash/map";
import validateSignupForm from "./validateSignupForm.jsx";

import validator from "validator";
import FieldGroup from "../../../components/common/fieldGroup.jsx";
import TermsConditionsModal from "../../../components/common/termsConditionsModal.jsx";
import isEmpty from "lodash/isEmpty";
import {FullNameKoreanPlaceholder, siteKey} from "../../../utils/utils.jsx";
import jwtDecode from "jwt-decode";

import Recaptcha from "react-recaptcha";

class SignupForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			fullName: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			timezone: "",
			errors: {},
			isLoading: false,
			invalid: false,
			isHuman: false,
			showModal: false
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.isValid = this.isValid.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
		
		this.callbackBot = this.callbackBot.bind(this);
		this.verifyCallbackBot = this.verifyCallbackBot.bind(this);
		this.expiredCallbackBot = this.expiredCallbackBot.bind(this);
		
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
		this.onTermsFocus = this.onTermsFocus.bind(this);
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
	/*
	 * Modal to open or close Terms and Conditions
	 */
	onOpenModal(e)
	{
		e.preventDefault();
		this.setState({showModal: true});
	}
	onCloseModal(e)
	{
		e.preventDefault();
		this.setState({showModal: false});
	}
	/**
	 * Automatically defocus it so that there will be no square box of the focus.
	 * Ref: jamesknelson.com/react-js-by-example-interacting-with-the-dom
	 */
	onTermsFocus(e)
	{
		e.preventDefault();
		this.refs.terms.blur();
	}
	/*
	 * 
	 * Main functions to implement core actions of this component
	 */
	onChange(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}
	
	isValid()
	{		
		const {errors, isValid} = validateSignupForm(this.state);
		if(!isValid)
		{
			this.setState({errors});
		}

		console.log(errors);
		return isValid;
	}
	
	//Based on only email field
	checkUserExists(e)
	{
		const field = e.target.name;
		const val = e.target.value;
		
		
		if(!validator.isEmpty(val) && validator.isEmail(val))
		{
			
			this.props.isUserExists("email", val).then
			(
					(response) =>
					{
						console.log("successful, the response object=",response);
						//Here, it is already justified if the user is in the list... why one more validation with if-statement?
						let errors = this.state.errors;
						let invalid;
						if(response.data.error)
						{
							errors[field] = response.data.error;
							//invalid = true;
						}
						else if(response.data.isUserExists)
						{
							errors[field] = "There already exists the same user email.";
							//invalid = true;
						}
						else
						{
							errors[field] = "";
							//invalid = false;
						}
						this.setState({errors});
						
					}
			).
			catch
			(
				(error) =>			
				{
					console.log("ERROR: ", error);
					//do display AlertMessage on top of the page
				}
			);			
		}
	}
	
	onSubmit(e)
	{
		e.preventDefault();
		console.log("---INFO (onSubmit() of signupForm.jsx) is called---, ",this.state);
		
		if(this.isValid())
		{
			this.setState({errors: {}, isLoading: true});
			this.props.userSignupRequest(this.state).then
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
								text: "Thanks for sining up. Please check your email for confirmation!!"
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
		return (<div>signup form</div>);
	}
	renderOrg()
	{
		//const {errors} = this.state;
		const options = map(timezones, (val, key) => <option key={val} value={val}>{key}</option>);
		
		return(
				<Form onSubmit={this.onSubmit}>
					<h1>Join our community!</h1>
					{this.state.errors.serverAPI && 
						<Alert bsStyle="danger" >
							<h4>{this.state.errors.serverAPI.split(":::")[0]}</h4>
							<h6>{this.state.errors.serverAPI.split(":::")[1]}</h6>
						</Alert>
					}
					<FieldGroup
						id="fullName"
					 	type="text"
					    label="Full Name"
						value={this.state.fullName}
						name="fullName"
					    placeholder={FullNameKoreanPlaceholder}
						onChange={this.onChange}
						help={this.state.errors.fullName}
				    />
					<FieldGroup
						id="email"
					 	type="email"
					    label="Email"
						value={this.state.email}
						checkUserExists={this.checkUserExists}
						name="email"
					    placeholder="example@example.com"
						onChange={this.onChange}
						help={this.state.errors.email}
					/>
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
					<FormGroup validationState={this.state.errors.timezone ? "error": null}>
				      <ControlLabel>Timezone</ControlLabel>
				      <FormControl componentClass="select" value={this.state.timezone} name="timezone" onChange={this.onChange} placeholder="Choose your timezone">
				      	<option value="" disabled>Choose Your Timezone</option>
				      	{options}
				      </FormControl>
				    </FormGroup>
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
				      	<div>By clicking Sign Up, I agree to the <a href="#" onClick={this.onOpenModal} ref="terms" onFocus={this.onTermsFocus}>Terms and Conditions</a>.
				      	</div>
						<Button disabled={this.state.isLoading} type="submit">Sign Up</Button>
						<TermsConditionsModal {...this.props} show={this.state.showModal} onHide={this.onCloseModal} />

					</FormGroup>
				</Form>
			  );
	}
}
SignupForm.propTypes =
{
		userSignupRequest: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired,
		isUserExists: PropTypes.func.isRequired,
		setCurrentUser: PropTypes.func.isRequired
};
//This allows to use this.context.router...
SignupForm.contextTypes =
{
		router: PropTypes.object.isRequired
};
export default SignupForm;