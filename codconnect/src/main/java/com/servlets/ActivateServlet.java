package com.servlets;

import java.io.IOException;
import java.net.URLEncoder;
import java.sql.Timestamp;

import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.beans.AuthUserDetailsInternalBean;
import com.dao.AuthDao;
import com.utilities.DatasourceUtil;


@WebServlet("/activate")
public class ActivateServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	public ActivateServlet()
	{
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.info("doGet() is called in ActivateServlet.java");
		
		request.setCharacterEncoding("UTF-8");//put this otherwise UNI-Code characters will be broken.
		
		response.setContentType("text/html; charset=UTF-8");
		
		String op = (String)request.getParameter("op");
		String token = (String)request.getParameter("token");

		
		
		try
		{
			if(op == null || token == null)
			{
				throw new Exception("no operation and or token being provided");
			}
			else switch(op)
			{
				case "signup":
					{
						/*
						 * NOT USED THE FOLLOWING COMMENTS
						 * check if token expired then do the following
						 * - if expired, then status=4, expired->show a signup again
						 * - else do the following procedures
						 */
						AuthDao authDao = new AuthDao(DatasourceUtil.getDataSource());
						AuthUserDetailsInternalBean ab = authDao.getRecord(token, "email_confirmation_token");
						if(ab.getId()>0)//there exists a record
						{
							if(ab.getAuthUserAccountStatusId()==2) //2: not confirmed yet, 1: already  activated
								authDao.updateTable("update auth_user_details_internal set auth_user_account_status_id=1 where id="+ab.getId());
							/*
							 * queryString?status=1;//activation is already done
							 * queryString?status=2;//activation is just done now
							 * queryString?status=3;//No record avaiable, signup again due to a possible exipiration
							 */
							response.sendRedirect(request.getContextPath()+"/myAccount/activation?status="+ab.getAuthUserAccountStatusId()+"&email="+ab.getEmail()+"&name="+URLEncoder.encode(ab.getFullName(), "UTF-8"));						
						}
						else
						{
							//no record caused by incorrect token or token expired, you need to signup again
							response.sendRedirect(request.getContextPath()+"/myAccount/activation?status=3&email="+ab.getEmail()+"&name="+URLEncoder.encode(ab.getFullName(), "UTF-8"));
						}
					}
					break;
				case "resetPassword":
					{
						AuthDao authDao = new AuthDao(DatasourceUtil.getDataSource());
						AuthUserDetailsInternalBean ab = authDao.getRecord(token, "password_reminder_token");
						if(ab.getId()>0)//there exists a record
						{
							/* Aug 10 2020 - Ignore about TOKEN EXPIRE
							 * Think of no cron jobs for this password_reminder_token then what possible cases could be
							 * Note that status==1: Go ahead for resetting
							 * 			 status==2: Expired
							 */
							
							/*
							 * if(not expired) 
							 * 		-display a page for a new password->
							 * 			(if within 10 min then accept a password else show 'expired') and nullify two fields in resetPassword handler
							 * 		
							 * else (expired)
							 * 		-show 'warning that time 'Your request to reset a new password is expired, please do again'
							 * 		-nullify two fields
							 * */
							
							//The following if-statement is commented in Aug 10 2020 because of no consideration about EXPIRE
							/*
							if(ab.getPasswordReminderExpire().after(new Timestamp(System.currentTimeMillis())))
								response.sendRedirect(request.getContextPath()+"/myAccount/resetPassword?status=1&email="+ab.getEmail()+"&token="+ab.getPasswordReminderToken()+"&name="+URLEncoder.encode(ab.getFullName(), "UTF-8"));						
							else */
								response.sendRedirect(request.getContextPath()+"/myAccount/resetPassword?status=2&email="+ab.getEmail()+"&name="+URLEncoder.encode(ab.getFullName(), "UTF-8"));						
						}
						else
						{
							//no record, say that you need to request again
							response.sendRedirect(request.getContextPath()+"/myAccount/resetPassword?status=3&email="+ab.getEmail()+"&name="+URLEncoder.encode(ab.getFullName(), "UTF-8"));
						}
					}
					break;
				default: 
					throw new Exception("unknown operation request");
			}
		}
		catch(Exception e) //Test with unknown op and db failure and see jsp file error
		{
			log.severe("(op="+op+"): msg="+e+",\nCustomer IP: "+request.getRemoteAddr()+", from ActivateServlet.java");
			response.sendRedirect(request.getContextPath()+"/error?class=auth&msg="+e.getMessage()+"&cause="+e.getCause()+"&from=ActivateServlet.java");
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}
}
