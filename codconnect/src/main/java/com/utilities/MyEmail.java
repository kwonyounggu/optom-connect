package com.utilities;

import java.util.Arrays;
import java.util.logging.Logger;

import com.beans.AuthUserDetailsInternalBean;
import com.exceptions.EmailException;



public class MyEmail
{
	private static Logger log = Logger.getLogger("Myemail.java");

	/*
	public static void emailSignupConfirmation(AuthUserDetailsInternalBean ab) throws EmailException
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
	}*/
	
	public static void emailSignupConfirmation(AuthUserDetailsInternalBean ab) throws EmailException
	{
		//https://support.aminoapps.com/hc/en-us/articles/115002381673-Signing-Up-and-Activation
		//https://www.acepforprofessionals.com/users/activate-account.php
		//https://mailchimp.com/help/i-signed-up-with-mailchimp-but-didnt-get-an-activation-email/
		String message =
				   "<div>Dear " + ab.getFullName() + ",</div><br />" +
				   
				   "<div>Thank you for joining us!" + "</div>" +
				   "<div>(Activation time within a certain hour)Please complete your signup process by clicking/visiting the following link:" + "</div>" +
		
				   "<div><a href='"+Utils.MYHOST_DOMAIN + "/activate?op=signup&token=" +ab.getEmailConfirmationToken() + "'>Confirmation Link</a></div>" +
				   "<div>" + Utils.MYHOST_DOMAIN + "/activate?op=signup&token=" +ab.getEmailConfirmationToken() + "</div><br />" +
				   "<div>Thank you.</div>" +
				   "<div><a href='https://www.optom-connect.ca'>www.optom-connect.ca</a></div>";

		new SynchroEmail(Arrays.asList(ab.getEmail()), Arrays.asList(ab.getFullName()), "Optom-Connect Signup Confirmation", message, ab, true);
	}
	public static void emailResetPassword(AuthUserDetailsInternalBean ab) throws EmailException
	{
		String message =
				   "<div>Dear " + ab.getFullName() + ",</div><br />" +
				   
				   "<div>We received a request to change your password." + "</div>" +
				   "<div>Click or visit the following link to set a new password:" + "</div>" +
		
				   "<div><a href='"+Utils.MYHOST_DOMAIN + "/activate?op=resetPassword&token=" +ab.getPasswordReminderToken() + "'>Reset Password</a></div>" +
				   "<div>" + Utils.MYHOST_DOMAIN + "/activate?op=resetPassword&token=" +ab.getPasswordReminderToken() + "</div><br />" +
				   
				   "<div>If you don't want to change your password, you can ignore this email.</div>" +
				   "<div>Thank you.</div>" +
				   "<div><a href='https://www.optom-connect.ca'>www.optom-connect.ca</a></div>";
		//new SynchroEmail(Arrays.asList("abcdef@hello"), Arrays.asList(ab.getFullName()), "Password Reset", message, ab, false);
		new SynchroEmail(Arrays.asList(ab.getEmail()), Arrays.asList(ab.getFullName()), "Password Reset", message, ab, false);
	}
}
