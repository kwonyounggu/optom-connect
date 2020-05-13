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
		
		
	}
%>