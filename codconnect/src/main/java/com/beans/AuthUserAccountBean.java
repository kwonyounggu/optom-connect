package com.beans;

import java.io.Serializable;

public class AuthUserAccountBean implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id = -1;
	private String screenUserName = "";
	private int authUserDetailsInternalId = -1;
	
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public String getScreenUserName()
	{
		return screenUserName;
	}
	public void setScreenUserName(String screenUserName)
	{
		this.screenUserName = screenUserName;
	}
	public int getAuthUserDetailsInternalId()
	{
		return authUserDetailsInternalId;
	}
	public void setAuthUserDetailsInternalId(int authUserDetailsInternalId)
	{
		this.authUserDetailsInternalId = authUserDetailsInternalId;
	}
	@Override
	public String toString()
	{
		return "AuthUserAccountBean [id=" + id + ", screenUserName=" + screenUserName + ", authUserDetailsInternalId="
				+ authUserDetailsInternalId + "]";
	}
}
