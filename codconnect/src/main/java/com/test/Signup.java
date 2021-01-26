package com.test;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import org.json.JSONObject;

import com.utilities.Email;
import com.utilities.JsonUtils;

public class Signup
{
	//private static String payload=
	//	"{\"firstName\":\"aㅜ\",\"lastName\":\"KWON\", \"email\":\"kwon.younggu@gmail.com\",\"password\":\"3333\",\"passwordConfirmation\":\"3333\",\"timezone\":\"test\",\"errors\":{},\"isLoading\":false,\"invalid\":false}";

	private static String payload=
			"{\"fullName\":\"昨夜のコ昨\", \"email\":\"kwon.younggu@gmail.com\",\"password\":\"3333\",\"passwordConfirmation\":\"3333\",\"timezone\":\"test\",\"errors\":{},\"isLoading\":false,\"invalid\":false}";

	//do the server validation
	public static void main(String[] args)
	{
		// TODO Auto-generated method stub
		JSONObject jsonObj = new JSONObject(payload);
		//System.out.println("jsonObj: "+jsonObj.toString()+", length="+jsonObj.length());
		//JsonUtils.printJsonObject(jsonObj);
		JsonUtils.validateSignup(jsonObj);
		//System.out.println("Pattern="+Pattern.matches("\\d", "1"));
		
		JsonUtils.printJsonObject(jsonObj);
		
		Email.smtpAccessEmail="webmonster.ca@gmail.com";
		Email.smtpAccessPwd="password";
		new Email(Arrays.asList("kwon_younggu@yahoo.ca"), Arrays.asList("YOUNGGU"), "Signup Confirmation", "Hello test...", null);
	}

}
