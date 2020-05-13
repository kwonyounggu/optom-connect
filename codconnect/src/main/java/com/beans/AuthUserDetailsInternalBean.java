package com.beans;

import java.io.Serializable;
import java.sql.Timestamp;

import org.json.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

import com.utilities.TokenUtil;

public class AuthUserDetailsInternalBean implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int id = -1;
	private String fullName = "";
	private String firstName = "";
	private String lastName = "";
	private String email = "";
	private String passwordSalt = "";
	private String passwordHash = "";
	private String passwordHashAlgorithm = "";
	private String passwordReminderToken = "";
	private Timestamp passwordReminderExpire = null; //without timezone
	private String emailConfirmationToken = "";
	private int authUserAccountStatusId = -1;
	private int authUserAuthorizationLevelId = -1;
	private boolean acceptTermsOfService = false;
	private String timezone = "";
	private Timestamp registrationTime = null;
	
	public AuthUserDetailsInternalBean()
	{
		
	}
	/*
	 * See https://gist.github.com/craSH/5217757 for encryption and decryption
	 * */
	public AuthUserDetailsInternalBean(JSONObject jsonObj)
	{
		fullName = jsonObj.getString("fullName").toLowerCase();
		email = jsonObj.getString("email").toLowerCase();
		passwordSalt = BCrypt.gensalt(12);//default 10
		passwordHash = BCrypt.hashpw(jsonObj.getString("password"), passwordSalt);
		timezone = jsonObj.getString("timezone");
		authUserAccountStatusId = 2;//EMAIL NON CONFIRMED
		authUserAuthorizationLevelId = 10;//STD USER
		acceptTermsOfService = true;

		//72 hours given for email-confirmation otherwise it will be deleted
		emailConfirmationToken = new TokenUtil().getJWT(email, fullName, "signup", 72*60*60*1000);
	}
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public String getFullName()
	{
		return fullName;
	}
	public void setFullName(String fullName)
	{
		this.fullName = fullName;
	}
	public String getFirstName()
	{
		return firstName;
	}
	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}
	public String getLastName()
	{
		return lastName;
	}
	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}
	public String getEmail()
	{
		return email;
	}
	public void setEmail(String email)
	{
		this.email = email;
	}
	public String getPasswordSalt()
	{
		return passwordSalt;
	}
	public void setPasswordSalt(String passwordSalt)
	{
		this.passwordSalt = passwordSalt;
	}
	public String getPasswordHash()
	{
		return passwordHash;
	}
	public void setPasswordHash(String passwordHash)
	{
		this.passwordHash = passwordHash;
	}
	public String getPasswordHashAlgorithm()
	{
		return passwordHashAlgorithm;
	}
	public void setPasswordHashAlgorithm(String passwordHashAlgorithm)
	{
		this.passwordHashAlgorithm = passwordHashAlgorithm;
	}
	public String getPasswordReminderToken()
	{
		return passwordReminderToken;
	}
	public void setPasswordReminderToken(String passwordReminderToken)
	{
		this.passwordReminderToken = passwordReminderToken;
	}
	public Timestamp getPasswordReminderExpire()
	{
		return passwordReminderExpire;
	}
	public void setPasswordReminderExpire(Timestamp passwordReminderExpire)
	{
		this.passwordReminderExpire = passwordReminderExpire;
	}
	public String getEmailConfirmationToken()
	{
		return emailConfirmationToken;
	}
	public void setEmailConfirmationToken(String emailConfirmationToken)
	{
		this.emailConfirmationToken = emailConfirmationToken;
	}
	public int getAuthUserAccountStatusId()
	{
		return authUserAccountStatusId;
	}
	public void setAuthUserAccountStatusId(int authUserAccountStatusId)
	{
		this.authUserAccountStatusId = authUserAccountStatusId;
	}
	public int getAuthUserAuthorizationLevelId()
	{
		return authUserAuthorizationLevelId;
	}
	public void setAuthUserAuthorizationLevelId(int authUserAuthorizationLevelId)
	{
		this.authUserAuthorizationLevelId = authUserAuthorizationLevelId;
	}
	public boolean isAcceptTermsOfService()
	{
		return acceptTermsOfService;
	}
	public void setAcceptTermsOfService(boolean acceptTermsOfService)
	{
		this.acceptTermsOfService = acceptTermsOfService;
	}
	public String getTimezone()
	{
		return timezone;
	}
	public void setTimezone(String timezone)
	{
		this.timezone = timezone;
	}
	public Timestamp getRegistrationTime()
	{
		return registrationTime;
	}
	public void setRegistrationTime(Timestamp registrationTime)
	{
		this.registrationTime = registrationTime;
	}
	@Override
	public String toString()
	{
		return "AuthUserDetailsInternalBean [id=" + id + ", fullName=" + fullName + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", email=" + email + ", passwordSalt=" + passwordSalt + ", passwordHash="
				+ passwordHash + ", passwordHashAlgorithm=" + passwordHashAlgorithm + ", passwordReminderToken="
				+ passwordReminderToken + ", passwordReminderExpire=" + passwordReminderExpire
				+ ", emailConfirmationToken=" + emailConfirmationToken + ", authUserAccountStatusId="
				+ authUserAccountStatusId + ", authUserAuthorizationLevelId=" + authUserAuthorizationLevelId
				+ ", acceptTermsOfService=" + acceptTermsOfService + ", timezone=" + timezone + ", registrationTime="
				+ registrationTime + "]";
	}
	
	public static boolean isValidPassword(String passwordPlaintext, String passwordHashed) throws Exception
	{
		if(passwordHashed.isEmpty() || !passwordHashed.startsWith("$2a$"))
		{
			throw new Exception("Invalid password hash value provided for comparision");
		}
		return BCrypt.checkpw(passwordPlaintext, passwordHashed);
	}
}
