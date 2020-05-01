<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.stream.Collectors" %>
<%@ page import = "java.util.List" %>
<%@ page import = "java.sql.Timestamp" %>
<%@ page import = "org.json.JSONObject" %>
<%@ page import = "com.utilities.*" %>
<%@ page import = "com.beans.AuthUserDetailsInternalBean" %>
<%@ page import = "com.dao.AuthDao" %>
<%@ page import = "org.apache.commons.dbcp2.BasicDataSource" %>
<%@ page import ="org.mindrot.jbcrypt.BCrypt" %>

<%
/*
  resetPassword.jsp
*/
	response.setContentType("application/json");

	if(request.getMethod().equals("POST"))
	{
		String payloadString = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject jsonObj = new JSONObject(payloadString);
	
		try
		{
			//JsonUtils.printJsonObject(jsonObj);
			
			
			//Validate One more time in the server side
			JsonUtils.validateResetPassword(jsonObj);
			
			//Go ahead for table-insertion if valid
			if(!jsonObj.getBoolean("invalid"))
			{
				AuthDao authDao = new AuthDao(DatasourceUtil.getDataSource());
				AuthUserDetailsInternalBean ab = authDao.getRecord(jsonObj.getString("token"), "password_reminder_token");
				if(ab.getId()>0)//there exists a record
				{
					if(!ab.getEmail().equals(jsonObj.getString("email")))
						throw new Exception("It seems the given email is interrupted.");
					else if(!ab.getFullName().equals(jsonObj.getString("fullName")))
						throw new Exception("It seems the given name is interrupted.");
					else if(ab.getPasswordReminderExpire().before(new Timestamp(System.currentTimeMillis()+(10*60*1000L))))
						throw new Exception("The token time is expired, please request again.");
					else
					{
						ab.setPasswordSalt(BCrypt.gensalt(12));//default 10
						ab.setPasswordHash(BCrypt.hashpw(jsonObj.getString("password"), ab.getPasswordSalt()));
						
						new AuthDao(DatasourceUtil.getDataSource()).updateTable
						(
							"update auth_user_details_internal " +
							"set password_salt='" + ab.getPasswordSalt() + "', " +
							"password_hash='" + ab.getPasswordHash() + "', " +
							"password_reminder_token=NULL, " +
							"password_reminder_expire=NULL " +
							"where email='" + ab.getEmail()+"'"
						);
					}
				}
				else
					throw new Exception("It seems the given token value is interrupted.");		
			}	
		}
		catch(Exception e)
		{
			System.err.println("ERROR (resetPassword.jsp): "+ e);
			jsonObj.getJSONObject("errors").put("serverAPI", "Oops! Something went wrong, please try again later.:::"+e.getMessage());
			jsonObj.put("invalid", true);
		}
		
		//Clean unnecessary properties from the jsonObj
		jsonObj.remove("email");
		jsonObj.remove("fullName");
		jsonObj.remove("token");
					
		out.print(jsonObj);
		
	}
%>