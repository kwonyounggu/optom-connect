<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.stream.Collectors" %>
<%@ page import = "java.util.List" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.utilities.*" %>
<%@ page import = "org.apache.commons.validator.routines.EmailValidator" %>
<%@ page import = "com.dao.AuthDao" %>
<%
//To do here check how to read payload string with one attribute property
response.setContentType("application/json");

if(request.getMethod().equals("GET"))
{
	JSONObject jsonObj = new JSONObject();
	
	//Handle only the first parameter, otherwise it must be interfered in the middle
	try
	{
		for(Map.Entry<String, String[]> entry : request.getParameterMap().entrySet())
		{
			System.out.println(">>> "+entry.getKey()+": "+entry.getValue()[0]);
			
			switch(entry.getKey())
			{
				case "email": if(!EmailValidator.getInstance().isValid(entry.getValue()[0]))
							  {
									jsonObj.put("error", "The email field is invalid.");
							  }
							  else
							  {
									jsonObj.put("isUserExists", new AuthDao(DatasourceUtil.getDataSource()).isUserExists("email='"+entry.getValue()[0]+"'"));
							  }
							  break;
				default: jsonObj.put("error", "Unknown parameter ("+entry.getKey()+"), it must be an hacking.");
							break;
			}
			break;//just handle only the 1st parameter
		}
		JsonUtils.printJsonObject(jsonObj);
	}
	catch(Exception e)
	{
		System.err.println("ERROR (getMusicList.jsp): "+ e);
		jsonObj.put("error", e);
	}
	out.print(jsonObj);
}
%>