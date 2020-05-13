package com.utilities;

import java.util.Arrays;
import java.util.logging.Logger;

import com.beans.AuthUserDetailsInternalBean;



public class MyEmail
{
	private static Logger log = Logger.getLogger("Myemail.java");

	public static void emailSignupConfirmation(AuthUserDetailsInternalBean ab) throws Exception
	{
		String message =
				   "<div>Dear " + ab.getFullName() + ",</div><br />" +
				   
				   "<div>Thank you for joining us!" + "</div>" +
				   "<div>Please complete your signup process by clicking/visiting the following link:" + "</div>" +
		
				   "<div><a href='"+Utils.MYHOST_DOMAIN + "/activate?op=signup&token=" +ab.getEmailConfirmationToken() + "'>Confirmation Link</a></div>" +
				   "<div>" + Utils.MYHOST_DOMAIN + "/activate?op=signup&token=" +ab.getEmailConfirmationToken() + "</div><br />" +
				   "<div>Thank you.</div>" +
				   "<div><a href='http://www.webmonster.ca'>www.webmonster.ca</a></div>";
		
				log.info("key is "+Email.smtpAccessPwd+", "+Email.smtpAccessEmail);
		new Email(Arrays.asList(ab.getEmail()), Arrays.asList(ab.getFullName()), "Signup Confirmation", message, ab);
	}
	
	public static void emailResetPassword(AuthUserDetailsInternalBean ab) throws Exception
	{
		String message =
				   "<div>Dear " + ab.getFullName() + ",</div><br />" +
				   
				   "<div>We received a request to change your password." + "</div>" +
				   "<div>Click or visit the following link to set a new password:" + "</div>" +
		
				   "<div><a href='"+Utils.MYHOST_DOMAIN + "/activate?op=resetPassword&token=" +ab.getPasswordReminderToken() + "'>Reset Password</a></div>" +
				   "<div>" + Utils.MYHOST_DOMAIN + "/activate?op=resetPassword&token=" +ab.getPasswordReminderToken() + "</div><br />" +
				   
				   "<div>If you don't want to change your password, you can ignore this email.</div>" +
				   "<div>Thank you.</div>" +
				   "<div><a href='http://www.webmonster.ca'>www.webmonster.ca</a></div>";
		
				log.info("key is "+Email.smtpAccessPwd+", "+Email.smtpAccessEmail);
		new Email(Arrays.asList(ab.getEmail()), Arrays.asList(ab.getFullName()), "Password Reset", message, ab);
	}
}
