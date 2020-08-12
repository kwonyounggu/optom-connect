import React from "react";

import {PropTypes} from "prop-types";

import queryString from "query-string";

import validator from "validator";
import isEmpty from "lodash/isEmpty";


import { withStyles } from "@material-ui/core/styles";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';


import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {StyledBreadcrumb} from "../../../components/common/styledBreadcrumb.jsx";
import {DisplaySteps} from "../signup/signupForm.jsx";
import { trackPromise } from 'react-promise-tracker';

const styles = (theme) =>
({
	paper:
	{
		backgroundColor: '#fcfaf5',
		padding: '10px 25px 10px 25px'
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
const steps = ['Activate Link In Email', 'Reset Password', 'Login'];
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
			invalid: false
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.isValid = this.isValid.bind(this);

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
		    errors.email = "This email field is empty.";
		}
		else if (!validator.isEmail(this.state.email)) 
		{
		    errors.email = "The email is invalid.";
		}

		if (validator.isEmpty(this.state.password)) 
		{
		    errors.password = "This field is required.";
		}
		else if(!validator.isByteLength(this.state.password, {min: 6, max: 30}))
		{
			errors.password = "This field length requires between 6 and 30.";
		}
		  
		if (validator.isEmpty(this.state.passwordConfirmation)) 
		{
		    errors.passwordConfirmation = "This field is required.";
		}
		else if (!validator.equals(this.state.password, this.state.passwordConfirmation)) 
		{
		    errors.passwordConfirmation = "Passwords must match.";
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
			trackPromise(
			this.props.resetPasswordRequest(this.state).then
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
						this.props.addAlertMessage({turnOn: true, type: "success", level: 2, text: "You have successfully reset your password!!"});
						this.props.history.push("/myAccount/login");
					}	
				}
			).
			catch
			(
				(error) =>			
				{
					console.log("[INFO in catch error of Submit() in resetpasswordForm.jsx]: ", error);
					this.setState({isLoading: false, errors: {overall: error}});
				}
			)
			);//trackPromise
		}
	}
/**
 * Note display Hi, Someone you can reset ..., when submitted provide token back to server to prevent cheating
 */
	render()
	{	
		const {classes} = this.props;
		return(
				<Grid container spacing={1}>
			      <Grid item xs={12}>
			        <Typography variant="h6">
			          RESET PASSWORD
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
							          Hi {this.props.name}, you may now set your new password!
							    </Typography><br />
								<Typography variant="subtitle2" align={"center"} color={"textSecondary"}>
						          <span style={{color: 'red'}}>*</span>&nbsp;This field is required
						        </Typography>
							</Grid>
							<Grid item xs={12}><DisplaySteps activeStep={1} steps={steps}/></Grid>
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
								<input name="email" type="email" value={this.state.email} style={{padding: '5px', width: '70%'}} disabled/>		
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
							<Grid item xs={3}>&nbsp;</Grid>
							<Grid item xs={9}  style={{textAlign: 'left'}}>
								<Button variant="outlined" color="primary" onClick={this.onSubmit}>Reset Password</Button>
							</Grid>
						</Grid>
					</Paper> 
				  </Grid>
				</Grid>
			  );
	}
}
ResetPasswordForm.propTypes =
{
		resetPasswordRequest: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired
};


export default withStyles(styles)(ResetPasswordForm);
