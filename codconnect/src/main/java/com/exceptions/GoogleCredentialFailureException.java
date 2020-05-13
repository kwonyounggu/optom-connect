package com.exceptions;

public class GoogleCredentialFailureException extends Exception
{
	private static final long serialVersionUID = -8724713824005674123L;
	public GoogleCredentialFailureException(String message)
	{
		super(message);
	}

	public GoogleCredentialFailureException(Throwable cause)
	{
		super(cause);
	}

	public GoogleCredentialFailureException(String message, Throwable cause)
	{
		super(message, cause);
	}

}
