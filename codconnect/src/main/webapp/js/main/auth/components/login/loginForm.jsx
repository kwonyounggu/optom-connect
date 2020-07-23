import React from "react";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import validateLoginForm from "./validateLoginForm.jsx";

import {setAuthorizationToken} from "../../utils/utils.jsx";
import {PropTypes} from "prop-types";

import jwtDecode from "jwt-decode";
import queryString from "query-string";

import FacebookLogin from "react-facebook-login";

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import InputMask from "react-input-mask";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import { green } from '@material-ui/core/colors';

import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {StyledBreadcrumb} from "../../../components/common/styledBreadcrumb.jsx";

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
	}
});

const MyBreadcrumbs = (props) => 
{
	console.info("MyBreadscrumbs: props, ", props.location.pathname);
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

class LoginForm extends React.Component
{
	constructor(props)
	{
		super(props);
		const params = queryString.parse(props.location.search);
		
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
	
		console.log("[INFO] in main/auth/components/login/loginForm.jsx -> constructor(..), this.props: ", this.props, "| params: ", params);
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
								//this.setState({errors: response.data.errors, isLoading: false});
							}
							else
							{
								setAuthorizationToken(response.data.token);
								
								this.props.setCurrentUser(jwtDecode(response.data.token));
								/*this.props.addAlertMessage
								(
									{
										type: "success",
										text: "You logged in successfully. Welcome!"
									}
								);*/
								//this.props.from ? this.context.router.history.push(this.props.from.pathname):
								//				  this.context.router.history.push("/");
							}
						}
					).
					catch /* Without returning a response object */
					(
						(error) =>			
						{
							/*show this error in a page or a top of the current page - Oct-19-2017*/
							/*this error consists of an html page cotents*/
							console.log("ERROR: >>>>>>>>>>>>>>>>", error);
							this.setState({isLoading: false, errors: {serverAPI: error+":::"}});
						}
					);
				}
			);
		}
	}
	renderOld()
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
	render()
	{	
		const {classes} = this.props;
		return(
				<Grid container spacing={1}>
			      <Grid item xs={12}>
			        <Typography variant="h6">
			          LOGIN
			        </Typography>
			      </Grid>
				  <Grid item xs={10}>
			        <MyBreadcrumbs {...this.props} />
			      </Grid>
				  <Grid item xs={12}>
			       	<hr />
			      </Grid>
				  <Grid item xs={12}>
					<Collapse in={!this.state.isFileNameValid && this.state.isFileChosen}>
						<Alert severity="error">The email address is invalid — check it out!</Alert>
				    </Collapse>
					<Collapse in={!this.state.isFileSizeValid && this.state.isFileChosen}>
				        <Alert severity="error">The password is invalid — check it out!</Alert>
				    </Collapse>
				  </Grid>
				  <Grid item xs={12}>
			       	<Paper variant="outlined" className={classes.paper}>
					  <Grid container>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={12} style={{textAlign: 'center'}}>
							<Typography variant="h6">
						          Login with your email address
						    </Typography>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3} style={{textAlign: 'right'}}>
							<strong>Email</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9} style={{textAlign: 'left'}}>
							<input id="email" type="email" value={this.state.email} onChange={this.onChange} placeholder="email@example.com" style={{padding: '5px', width: '70%'}}/>		
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Password</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input id="password" type="password" value={this.state.password} onChange={this.onChange} placeholder="email@example.com" style={{padding: '5px', width: '70%'}}/>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Checkbox defaultChecked color="primary"/>&nbsp;<span>Keep me logged in</span>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button variant="outlined" color="primary">Log In</Button>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button size="small" color="primary" component={Link} to="/resetPassword">Reset Password</Button>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button size="small" color="primary" component={Link} to="/signup"> Simple Sign Up </Button>
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
		loginRequest: PropTypes.func.isRequired,
		addAlertMessage: PropTypes.func.isRequired,
		setCurrentUser: PropTypes.func.isRequired
};
//This allows to use this.context.router...
/*LoginForm.contextTypes =
{
		router: PropTypes.object.isRequired
};
*/
export default withStyles(styles)(LoginForm);