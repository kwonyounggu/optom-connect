import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import queryString from "query-string";

import validator from "validator";
import xregexp from "xregexp";
import isEmpty from "lodash/isEmpty";

import {addAlertMessage} from "../../../actions/alertMessageActions.jsx";

class Activation extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		//url: https://192.168.1.85:8443/activation?status=2&email=kwon_younggu@yahoo.ca&name=Eye+Care+Provider
		const params = queryString.parse(this.props.location.search);
		if(params.status != null)
			if (parseInt(params.status) == 3)
			{
				this.props.addAlertMessage({turnOn: true, type: "error", level: 2, text: "Oops there is no record with the given! please signup again."});
				return (<div><Redirect to="/myAccount/signup" /></div>);
			}
			else 
			{
				if(parseInt(params.status) == 2)
					this.props.addAlertMessage({turnOn: true, type: "success", level: 2, text: "You have successfully activated your account on the system!"});
				else if(parseInt(params.status) == 1)
					this.props.addAlertMessage({turnOn: true, type: "success", level: 2, text: "You have already activated your account on the system!"});
				else
					this.props.addAlertMessage({turnOn: true, type: "error", level: 2, text: "Unkwown activation request attempted!!!"});
			}
		else
			this.props.addAlertMessage({turnOn: true, type: "error", level: 2, text: "Unkwown activation request attempted!!!"});

		//do it here with validateParameters
		return (
				<div>{this.props.auth.isAuthenticated ? <Redirect to={"/"} /> : <Redirect to="/myAccount/login" />}</div>
			   );

	}
}

Activation.propTypes=
{
	addAlertMessage: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}
function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer
		 };
}
export default connect(mapStateToProps, {addAlertMessage})(Activation);
