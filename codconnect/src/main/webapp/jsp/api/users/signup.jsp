<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.stream.Collectors" %>
<%@ page import = "java.util.List" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.utilities.*" %>
<%@ page import = "com.beans.AuthUserDetailsInternalBean" %>
<%@ page import = "com.dao.AuthDao" %>
<%@ page import = "org.apache.commons.dbcp2.BasicDataSource" %>
<%@ page import = "javax.mail.Session" %>

<%
	response.setContentType("application/json");
	
	
	/*
		See https://stackoverflow.com/questions/8100634/get-the-post-request-body-from-httpservletrequest
		Warning: once you call request.getReader(), the stream of its data will be empty.
		The following statement has produced 10 in size but only one json object is filled in the 1st array element.
			- List<Object> paramList = request.getReader().lines().collect(Collectors.toList());
	*/
	
	if(request.getMethod().equals("POST"))
	{
		String payloadString = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject jsonObj = new JSONObject(payloadString);
		AuthUserDetailsInternalBean ab = null;
		try
		{
			//JsonUtils.printJsonObject(jsonObj);
			//Validate One more time in the server side
			JsonUtils.validateSignup(jsonObj);
			
			//Go ahead for table-insertion if valid
			if(!jsonObj.getBoolean("invalid"))
			{	
				ab = new AuthUserDetailsInternalBean(jsonObj, request.getRemoteAddr());
				new AuthDao(DatasourceUtil.getDataSource()).signUpRegistration(ab);
				
				MyEmail.emailSignupConfirmation(ab);
			}
		}
		catch(Exception e)
		{
			System.err.println("ERROR (signup.jsp): "+ e);
			jsonObj.getJSONObject("errors").put("serverAPI", "Oops! Something went wrong, please try again later.:::"+e.getMessage());
			jsonObj.put("invalid", true);
					
			/*
			Note that if insertion of a record is done then remove it from the table.
			However as a result of checking, it is already rolledback so there is no record existing.
			So the following if statement is not necessary.
			if(ab != null && ab.getId() > 0)
	    	 {
	    		 new AuthDao(DatasourceUtil.getDataSource()).deleteRecords(ab);
	    	 }
			*/
		}
		
		//try{Thread.sleep(5000);}catch(InterruptedException e){System.out.println(e);} 
		//Clean unnecessary properties from the jsonObj
		jsonObj.remove("fullName");
		jsonObj.remove("email");
		jsonObj.remove("password");
		jsonObj.remove("passwordConfirmation");
		jsonObj.remove("timezone");
		jsonObj.remove("providerNumber");
		jsonObj.remove("province");
					
		out.print(jsonObj);
		
	}
%>