import React from "react";
import {Link} from "react-router-dom";
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Alert} from "react-bootstrap";
import validateLoginForm from "./validateLoginForm.jsx";

import {setAuthorizationToken} from "../../utils/utils.jsx";
import {PropTypes} from "prop-types";
import FieldGroup from "../../../components/common/fieldGroup.jsx";

import jwtDecode from "jwt-decode";
import queryString from "query-string";

import FacebookLogin from "react-facebook-login";

/**
 * import {GoogleLogin} from "react-google-login-component";
 * You can try after you have a domain name being used and change Javascript origin to http://www.webmonster.ca.
 * <div>
									
		<GoogleLogin
			socialId="869020433257-fqniiehh44o63gisnbe1dchnopfnfeop.apps.googleusercontent.com"
			buttonText="Login With Google"
			responseHandler={this.googleResponse}
			scope="profile"
			fetchBasicProfile={false}
			className="google-login"
		/>
						
	</div>
 */

class LoginForm extends React.Component
{
	constructor(props)
	{
		super(props);
		const params = queryString.parse(props.search);

		this.state =
		{
			email: params.email ? params.email : "",
		    password: "",
		    errors: {},
		    isLoading: false,
			invalid: false
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.isValid = this.isValid.bind(this);
		
		this.facebookResponse = this.facebookResponse.bind(this);
		this.facebookClick = this.facebookClick.bind(this);
		
		console.log("[INFO] in main/auth/components/login/loginForm.jsx -> constructor(..), this.props: ", this.props);
	}
		
	facebookResponse(response)
	{
		console.log("[INFO] in main/auth/components/login/loginForm.jsx -> facebookResponse(", response, ") provided by facebook");
		console.log("[INFO] in main/auth/components/login/loginForm.jsx -> facebookResponse(..), this.props: ", this.props);
		/* reverse andongkorea
		 * accessToken: "EAASwivhODs4BACb6A3F7i54yQXLyDoOpHU1W0ni1MRdesYCrWPziv2ecGhWT76fWL5UyddAOPwRRdaCTKP3Sz5ugPKpPNlFqVCzyqdoTaGUqvAhudjh7R5ED70hhIAPgZCBoMS8VbNvxA8WEaLnFTmvONhNS088YtViiOeBa1MICPKvy5VNB5A7H1cPp34KmrcnrMPwZDZD"
		 * email: "kwon_younggu@yahoo.ca"
		 * expiresIn: 5857
		 * id: "1786579271352860"
		 * name: "Younggu Kwon"
		 * picture:
		 * 		data:
		 * 			heigth: 50
		 * 			width: 50
		 * 			ur;: ""
		 * 		signedRequest: ""
		 * 		userId: "same id as in id above"
		 * status: not_authorized if not continued
		 * */
		
		if(response.email !=null && response.id != null && response.name != null)
		{
			let snsUser = {
								snsProvider: "FACEBOOK",
								snsId: response.id,
								name: response.name,
								email: response.email,
								errors: {}
						   };
			this.props.loginRequest(snsUser).then
			(
				(response) =>
				{
					console.log("successful SNS Login, the response object=",response);
					
					if(response.data.invalid)
					{
						this.setState({errors: response.data.errors, isLoading: false});
					}
					else
					{
						setAuthorizationToken(response.data.token);
						
						this.props.setCurrentUser(jwtDecode(response.data.token));
						this.props.addAlertMessage
						(
							{
								type: "success",
								text: "You logged in successfully. Welcome!"
							}
						);
						//this.context.router.history.push("/");
						this.props.from ? this.context.router.history.push(this.props.from.pathname):
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
		else
		{
			this.setState({isLoading: false});
		}
	}

	facebookClick(e)
	{
		console.log("facebookClick: ",e);
		this.setState({errors: {}, isLoading: true});
	}
	
	
	onChange(e)
	{
		this.setState({[e.target.name]: e.target.value});
	}
	
	isValid()
	{		
		
		const {errors, isValid} = validateLoginForm(this.state);
		if(!isValid)
		{
			this.setState({errors});
		}

		return isValid;
	}
	
	onSubmit(e)
	{
		e.preventDefault();
		console.log("INFO-1 (onSubmit() of loginForm.jsx) is called, ",this.state);
		
		if(this.isValid())
		{
			//this.setState({errors: {}, isLoading: true}, () => console.log("INFO-2 (onSubmit() of loginForm.jsx) is called, ", this.state));
			this.setState
			(
				{errors: {}, isLoading: true}, 
				() => 
				{
					this.props.loginRequest(this.state).then
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
								setAuthorizationToken(response.data.token);
								
								this.props.setCurrentUser(jwtDecode(response.data.token));
								this.props.addAlertMessage
								(
									{
										type: "success",
										text: "You logged in successfully. Welcome!"
									}
								);
								this.props.from ? this.context.router.history.push(this.props.from.pathname):
												  this.context.router.history.push("/");
							}
						}
					).
					catch /* Without returning a response object */
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
			);
		}
	}
	
	render()
	{	
		return(
				<div>
					<Form onSubmit={this.onSubmit}>
						<h1>Login</h1>
						{this.state.errors.serverAPI && 
							<Alert bsStyle="danger" >
								<h4>{this.state.errors.serverAPI.split(":::")[0]}</h4>
								<h6>{this.state.errors.serverAPI.split(":::")[1]}</h6>
							</Alert>
						}
						<h4>Login with your social media account or email address</h4>
						
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
						<FormGroup >
							<Button disabled={this.state.isLoading} type="submit">Login</Button>
						</FormGroup>
						<FormGroup >
							<Link to="/signup">Signup Now</Link>
							{" | "}
							<Link to="/forgotPassword">Forgot password?</Link>
						</FormGroup>
					</Form>
					<div>
						<FacebookLogin
							appId="1320010824683214"
							autoLoad={false}
							reAuthenticate={false}
							textButton="Login With Facebook"		
							fields="name,email,picture"
							callback={this.facebookResponse}
							onClick={this.facebookClick}
							icon="fa-facebook"
						/>
					</div>
					
				</div>
			  );
	}
}
LoginForm.propTypes =
{
		loginRequest: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired,
		setCurrentUser: PropTypes.func.isRequired
};
//This allows to use this.context.router...
LoginForm.contextTypes =
{
		router: PropTypes.object.isRequired
};
export default LoginForm;