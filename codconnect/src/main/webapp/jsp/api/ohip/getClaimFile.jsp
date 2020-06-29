<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.stream.Collectors" %>
<%@ page import = "java.util.List" %>
<%@ page import = "java.util.Enumeration" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.utilities.*" %>
<%@ page import = "com.beans.AuthUserDetailsInternalBean" %>
<%@ page import = "com.dao.AuthDao" %>
<%@ page import = "org.apache.commons.dbcp2.BasicDataSource" %>
<%@ page import = "javax.mail.Session" %>

<%
	response.setContentType("application/json");
	System.out.println("getClaimFile.jsp is called");
	
	if(request.getMethod().equals("POST"))
	{
		
		String payloadString = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject jsonObj = new JSONObject(payloadString);
		//AuthUserDetailsInternalBean ab = null;
		try
		{
			
			JsonUtils.printJsonObject(jsonObj);
			
	        String token = request.getHeader("Authorization");
			JSONObject decodedToken = null; 

			if (token != null && token.startsWith("Bearer ")) //Signed In
			{
				token = token.replace("Bearer ", "");
				
				TokenUtil tokenUtil = (TokenUtil)request.getServletContext().getAttribute("tokenUtil");
				decodedToken = tokenUtil.verifyToken(token);
				
				//Note you need to validate if the user is still in the database whose id is still valid/enabled
			}
			jsonObj.put("decodedToken", decodedToken);//remove later
			
			//Validate One more time in the server side
			/*JsonUtils.validateSignup(jsonObj);
			
			//Go ahead for table-insertion if valid
			if(!jsonObj.getBoolean("invalid"))
			{
					
				ab = new AuthUserDetailsInternalBean(jsonObj);
				new AuthDao(DatasourceUtil.getDataSource()).signUpRegistration(ab);
				
				MyEmail.emailSignupConfirmation(ab);
			}
			*/
			jsonObj.put("isItValid", true);
			//throw new Exception("testing an error");
		}
		catch(Exception | Error e)
		{
			System.err.println("ERROR (getBillingCodes.jsp): "+ e);
			jsonObj = new JSONObject();
			jsonObj.put("isItValid", false);
			jsonObj.put("errorMessage", e.getMessage().trim().isEmpty() ? 
					                      (e.getCause()+ "There is an unknown error. -- Try it later!") : e.getMessage());
		}
		
		/*
		//Clean unnecessary properties from the jsonObj
		jsonObj.remove("fullName");
		jsonObj.remove("email");
		jsonObj.remove("password");
		jsonObj.remove("passwordConfirmation");
		jsonObj.remove("timezone");
					*/
		out.print(jsonObj);
		
	}
%>