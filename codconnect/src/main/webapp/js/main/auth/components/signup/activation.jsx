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
		//this.validateParameters = this.validateParameters().bind(this);
	}
	validateParameters(data)
	{
		  let bResult = true;
		  console.log("validateParameters(",data,")");
		  
		  if(data.status != null && (parseInt(data.status) == 1 || parseInt(data.status) == 2))
		  {	
			  let fullNameKor = xregexp("^[\\p{Hangul}\\p{Han}\\p{Hiragana}\\p{Katakana}]{2,10}$");
				
				
			  if(data.name == null || validator.isEmpty(data.name)) bResult = false;  
			  else
			  {
				 let fullNameList = data.name.split(/(\s+)/).filter((w)=>w.trim().length>0);
	
				 if(fullNameList.length > 2 || fullNameList.length < 1) bResult = false;
				 else if(fullNameList.length > 1) //First and Last Name with a space
				 {
					 if(!(validator.isAlpha(fullNameList[0]) && 
						  validator.isAlpha(fullNameList[1]) && 
						  (fullNameList[0].length+fullNameList[1].length) <=70)) bResult = false;
				 }
				 else if(!fullNameKor.test(fullNameList[0])) bResult = false;
			  }
	
			  if (data.email == null || validator.isEmpty(data.email) || !validator.isEmail(data.email)) bResult = false;
			  console.log("bResult=", bResult);
			  if(bResult)
			  {
				  if(parseInt(data.status) == 2)
					  this.props.addAlertMessage
					  (
						{
							type: "success",
							text: "You have successfully activated your account on the system! "
						}
					  );
				  else
					  this.props.addAlertMessage
					  (
						{
							type: "success",
							text: "You have already activated your account on the system! "
						}
					  );
				
			  }
		  }
		  else
		  {
			  bResult = false;
		  }
		  return bResult;
	}
	render()
	{
		const params = queryString.parse(this.props.location.search);
		if(params.status != null && parseInt(params.status) == 3)
		{
			this.props.addAlertMessage
			(
				{
					type: "failure",
					text: "Oops there is no record with the given! please signup again. "
				}
		    );
			return (<div><Redirect to="/signup" /></div>);
		}
		
		return (
				<div>{this.validateParameters(params) ? <Redirect to={`/login?email=${params.email}`} /> : <Redirect to="/login" />}</div>
			   );

	}
}

Activation.propTypes=
{
	addAlertMessage: PropTypes.func.isRequired
}

export default connect(null, {addAlertMessage})(Activation);
