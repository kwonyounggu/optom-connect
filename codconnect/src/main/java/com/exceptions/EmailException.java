package com.exceptions;

public class EmailException extends RuntimeException
{
	private static final long serialVersionUID = 3694738639233219060L;

	public EmailException(String message)
	{
		super(message);
	}

	public EmailException(Throwable cause)
	{
		super(cause);
	}

	public EmailException(String message, Throwable cause)
	{
		super(message, cause);
	}

}
