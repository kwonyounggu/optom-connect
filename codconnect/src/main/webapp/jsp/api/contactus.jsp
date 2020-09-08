<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.stream.Collectors" %>
<%@ page import = "java.util.List" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.utilities.JsonUtils" %>
<%@ page import = "com.utilities.TokenUtil" %>
<%@ page import = "com.utilities.DatasourceUtil" %>
<%@ page import = "com.beans.AuthUserExternalLoginBean" %>
<%@ page import = "com.beans.AuthUserDetailsInternalBean" %>
<%@ page import = "com.dao.AuthDao" %>
<%@ page import = "org.apache.commons.dbcp2.BasicDataSource" %>

<%
	response.setContentType("application/json");
    System.err.println("contact.jsp is called");
    //try{Thread.sleep(5000);}catch(InterruptedException e){}
	if(request.getMethod().equals("POST"))
	{
		String payloadString = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject jsonObj = new JSONObject(payloadString);
	
		try
		{

			JsonUtils.printJsonObject(jsonObj);
			
			
		}
		catch(Exception e)
		{
			System.err.println("ERROR (login.jsp): "+ e);
			jsonObj.getJSONObject("errors").put("overall", "Oops! Something went wrong, please try again later.:::"+e.getMessage());
			jsonObj.put("invalid", true);
		}
					
		out.print(jsonObj);
		System.err.println("contact.jsp is ended");
		
	}
%>