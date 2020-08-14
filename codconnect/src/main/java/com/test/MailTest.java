package com.test;

import org.simplejavamail.email.Email;
import org.simplejavamail.mailer.Mailer;

import com.beans.AuthUserDetailsInternalBean;
import com.utilities.MyEmail;

public class MailTest
{

	public static void main(String[] args)
	{
		// TODO Auto-generated method stub
		try
		{
			/*
			Email email=new Email();
			email.setFromAddress("WEBMON", "webmonster.ca@gmail.com");
			email.addNamedToRecipients("YOUNGGU", "kwon_younggu@yahoo.ca");
			email.setSubject("TEST");
			email.setText("Hello bye--");
			
			new Mailer("smtp.gmail.com", 465, "webmonster.ca@gmail.com", "password").sendMail(email);;
			System.out.println("--- sent ----");
			
			*/
			AuthUserDetailsInternalBean ab = new AuthUserDetailsInternalBean();
			ab.setFullName("EYE CARE PROVIDER");
			ab.setEmail("kwon_younggu@yahoo.ca");
			ab.setEmailConfirmationToken("1234567890");
			MyEmail.emailSignupConfirmation(ab);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

	}

}
