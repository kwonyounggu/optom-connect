import validator from "validator";
import xregexp from "xregexp";
import isEmpty from "lodash/isEmpty";
import {EngKorNameRegex} from "../../../utils/utils.jsx";
import {FullNameKoreanPlaceholder} from "../../../utils/utils.jsx";

export default function validateSignupForm(data)
{
	  let errors = {};
  
	  /********************************************************************************************************
	   * Note that this commented section comes due to a change of replacing a fullName with both firstName and lastName
	   * on 11-03-2017
	  //Check if it is letters English, Korean or both combination in size of between 1 and 100
	  if(!EngKorNameRegex.test(data.firstName))
	  {
		  errors.firstName = "The first name consist of English or Korean letters in between 1 and 100 only.";
	  }
	  //You need the following statement when the given regex contains g, global.
	  //EngKorNameRegex.lastIndex = 0;
	  if(!EngKorNameRegex.test(data.lastName))
	  {
		  errors.lastName = "The last name consist of English or Korean letters in between 1 and 100 only.";
	  }
	  **********************************************************************************************************/
	  //Max asian names 10 chars
	  let fullNameKor = xregexp("^[\\p{Hangul}\\p{Han}\\p{Hiragana}\\p{Katakana}]{2,10}$");
	  //let adjustedName = "";
	  
	  if(validator.isEmpty(data.fullName))
	  {
		  errors.fullName = "This filed is required.";
	  }	  
	  else
	  {
		  //The following statement will return only words splited regard less of spaces
		  //eg: DeltaNAMEDeltaDeltaNAMEDelta -> list[0]:NAME List[1]:NAME
		 let fullNameList = data.fullName.split(/(\s+)/).filter((w)=>w.trim().length>0);

		 if(fullNameList.length > 2 || fullNameList.length < 1)
		 {
			 errors.fullName = `Full Name is invalid (use like ${FullNameKoreanPlaceholder}).`;
		 }
		 //English name such that first name and last name are provided
		 else if(fullNameList.length > 1)
		 {
			 //English name should be alphabet and its length upto 50 chars
			 if(!(validator.isAlpha(fullNameList[0]) && 
				  validator.isAlpha(fullNameList[1]) && 
				  (fullNameList[0].length+fullNameList[1].length) <=70))
			 {
				 errors.fullName = `Full Name is invalid (use like ${FullNameKoreanPlaceholder}).`;
			 }
		 }
		 //Length is equal to 1
		 /*else if(!fullNameKor.test(fullNameList[0]) || !fullName.test(data.fullName))*/
		 else if(!fullNameKor.test(fullNameList[0]))
		 {
			 errors.fullName = `Full Name is invalid (use like ${FullNameKoreanPlaceholder}).`;
		 }
	  }

	  if (validator.isEmpty(data.email)) 
	  {
	    errors.email = "This field is required.";
	  }
	  else if (!validator.isEmail(data.email)) 
	  {
	    errors.email = "Email is invalid.";
	  }
	  
	  if (validator.isEmpty(data.password)) 
	  {
	    errors.password = "This field is required.";
	  }
	  else if(!validator.isByteLength(data.password, {min: 2, max: 30}))
	  {
		  errors.password = "This field length requires between 2 and 30.";
	  }
	  
	  if (validator.isEmpty(data.passwordConfirmation)) 
	  {
	    errors.passwordConfirmation = "This field is required.";
	  }
	  else if (!validator.equals(data.password, data.passwordConfirmation)) 
	  {
	    errors.passwordConfirmation = "Passwords must match.";
	  }
	  
	  if (validator.isEmpty(data.timezone)) 
	  {
	    errors.timezone = "This field is required.";
	  }

	  if(!data.isHuman)
	  {
		  errors.isHuman = "This field is required.";
	  }
	  //console.log(data.password+":"+data.passwordConfirmation+" => "+(data.password==data.passwordConfirmation)+"=>>"+validator.equals(data.password, data.passwordConfirmation)+"=>>>"+isEmpty(errors));

	  return {errors, isValid: isEmpty(errors)};
	
}