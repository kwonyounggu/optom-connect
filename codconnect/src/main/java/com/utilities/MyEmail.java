package com.utilities;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
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
		String emailMsg =
		"<html>" +
		"<style>" +
			"table {margin: 0 auto; border-collapse: collapse; width: 80%; table-layout: fixed}" +
			"table, tr{border: 1px solid gray}" +
			"thead {background-color: purple; color: white; text-align: center}" +
			"tfoot {background-color: gray; color: white; text-align: center}" +
			"tfoot tr, a{height: 50px; color: white}" +
			"thead > th {height: 100px}" +
			".logoAlign {vertical-align: middle; display: table-cell}" +
		"</style>" +
		"<body>" +
		"<table>" +
			"<thead>" +
				"<tr>" +
					"<th colspan='5'>" +
					    "<h1 style='display: table; width: 80%'><span class='logoAlign'><img src='cid:optom_connect_logo' width='67px' height='45px' title='optom-connect logo'/></span><span class='logoAlign'>Optom-Connect</span></h1>" +
					"</th>" +
				"</tr>" +
			"</thead>" +
			"<tbody>" +
				"<tr>" +
					"<td></td>	" +
					"<td colspan='3'>" +
						"<p style='padding: 10px'>Hello Eye Care Provider,<br /><br /><br />" +
						   "Thank you for joining our Optom-Connect!<br /><br />" +
						   "Please complete the signing up process by clicking/visiting the following link:" +
						   "<br />" +
						   "<ul>" +
						   "<li><a style='color: inherit' href='"+Utils.MYHOST_DOMAIN + "/activate?op=signup&token=" +ab.getEmailConfirmationToken() + "'>Confirmation Link</a></li>" +
						   "<li style='word-wrap: break-word'>" + Utils.MYHOST_DOMAIN + "/activate?op=signup&token=" +ab.getEmailConfirmationToken() + "</li>" +
						   "</ul>" +
						   "<p style='padding: 10px'>Thanks!<br /><br />" +
						   "- The Optom-Connect Team<br /><br /></p>" +
						"</p>" +
					"</td>" +
					"<td></td>" +
				"</tr>" +
			"</tbody>" +
			"<tfoot>" +
				"<tr>	" +
					"<td colspan='5' height='50px'>" +
						"<a href='https://www.optom-connect.ca'>www.optom-connect.ca</a>" +
					"</td>" +
				"</tr>" +
			"</tfoot>" +
		"</table>" +
		"</body>" +
		"</html>";

		new SynchroEmail(Arrays.asList(ab.getEmail()), Arrays.asList(ab.getFullName()), "Optom-Connect Signup Confirmation", emailMsg, ab, true);
	}
	public static void emailSignupConfirmationOrg(AuthUserDetailsInternalBean ab) throws EmailException
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
	/* Can be used for more images later
	public static Map<String, String> signupImages()
	{
		Map<String, String> mapImages = new HashMap<String, String>();
		mapImages.put("optom_connect_logo", "/images/general/optom_connect.png");
		
		return mapImages;
	}*/
	public static void emailResetPassword(AuthUserDetailsInternalBean ab) throws EmailException
	{
		String emailMsg =
		"<html>" +
		"<style>" +
			"table {margin: 0 auto; border-collapse: collapse; width: 80%; table-layout: fixed}" +
			"table, tr{border: 1px solid gray}" +
			"thead {background-color: purple; color: white; text-align: center}" +
			"tfoot {background-color: gray; color: white; text-align: center}" +
			"tfoot tr, a{height: 50px; color: white}" +
			"thead > th {height: 100px}" +
			".logoAlign {vertical-align: middle; display: table-cell}" +
		"</style>" +
		"<body>" +
		"<table>" +
			"<thead>" +
				"<tr>" +
					"<th colspan='5'>" +
					    "<h1 style='display: table; width: 80%'><span class='logoAlign'><img src='cid:optom_connect_logo' width='67px' height='45px' title='optom-connect logo'/></span><span class='logoAlign'>Optom-Connect</span></h1>" +
					"</th>" +
				"</tr>" +
			"</thead>" +
			"<tbody>" +
				"<tr>" +
					"<td></td>	" +
					"<td colspan='3'>" +
						"<p style='padding: 10px'>Hello Eye Care Provider,<br /><br /><br />" +
						   "We received a request to change your password.<br />" +
						   "Please click or visit the following link to set a new password:" +
						   "<br />" +
						   "<ul>" +
						   "<li><a style='color: inherit' href='"+Utils.MYHOST_DOMAIN + "/activate?op=resetPassword&token=" +ab.getPasswordReminderToken() + "'>Reset Password</a></li>" +
						   "<li style='word-wrap: break-word'>" + Utils.MYHOST_DOMAIN + "/activate?op=resetPassword&token=" +ab.getPasswordReminderToken() + "</li>" +
						   "</ul>" +
						   "<p style='padding: 10px'>If you don't want to change your password, you can ignore this email.<br /><br />" +
						   "Thanks!<br /><br />" +
						   "- The Optom-Connect Team<br /><br /></p>" +
						"</p>" +
					"</td>" +
					"<td></td>" +
				"</tr>" +
			"</tbody>" +
			"<tfoot>" +
				"<tr>	" +
					"<td colspan='5' height='50px'>" +
						"<a href='https://www.optom-connect.ca'>www.optom-connect.ca</a>" +
					"</td>" +
				"</tr>" +
			"</tfoot>" +
		"</table>" +
		"</body>" +
		"</html>";

		new SynchroEmail(Arrays.asList(ab.getEmail()), Arrays.asList(ab.getFullName()), "Password Reset", emailMsg, ab, false);
	}
	public static void emailResetPasswordOrg(AuthUserDetailsInternalBean ab) throws EmailException
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
