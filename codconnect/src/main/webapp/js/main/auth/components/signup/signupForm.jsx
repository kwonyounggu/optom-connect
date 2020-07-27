import React from "react";
//import {Form, FormGroup,  FormControl, HelpBlock, Button, Alert} from "react-bootstrap";

import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
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

import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import { green } from '@material-ui/core/colors';

import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {StyledBreadcrumb} from "../../../components/common/styledBreadcrumb.jsx";

import TermsCondition from "../../../data/termsfeed-privacy-policy-html-english.html";

const styles = (theme) =>
({
	paper:
	{
		backgroundColor: '#fcfaf5',
		padding: '10px 25px 10px 25px'
	},
	buttonProgress: 
	{
	    color: green[500],
	    position: 'absolute',
	    top: '50%',
	    left: '50%',
	    marginTop: -12,
	    marginLeft: -12,
	},
	select:
	{
		borderRadius: '0px',
		paddingTop: '3px',
		paddingBottom: '3px',
		width: '40%',
		fontSize: '13px'
	},
	selectInput: 
	{
	    padding: "2px 5px"
	}
});

export const MyBreadcrumbs = (props) => 
{
	//console.info("MyBreadscrumbs: props, ", props.location.pathname);
	let path = props.location.pathname.split("\/");
    return (
		    <Breadcrumbs aria-label="breadcrumb" maxItems={2}>
				{
					path.map
					(
						(item, i) =>
						(
						   (i == 0) ? 
								<StyledBreadcrumb key={i} component="a" href="/" label="Home" icon={<HomeIcon fontSize="small" />}/> : 
								<StyledBreadcrumb key={i} component="a" href={props.location.pathname.substring(0, props.location.pathname.indexOf(item)+item.length)} label={item}/>
						)
					)
				}
		    </Breadcrumbs>
		  );
}
//msp: https://www.dr-bill.ca/knowledgebase/what-is-a-msp-billing-number-versus-a-msp-payee-number
const provinceInfo =
[
	{value: 'BC', label: 'British Columbia', providerDesc: 'MSP Practitioner/Billing Number', placeholder: "Five digits required"},
	{value: 'ON', label: 'Ontario', providerDesc: 'OHIP Provider/Billing Number', placeholder: "Six digits required"}
];
class SignupForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			province: "ON",
			careProviderNumber: "",
			careProviderNumberLabel: provinceInfo[1].providerDesc,
			careProviderNumberPlaceholder: provinceInfo[1].placeholder,
			email: "",
			password: "",
			passwordConfirmation: "",
			errors: {},
			isLoading: false,
			invalid: false,
			isHuman: false,
			showTermsCondition: false,
			agreeTermsCondition: false
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.isValid = this.isValid.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
		
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
		if (e.target.name === "province")
			this.setState({
							[e.target.name]: e.target.value, 
							careProviderNumberLabel: e.target.options[e.target.selectedIndex].getAttribute('providerdesc'),
							careProviderNumberPlaceholder: e.target.options[e.target.selectedIndex].getAttribute('placeholder')
						 });
		else
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
		console.log("[render() of signupForm.jsx] this.props: ", this.props);
		const {classes} = this.props;
		return(
				<Grid container spacing={1}>
			      <Grid item xs={12}>
			        <Typography variant="h6">
			          SIGNUP
			        </Typography>
			      </Grid>
				  <Grid item xs={10}>
			        <MyBreadcrumbs {...this.props} />
			      </Grid>
				  <Grid item xs={12}>
			       	<hr />
			      </Grid>
				  <Grid item xs={12}>
			       	<Paper variant="outlined" className={classes.paper}>
					  <Grid container>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={12} style={{textAlign: 'center'}}>
							<Typography variant="h6">
						          Create your account using your email and health care provider number given from your province
						    </Typography>
							<Typography variant="subtitle2" align={"center"} color={"primary"}>
					          This is only allowed for the Doctors of Ophometry (OD) in Canada
					        </Typography><br />
							<Typography variant="subtitle2" align={"center"} color={"textSecondary"}>
					          <span style={{color: 'red'}}>*</span>&nbsp;This field is required
					        </Typography>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3} style={{textAlign: 'right'}}>
							<strong>Email</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9} style={{textAlign: 'left'}}>
							<input name="email" type="email" value={this.state.email} onChange={this.onChange} placeholder="email@example.com" style={{padding: '5px', width: '70%'}}/>		
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('email')}>
								<Alert severity="error" style={{width: '70%'}}>{this.state.errors.email} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Password</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="password" type="password" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '70%'}}/>
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('password')}>
						        <Alert severity="error" style={{width: '70%'}}>{this.state.errors.password} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Confirm Password</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.onChange} placeholder="Requires the same password as above" style={{padding: '5px', width: '70%'}}/>
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('confirmPpassword')}>
						        <Alert severity="error" style={{width: '70%'}}>{this.state.errors.confirmPassword} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>

						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Province</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<Select 
									name="province" 
									value={this.state.province || ''}
					            	onChange={this.onChange}

									native
									className={classes.select}
									variant="outlined"
									input={<OutlinedInput classes={{ input: classes.selectInput}} />}
						  	>
							{
								provinceInfo.map
								(
									(element,  index) =>
									(
										<option key={index} value={element.value} providerdesc={element.providerDesc} placeholder={element.placeholder}>{element.label}</option>
									)
								)
							}
							</Select>
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('province')}>
						        <Alert severity="error" style={{width: '40%'}}>{this.state.errors.province} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={3} style={{textAlign: 'right'}}>
							<strong>{this.state.careProviderNumberLabel}</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9} style={{textAlign: 'left'}}>
							<input name="providerNumber" type="text" value={this.state.providerNumber} onChange={this.onChange} placeholder={this.state.careProviderNumberPlaceholder} style={{padding: '5px', width: '70%'}}/>		
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('providerNumber')}>
								<Alert severity="error" style={{width: '70%'}}>{this.state.errors.providerNumber} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Checkbox color="primary" checked={this.state.agreeTermsCondition}
									  onChange={()=>this.setState((prevState)=>({agreeTermsCondition: !prevState.agreeTermsCondition}))}
							/>&nbsp;<span>I agree to the</span>
							<Button color="primary"
									onClick={()=>this.setState((prevState)=>({showTermsCondition: !prevState.showTermsCondition}))}
									endIcon={this.state.showTermsCondition ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							>
								Terms and Conditions
							</Button>
						</Grid>
						<Grid item xs={12} style={{paddingLeft: '10%', paddingRight: '10%'}}>
							<Collapse in={this.state.showTermsCondition}>
								<div dangerouslySetInnerHTML={ {__html: TermsCondition} } style={{paddingLeft: '5px', paddingRight: '5px', border: '1px solid grey'}}/>
						    </Collapse>
						</Grid>
						
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							{/* https://www.google.com/recaptcha/admin/site/431367291/settings used domain with 192.168.1.81 */}
							<Recaptcha    	
								sitekey={"6Ld7JLYZAAAAAO_-4oa94JbgLHKBOIDeUZG3LYAI"}
								render="explicit"
								verifyCallback={this.verifyCallbackBot}
								onloadCallback={this.callbackBot}
								expiredCallback={this.expiredCallbackBot}
								size="compact"
							   />
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button variant="outlined" color="primary" onClick={this.onSubmit}>Sign Up</Button>
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button size="small" color="primary" component={Link} to="/myAccount/login">Already have an account? Login here</Button>
						</Grid>
						</Grid>
					</Paper> 
				  </Grid>
				</Grid>
			  );
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
	classes: PropTypes.object.isRequired,
	userSignupRequest: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired
};
export default withStyles(styles)(SignupForm);
