package com.beans;

import java.io.Serializable;

public class AuthSnsAsyncOperationBean implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id = -1;
	private int authExternalAuthenticationProviderId = -1;
	private int authSnsAsyncOperationStatusTypeId = -1;
	private int authUserExternalLoginId = -1;
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public int getAuthExternalAuthenticationProviderId()
	{
		return authExternalAuthenticationProviderId;
	}
	public void setAuthExternalAuthenticationProviderId(int authExternalAuthenticationProviderId)
	{
		this.authExternalAuthenticationProviderId = authExternalAuthenticationProviderId;
	}
	public int getAuthSnsAsyncOperationStatusTypeId()
	{
		return authSnsAsyncOperationStatusTypeId;
	}
	public void setAuthSnsAsyncOperationStatusTypeId(int authSnsAsyncOperationStatusTypeId)
	{
		this.authSnsAsyncOperationStatusTypeId = authSnsAsyncOperationStatusTypeId;
	}
	public int getAuthUserExternalLoginId()
	{
		return authUserExternalLoginId;
	}
	public void setAuthUserExternalLoginId(int authUserExternalLoginId)
	{
		this.authUserExternalLoginId = authUserExternalLoginId;
	}
	@Override
	public String toString()
	{
		return "AuthSnsAsyncOperationBean [id=" + id + ", authExternalAuthenticationProviderId="
				+ authExternalAuthenticationProviderId + ", authSnsAsyncOperationStatusTypeId="
				+ authSnsAsyncOperationStatusTypeId + ", authUserExternalLoginId=" + authUserExternalLoginId + "]";
	}
}
