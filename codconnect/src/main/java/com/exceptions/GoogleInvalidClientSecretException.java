package com.exceptions;

public class GoogleInvalidClientSecretException extends Exception
{

	private static final long serialVersionUID = 579199843843496875L;
	
	public GoogleInvalidClientSecretException(String message)
	{
		super(message);
	}

	public GoogleInvalidClientSecretException(Throwable cause)
	{
		super(cause);
	}

	public GoogleInvalidClientSecretException(String message, Throwable cause)
	{
		super(message, cause);
	}

}
