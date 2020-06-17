<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.dao.OHIPReportDao" %>
<%@ page import = "org.apache.commons.dbcp2.BasicDataSource" %>

<%
	response.setContentType("application/json");	
	System.out.println("getBillingCodes.jsp is called");
	
	if(request.getMethod().equals("POST"))
	{
		JSONObject billingCodes = null;
		try
		{
			BasicDataSource _ds = (BasicDataSource)request.getServletContext().getAttribute("osClusterDs");	
			billingCodes = new OHIPReportDao(_ds).getBillingCodes();
			billingCodes.put("isItValid", true);
		}
		catch(Exception | Error e)
		{
			System.err.println("ERROR (getBillingCodes.jsp): "+ e);
			billingCodes = new JSONObject();
			billingCodes.put("isItValid", false);
			billingCodes.put("errorMessage", e.getMessage().trim().isEmpty() ? 
					                      (e.getCause()+ "There is an unknown error. -- Try it later!") : e.getMessage());
		}
					
		out.print(billingCodes);
	}
%>