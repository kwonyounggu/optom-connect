import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route, Switch} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {connect} from "react-redux";


const Login = React.lazy( () => import("../components/login/login.jsx") );
const Signup = React.lazy( () => import("../components/signup/signup.jsx") );
const Activation = React.lazy( () => import("../components/signup/activation.jsx") );
const ResetPassword = React.lazy( () => import("../components/resetPassword/resetPassword.jsx") );

const styles = (theme) =>
({
  	root:	
	{
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row'
	},
	gridPanel: 
	{
		padding: 8,
		border: '0px solid red',
		borderRadius: '8px'
	},
	toolbar: theme.mixins.toolbar
});

class MyAccount extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	componentWillUnmount()
	{
	}
	componentDidMount()
	{

	}
	
	render()
	{
		console.log("INFO: MyAccount.render() is called, this.props: ", this.props);
		
		return(	
				<div >
                    <Switch>
						<Redirect exact from="/myAccount" to="/myAccount/login" />
						<Route path="/myAccount/login"  component={ (props) => <Login {...props} />} />
						<Route path="/myAccount/resetPassword"  component={ (props) => <ResetPassword {...props} /> } /> 
						<Route path="/myAccount/signup"    component={ (props) => <Signup {...props} /> } /> 
						
					</Switch>
				</div>
			  );
	}
}

const mapStateToProps=(state)=>
(	//return omitted for simplication
	{
		auth: state.authReducer,
		rootReducer: state.rootReducer
	}
);
MyAccount.propTypes =
{
	classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null) (withStyles(styles) (MyAccount));
/************************** Hope this works:
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentName))
**********************************/
