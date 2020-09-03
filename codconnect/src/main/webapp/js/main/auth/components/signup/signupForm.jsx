import React from "react";
//import {Form, FormGroup,  FormControl, HelpBlock, Button, Alert} from "react-bootstrap";

import {Link} from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import {PropTypes} from "prop-types";

import validateSignupForm from "./validateSignupForm.jsx";

import {siteKey} from "../../../utils/utils.jsx";
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

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { trackPromise } from 'react-promise-tracker';

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

const useStyles = makeStyles((theme) => 
({
	stepper:
	{
		backgroundColor: 'inherit'
	}
}));
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

const steps = ['SignUp', 'Confirm Link In Email', 'Login'];

export const DisplaySteps = (props) =>
{
	const classes = useStyles();
	return (
			 <Stepper alternativeLabel nonLinear activeStep={props.activeStep} className={classes.stepper}>
		     {
				props.steps.map
				(
					(label) => 
					 <Step key={label}>
				         <StepLabel>{label}</StepLabel>
				     </Step>
				)
			 }
	         </Stepper>
		);
}
class SignupForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			province: "ON",
			providerNumber: "",
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

	onSubmit(e)
	{
		e.preventDefault();
		console.log("---INFO (onSubmit() of signupForm.jsx) is called---, ",this.state);
		if (this.state.showTermsCondition) this.setState({showTermsCondition: false}); //close if it is open
		
		if(this.isValid())
		{
			window.scrollTo(0, 0);
			this.setState({errors: {}, isLoading: true});
			trackPromise(
			this.props.userSignupRequest
			(
				{
					email: this.state.email, 
					password: this.state.password, 
					providerNumber: this.state.providerNumber, 
					province: this.state.province,
					errors: {}
				}
			).then
			(
				(response) =>
				{
					//console.log("successful, the response object=",response);
					this.setState({isLoading: false});
					if(response.data.invalid)
					{
						this.setState({errors: response.data.errors});
					}
					else
					{
						this.props.addAlertMessage({turnOn: true, type: "success", level: 2, text: "Thanks for sining up. Please check your email for confirmation!!"});
						this.props.history.push("/myAccount/login");
					}					
				}
			).
			catch
			(
				(error) =>			
				{
					console.log("[INFO in catch error of Submit() in signupForm.jsx]: ", error);
					this.setState({isLoading: false, errors: {overall: error}});
				}
			)
			/*.
			finally
			(
				() =>
				{
					//console.log("[INFO in finally of Submit() in signupForm.jsx]: ", params);
					this.setState({isLoading: false});
				}
				
			)*/
			
			);//trackPromise(
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
						          Create your account using your email and provider/billing number given from your province
						    </Typography>
							<Typography variant="subtitle2" align={"center"} color={"primary"}>
					          This is only allowed for the Doctors of Ophometry (OD) in Canada.
					        </Typography><br />
							<Typography variant="subtitle2" align={"center"} color={"textSecondary"}>
					          <span style={{color: 'red'}}>*</span>&nbsp;This field is required
					        </Typography>
						</Grid>
						<Grid item xs={12}><DisplaySteps activeStep={0} steps={steps}/></Grid>
						<Grid item xs={12} style={{paddingLeft: '10%', paddingRight: '10%'}}>
							<Collapse in={this.state.errors.hasOwnProperty('overall')}>
								<Alert severity="error">{this.state.errors.overall} — check it out!</Alert>
						    </Collapse>
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
							<input name="passwordConfirmation" type="password" value={this.state.passwordConfirmation} onChange={this.onChange} placeholder="Requires the same password as above" style={{padding: '5px', width: '70%'}}/>
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('passwordConfirmation')}>
						        <Alert severity="error" style={{width: '70%'}}>{this.state.errors.passwordConfirmation} — check it out!</Alert>
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
						<Grid item xs={12}>&nbsp;</Grid>
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
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('agreeTermsCondition')}>
								<Alert severity="error" style={{width: '70%'}}>{this.state.errors.agreeTermsCondition} — check it out!</Alert>
						    </Collapse>
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
								sitekey={siteKey}
								render="explicit"
								verifyCallback={this.verifyCallbackBot}
								onloadCallback={this.callbackBot}
								expiredCallback={this.expiredCallbackBot}
								size="compact"
							   />
						</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}>
							<Collapse in={this.state.errors.hasOwnProperty('isHuman')}>
								<Alert severity="error" style={{width: '70%'}}>{this.state.errors.isHuman} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button variant="outlined" color="primary" disabled={this.state.isLoading} onClick={this.onSubmit}>Sign Up</Button>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
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
