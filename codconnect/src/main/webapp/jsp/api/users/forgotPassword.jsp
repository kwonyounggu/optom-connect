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

<%
/*
  ForgotPassword -> password_reminder_expire=(now + 30minutes)
  Cron every 10 minutes and 
  Null 'password_reminder_token' and 'password_reminder_expire' if password_reminder_expire_time is over.
  
  Generate and email a reset token if both 'password_reminder_token' and 'password_reminder_expire' are null
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
			JsonUtils.validateFogotPassword(jsonObj);
			
			//Go ahead for table-insertion if valid
			if(!jsonObj.getBoolean("invalid"))
			{
				
				BasicDataSource _ds = (BasicDataSource)request.getServletContext().getAttribute("osClusterDs");	
				AuthUserDetailsInternalBean ab = new AuthDao(_ds).getRecord(jsonObj.getString("email"), "email");
				
				if( ab.getId() != -1 && ab.getPasswordHash() != null && !ab.getEmail().isEmpty())
					//When the user doesn't click the reset link given last time, i.e: doing forgotPassword over one time with resetting.
					if(ab.getPasswordReminderToken() != null && ab.getPasswordReminderExpire() != null)
					{
						ab.setPasswordReminderExpire(new Timestamp(System.currentTimeMillis()+30*60*1000));
						new AuthDao(DatasourceUtil.getDataSource()).updateTable
						(
							"update auth_user_details_internal "+
							"set password_reminder_expire='"+ab.getPasswordReminderExpire()+"' "+
							"where email='"+ab.getEmail()+"'"
						);
						MyEmail.emailResetPassword(ab);
					}
					//When the user want to change password since the last-reset or signup has been done.
					else
					{
						TokenUtil tokenUtil = new TokenUtil();
	
						ab.setPasswordReminderToken(tokenUtil.getJWT(jsonObj.getString("email"), ab.getFullName(), "resetPassword", 30*60*1000));
						ab.setPasswordReminderExpire(new Timestamp(System.currentTimeMillis()+30*60*1000));
						
						//update two fields of the record for the person's email
						new AuthDao(DatasourceUtil.getDataSource()).updateTable
						(
							"update auth_user_details_internal "+
							"set password_reminder_token='"+ab.getPasswordReminderToken()+"', password_reminder_expire='"+ab.getPasswordReminderExpire()+"' "+
							"where email='"+ab.getEmail()+"'"
						);
						MyEmail.emailResetPassword(ab);
					}
				else //Incorrect email id
				{
					jsonObj.put("invalid", true);
					jsonObj.getJSONObject("errors").put("email", "Your email does not exist. Please try again.");
				}
			}			
		}
		catch(Exception e)
		{
			System.err.println("ERROR (forgotPassword.jsp): "+ e);
			jsonObj.getJSONObject("errors").put("serverAPI", "Oops! Something went wrong, please try again later.:::"+e.getMessage());
			jsonObj.put("invalid", true);
		}
		
		//Clean unnecessary properties from the jsonObj
		jsonObj.remove("email");
					
		out.print(jsonObj);
		
	}
%>