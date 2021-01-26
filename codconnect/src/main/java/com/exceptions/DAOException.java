package com.exceptions;

public class DAOException extends RuntimeException
{
	private static final long serialVersionUID = 3694738639233219060L;

	public DAOException(String message)
	{
		super(message);
	}

	public DAOException(Throwable cause)
	{
		super(cause);
	}

	public DAOException(String message, Throwable cause)
	{
		super(message, cause);
	}

}
