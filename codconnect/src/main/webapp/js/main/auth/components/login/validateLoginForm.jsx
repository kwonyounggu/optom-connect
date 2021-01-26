import validator from "validator";
import xregexp from "xregexp";
import isEmpty from "lodash/isEmpty";

export default function validateSignupForm(data)
{
	  let errors = {};
  
	  if (validator.isEmpty(data.email)) 
	  {
	    errors.email = "This email field is required";
	  }
	  else if (!validator.isEmail(data.email)) 
	  {
	    errors.email = "The Email entered is invalid";
	  }
	  
	  if (validator.isEmpty(data.password)) 
	  {
	    errors.password = "This password field is required";
	  }
	  else if(!validator.isByteLength(data.password, {min: 6, max: 30}))
	  {
		  errors.password = "This field length requires between 6 and 30";
	  }
	  
	  return {errors, isValid: isEmpty(errors)};
	
}