package com.beans;

import java.io.Serializable;
import java.sql.Timestamp;

public class AuthUserExternalLoginBean implements Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id = -1;
	private int authUserAccountId = -1;
	private int authExternalAuthenticationProviderId = -1;
	private String externalUserId = "-1";
	private String name = "";
	private String email = "";
	private Timestamp loginTime = null;
	

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public int getAuthUserAccountId()
	{
		return authUserAccountId;
	}

	public void setAuthUserAccountId(int authUserAccountId)
	{
		this.authUserAccountId = authUserAccountId;
	}

	public int getAuthExternalAuthenticationProviderId()
	{
		return authExternalAuthenticationProviderId;
	}

	public void setAuthExternalAuthenticationProviderId(int authExternalAuthenticationProviderId)
	{
		this.authExternalAuthenticationProviderId = authExternalAuthenticationProviderId;
	}

	public String getExternalUserId()
	{
		return externalUserId;
	}

	public void setExternalUserId(String externalUserId)
	{
		this.externalUserId = externalUserId;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	public Timestamp getLoginTime()
	{
		return loginTime;
	}

	public void setLoginTime(Timestamp loginTime)
	{
		this.loginTime = loginTime;
	}

	@Override
	public String toString()
	{
		return "AuthUserExternalLoginBean [id=" + id + ", authUserAccountId=" + authUserAccountId
				+ ", authExternalAuthenticationProviderId=" + authExternalAuthenticationProviderId + ", externalUserId="
				+ externalUserId + ", name=" + name + ", email=" + email + ", loginTime=" + loginTime + "]";
	}
}
