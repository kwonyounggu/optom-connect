import React from "react";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import {Alert, AlertTitle} from '@material-ui/lab';

import { trackPromise } from 'react-promise-tracker';

import {PropTypes} from "prop-types";

import queryString from "query-string";

import validator from "validator";
import isEmpty from "lodash/isEmpty";

import {siteKey} from "../../../utils/utils.jsx";
import Recaptcha from "react-recaptcha";

import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {StyledBreadcrumb} from "../../../components/common/styledBreadcrumb.jsx";

import {DisplaySteps} from "../signup/signupForm.jsx";

const styles = (theme) =>
({
	paper:
	{
		backgroundColor: '#fcfaf5',
		padding: '10px 25px 10px 25px'
	}
});

const MyBreadcrumbs = (props) => 
{
	//console.info("MyBreadscrumbs: props, ", props);
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
			trackPromise(
			this.props.forgotPasswordRequest({email: this.state.email, errors: {}}).then
			(
				(response) =>
				{
					console.log("successful, the response object=",response);

					this.setState({isLoading: false});
					if(response.data.invalid)
					{
						this.setState({errors: response.data.errors});
					}
					else
					{
						this.props.addAlertMessage({turnOn: true, type: "success", level: 2, text: "Please check your email for the password reset link!!"});
						this.props.history.push("/myAccount/login");
					}	
				}
			).
			catch
			(
				(error) =>			
				{
					console.log("[INFO in catch error of Submit() in forgotpaswordForm.jsx]: ", error);
					this.setState({isLoading: false, errors: {overall: error}});
				}
			)
			);//trackPromise
		}
	}
	
	render()
	{	
		const {classes} = this.props;
		return(
				<Grid container spacing={1}>
			      <Grid item xs={12}>
			        <Typography variant="h6">
			          FORGOT PASSWORD
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
						          Enter your email, then we'll email you a password reset link.
						    </Typography>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={12} style={{paddingLeft: '10%', paddingRight: '10%'}}>
							<Collapse in={this.state.errors.hasOwnProperty('overall')}>
								<Alert severity="error">{this.state.errors.overall} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3} style={{textAlign: 'right'}}>
							<strong>Email</strong>&nbsp;:&nbsp;
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
							<Button variant="outlined" color="primary" disabled={this.state.isLoading} onClick={this.onSubmit}>Submit</Button>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button size="small" color="primary" component={Link} to="/myAccount/login"> Back to Login? </Button>
						</Grid>
						</Grid>
					</Paper> 
				  </Grid>
				</Grid>
			  );
	}
}
ForgotPasswordForm.propTypes =
{
		forgotPasswordRequest: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(ForgotPasswordForm);
