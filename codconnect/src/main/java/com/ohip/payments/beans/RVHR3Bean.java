package com.ohip.payments.beans;

import java.io.Serializable;

import org.json.JSONObject;


public class RVHR3Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	
	private String transactionIdentifier = "hr"; //INDEX = 1, LENGTH = 2
	private char recordType = '3'; //INDEX = 3, LENGTH = 1
	/*
	 * address line 2 and address line 3 As registered with the ministry
	 */
	private String addressLine2 = ""; //INDEX = 4, LENGTH = 25
	private String addressLine3 = ""; //INDEX = 29, LENGTH = 25
	private String reservedForMOH = ""; //INDEX = 54, LENGTH = 26

	public RVHR3Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR3Bean(String line) throws Exception
	{
		if (!hrRecord(line)) throw new Exception("HR3 record is corrupted. -- Try again with a standard file!");
	}
	public String getTransactionIdentifier()
	{
		return transactionIdentifier;
	}
	public void setTransactionIdentifier(String transactionIdentifier)
	{
		this.transactionIdentifier = transactionIdentifier;
	}
	public char getRecordType()
	{
		return recordType;
	}
	public void setRecordType(char recordType)
	{
		this.recordType = recordType;
	}

	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	public String getAddressLine2()
	{
		return addressLine2;
	}
	public void setAddressLine2(String addressLine2)
	{
		this.addressLine2 = addressLine2;
	}
	public String getAddressLine3()
	{
		return addressLine3;
	}
	public void setAddressLine3(String addressLine3)
	{
		this.addressLine3 = addressLine3;
	}
	@Override
	public String toString()
	{
		return "ThirdRecordBean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", addressLine2=" + addressLine2 + ", addressLine3=" + addressLine3 + ", reservedForMOH="
				+ reservedForMOH + "]";
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		
		return json;
	}
	public void printRecord()
	{
		String[] addr = addressLine2.split("\\s+");
		//System.out.println(" ,\"" + addressLine2 + "\"");
		for (int i=0; i<addr.length; i++)
			System.out.print(",\"" + addr[i] + "\"");
		
		addr = addressLine3.split("\\s+");
		for (int i=0; i<addr.length; i++)
			System.out.print(",\"" + addr[i] + "\"");
		System.out.println();
	}
	//Occurs Once in every file - always the first record
	public boolean hrRecord(String line)
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR3\") = " + line.indexOf("HR3") + ", TOTAL LENGTH = " + line.length());//total len = 80
		
		if (line.length() != 79)
		{
			System.err.println("ERROR: the 3rd record of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else if (line.indexOf("HR3") != 0)
		{
			System.err.println("ERROR: this file does not contain HR3 in the 3rd record.");
			valid = false;
		}
		else
		{
			transactionIdentifier = line.substring(0, 0+2);
			recordType = line.substring(2, 2+1).charAt(0);
			addressLine2 = line.substring(3, 3+25);
			addressLine3 = line.substring(28, 28+25);
			reservedForMOH = line.substring(53, 53+26);
		}
		return valid;
	}

}
