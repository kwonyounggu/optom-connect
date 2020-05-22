package com.beans;

import java.io.Serializable;

public class FileInfoBean implements Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//P: Remittance Advice, X: Rejection, E: Regular Error, F: Individual Claims Error, B: Batch Edit Report
	private char fType = 'A'; 
	private int fMonth = -1; //1: A->Jan, 2: B->Feb, etc
	//6 digit health care provider/4 digit group number for P-RA, 
	//6 digits-the position of the file sequence for X-Rerejct,
	//5 digits-batch control number for B-Batch Edit Report
	private String fNumber = "0000"; 
	private String fExt = "000";
	
	private String name = ""; //mroFile, which is from Content-Disposition line
	private String fileName = "";
	
	public FileInfoBean()
	{
		// TODO Auto-generated constructor stub
	}

	public char getfType()
	{
		return fType;
	}
	public void setfType(char fType)
	{
		this.fType = fType;
	}
	public int getfMonth()
	{
		return fMonth;
	}
	public void setfMonth(int fMonth)
	{
		this.fMonth = fMonth;
	}
	public String getfNumber()
	{
		return fNumber;
	}
	public void setfNumber(String fNumber)
	{
		this.fNumber = fNumber;
	}
	public String getfExt()
	{
		return fExt;
	}
	public void setfExt(String fExt)
	{
		this.fExt = fExt;
	}
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	public String getFileName()
	{
		return fileName;
	}
	public void setFileName(String fileName) throws Exception
	{
		this.fileName = fileName;
		this.fExt = fileName.split("\\.")[1];
		this.fType = fileName.charAt(0);
		this.fMonth = Character.getNumericValue(fileName.charAt(1)) - 9; //So A: 1... D:4
		this.fNumber = fileName.substring(2, fileName.lastIndexOf('.'));
	}
	@Override
	public String toString()
	{
		return "FileInfoBean [fType=" + fType + ", fMonth=" + fMonth + ", fNumber=" + fNumber + ", fExt=" + fExt
				+ ", name=" + name + ", fileName=" + fileName + "]";
	}
	
}