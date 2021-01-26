package com.beans;

import java.io.Serializable;

public class AuthSnsAsyncOperationStatusTypeBean implements Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id = -1;
	private String name = "";
	
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	@Override
	public String toString()
	{
		return "AuthSnsAsyncOperationStatusTypeBean [id=" + id + ", name=" + name + "]";
	}	
}
