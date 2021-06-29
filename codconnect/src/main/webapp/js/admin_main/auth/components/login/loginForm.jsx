import React from "react";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import validateLoginForm from "./validateLoginForm.jsx";

import {setAuthorizationToken} from "../../utils/utils.jsx";
import {PropTypes} from "prop-types";

import jwtDecode from "jwt-decode";
import queryString from "query-string";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {Alert} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

import { trackPromise } from 'react-promise-tracker';

import {DisplaySteps} from "../signup/signupForm.jsx";

const styles = (theme) =>
({
	paper:
	{
		backgroundColor: '#fcfaf5',
		padding: '10px 25px 10px 25px'
	}
});

const steps = ['SignUp', 'Confirm Link In Email', 'Login'];
class LoginForm extends React.Component
{
	constructor(props)
	{
		super(props);
		
		this.state =
		{
			email: "",
		    password: "",
		    errors: {},
		    isLoading: false,
			invalid: false,
			keepMeLoggedIn: false
		};
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.isValid = this.isValid.bind(this);
	
		//this.params = queryString.parse(props.location.search);
			
		console.log("[INFO] in admin_main/auth/components/login/loginForm.jsx -> constructor(..), this.props: ", this.props);
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
		console.log("INFO [onSubmit() of loginForm.jsx --1] is called, ",this.state, this.props);
		
		if(this.isValid())
		{
			//this.setState({errors: {}, isLoading: true}, () => console.log("INFO-2 (onSubmit() of loginForm.jsx) is called, ", this.state));
			this.setState
			(
				{errors: {}, isLoading: true}, 
				() => 
				{
					trackPromise
					(
						this.props.loginRequest(this.state).then
						(
							(response) =>
							{
								console.log("INFO reponse object [onSubmit(e) of loginnForm.jsp] --2: ",response);
								this.setState({isLoading: false});
								if(!response.data.invalid)
								{
									if (response.data.authorizationLevelId == 1) //super user
									{
										setAuthorizationToken(response.data.token);									
										this.props.setCurrentUser(jwtDecode(response.data.token));	
										this.props.history.push("/admin_index.html");
									}
									else
									{
										//You are not allowed to proceed these functions here so goback to the normal user home page.
										window.location.href="/";
									}
								}
								else if (response.data.invalid)
								{
									this.setState({errors: response.data.errors});
								}
							}
						).
						catch
						(
							(error) =>			
							{
								console.log("[INFO in catch error of Submit() in loginForm.jsx]: ", error);
								this.setState({isLoading: false, errors: {overall: error}});
							}
						)
					); //trackPromise
				}
			);
		}
	}

	render()
	{	
		  console.log("INFO [render() of loginForm.jsx] this.props: ", this.props);
		const {classes} = this.props;
		return(
				<Grid container spacing={1}>
				  <Grid item xs={12}>&nbsp;</Grid>
				  <Grid item xs={12}>
			       	<Paper variant="outlined" className={classes.paper}>
					  <Grid container>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={12} style={{textAlign: 'center'}}>
							<Typography variant="h6">
						          Login with your email address
						    </Typography><br />
							<Typography variant="subtitle2" align={"center"} color={"textSecondary"}>
					          <span style={{color: 'red'}}>*</span>&nbsp;This field is required
					        </Typography>
						</Grid>
						<Grid item xs={12}><DisplaySteps activeStep={2} steps={steps}/></Grid>
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
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Checkbox checked={this.state.keepMeLoggedIn} disabled onChange={(e)=>this.setState({keepMeLoggedIn: e.target.checked})} color="primary"/>&nbsp;<span>Keep me logged in</span>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button variant="outlined" color="primary" disabled={this.state.isLoading} onClick={this.onSubmit}>Log In</Button>
						</Grid>
					</Grid>
				</Paper> 
			</Grid>
		</Grid>
			  );
	}
}
LoginForm.propTypes =
{
	classes: PropTypes.object.isRequired,
	loginRequest: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired
};

export default withStyles(styles)(LoginForm);