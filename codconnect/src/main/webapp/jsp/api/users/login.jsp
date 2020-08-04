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
    System.err.println("login.jsp is called");
	if(request.getMethod().equals("POST"))
	{
		String payloadString = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject jsonObj = new JSONObject(payloadString);
	
		try
		{

			JsonUtils.printJsonObject(jsonObj);
			System.err.println("[INFO] in webapp/jsp/api/users/login.jsp for jsonObj.has(snsProvider)	: " + jsonObj.has("snsProvider"));
			if (jsonObj.has("snsProvider")) /* Is login through "FACEBOOK"? */
			{
				/*
				 *	two tables update
				 	1. if(there is a record (accountId, email, snsProvider))
				 	-- Think about adding one more field in Login Account table
				*/
				
				AuthUserExternalLoginBean ab = new AuthUserExternalLoginBean();
				
				AuthDao aDao = new AuthDao(DatasourceUtil.getDataSource());
				ab.setAuthExternalAuthenticationProviderId(aDao.getSnsProviderId(jsonObj.getString("snsProvider")));
				ab.setExternalUserId(jsonObj.getString("snsId"));
				ab.setEmail(jsonObj.getString("email"));
				ab.setName(jsonObj.getString("name"));
				
				System.out.println(ab.toString());
				Object o = null;
				if(aDao.updateTable("update auth_user_external_login set login_time=now() " + 
				                    "where external_user_id='" + ab.getExternalUserId() + "' and " +
										  "email='" + ab.getEmail() +"' and " +
				                    	  "auth_external_authentication_provider_id=" + ab.getAuthExternalAuthenticationProviderId()) == 0) //no record to update
				{
					o = aDao.queryObject("select auth_user_account_id from auth_user_external_login where email='" + ab.getEmail() +"'");
					if( o != null)
					{
						//This block is to handle where the same email is already existing and auth_user_account_is 
						//should be equal accordingly. (ie: facebook, google or etc by the same person)
						//insert a record into external table with the existing user_account_id
						String sql = "insert into auth_user_external_login values" +
									 "(default, " + (String)o + ", " + ab.getAuthExternalAuthenticationProviderId() + ", " +
									   ab.getExternalUserId() + ", " + ab.getName() + ", " + ab.getEmail() + ", now())";
						aDao.updateTable(sql);
					}
					else
					{
						aDao.snsRegistration(ab);
					}
				}
				/*
				* if(select disabled from auth_user_external_login where ... )
					"Ooops your account is disabled"
				  else provide the following token
				*/
				o = aDao.queryObject
				    (
				    	"select disabled from auth_user_external_login " +
						"where external_user_id='" + ab.getExternalUserId() + "' and " +
						"email='" + ab.getEmail() +"' and " +
                   	    "auth_external_authentication_provider_id=" + ab.getAuthExternalAuthenticationProviderId()
                   	);
				if((Boolean)o)
				{
					throw new Exception("Your account is disabled.");
				}
				else
				{
					//TokenUtil tokenUtil = new TokenUtil();
					TokenUtil tokenUtil = (TokenUtil)request.getServletContext().getAttribute("tokenUtil");
					jsonObj.put("token", tokenUtil.getJWT(jsonObj.getString("email"), ab.getName(), "externalLogin", TokenUtil.expMinutes*60*1000));
				}
			}
			else /* Internal Login */
			{	//Validate One more time in the server side
				//Note: here check if it is activated
				JsonUtils.validateLogin(jsonObj);
				
				//Go ahead for table-insertion if valid
				if(!jsonObj.getBoolean("invalid"))
				{
					
					//BasicDataSource _ds = (BasicDataSource)request.getServletContext().getAttribute("osClusterDs");	
					AuthUserDetailsInternalBean ab = new AuthDao(DatasourceUtil.getDataSource()).getRecord(jsonObj.getString("email"), "email");
					if( ab.getId() != -1 &&
						ab.getPasswordHash() != null &&
					   !ab.getEmail().isEmpty() &&
					   AuthUserDetailsInternalBean.isValidPassword(jsonObj.getString("password"), ab.getPasswordHash())
					  )
					{
						if (ab.getAuthUserAccountStatusId() == 1)//Normally confirmation done
						{
							//TokenUtil tokenUtil = new TokenUtil();
							TokenUtil tokenUtil = (TokenUtil)request.getServletContext().getAttribute("tokenUtil");
							jsonObj.put("token", tokenUtil.getJWT(jsonObj.getString("email"), ab.getFullName(), "internalLogin", TokenUtil.expMinutes*60*1000));
						}
						else //Activation or Confirmation is not done
						{
							jsonObj.put("invalid", true);
							jsonObj.getJSONObject("errors").put("overall", "Signup confirmation through the email is required. Please try again.");
						}
					}
					else //Incorrect password or email id
					{
						jsonObj.put("invalid", true);
						jsonObj.getJSONObject("errors").put("email", "Your email or password is incorrect. Please try again.");
						jsonObj.getJSONObject("errors").put("password", "Your email or password is incorrect. Please try again.");
					}
				}	
				
				//Clean unnecessary properties from the jsonObj
				jsonObj.remove("email");
				jsonObj.remove("password");
			}
		}
		catch(Exception e)
		{
			System.err.println("ERROR (login.jsp): "+ e);
			jsonObj.getJSONObject("errors").put("overall", "Oops! Something went wrong, please try again later.:::"+e.getMessage());
			jsonObj.put("invalid", true);
		}
					
		out.print(jsonObj);
		System.err.println("login.jsp is ended");
		
	}
%>