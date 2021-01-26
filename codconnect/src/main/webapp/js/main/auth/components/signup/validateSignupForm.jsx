import validator from "validator";
import isEmpty from "lodash/isEmpty";


export default function validateSignupForm(data)
{
	  let errors = {};

	  if (validator.isEmpty(data.email)) 
	  {
	    	errors.email = "This field is required";
	  }
	  else if (!validator.isEmail(data.email)) 
	  {
	    	errors.email = "Email is invalid";
	  }
	  
	  if (validator.isEmpty(data.password)) 
	  {
	    	errors.password = "This field is required";
	  }
	  else if(!validator.isByteLength(data.password, {min: 6, max: 30}))
	  {
		  	errors.password = "This password length requires between 6 and 30";
	  }
	  
	  if (validator.isEmpty(data.passwordConfirmation)) 
	  {
	    	errors.passwordConfirmation = "This field is required";
	  }
	  else if (!validator.equals(data.password, data.passwordConfirmation)) 
	  {
	    	errors.passwordConfirmation = "Passwords must match";
	  }
	  
	  if (validator.isEmpty(data.providerNumber)) 
	  {
	    	errors.providerNumber = "This field is required";
	  }
	  else if (validator.equals(data.province, "BC"))
	  {
			if (data.providerNumber.length != 5) errors.providerNumber = "Five digits required";
			else if (!validator.isNumeric(data.providerNumber)) errors.providerNumber = "Only numbers are valid";
	  }
	  else if (validator.equals(data.province, "ON"))
	  {
			if (data.providerNumber.length != 6) errors.providerNumber = "Six digits required";
			else if (!validator.isNumeric(data.providerNumber)) errors.providerNumber = "Only numbers are valid";
	  }

	  if (!data.agreeTermsCondition) errors.agreeTermsCondition = "You have to agree to the Terms and Conditions";
	  if(!data.isHuman)
	  {
		  errors.isHuman = "This field is required";
	  }
	  //console.log(data.password+":"+data.passwordConfirmation+" => "+(data.password==data.passwordConfirmation)+"=>>"+validator.equals(data.password, data.passwordConfirmation)+"=>>>"+isEmpty(errors));

	  return {errors, isValid: isEmpty(errors)};
	
}