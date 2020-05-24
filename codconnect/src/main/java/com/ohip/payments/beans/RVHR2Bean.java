package com.ohip.payments.beans;

import java.io.Serializable;

import org.json.JSONObject;

public class RVHR2Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	
	private String transactionIdentifier = "hr"; //INDEX = 1, LENGTH = 2
	private char recordType = '2'; //INDEX = 3, LENGTH = 1
	/*
	 * Spaces if a Billing Agent is not registered for this Health Care Provider/ group
	 */
	private String billingAgent = ""; //INDEX = 4, LENGTH = 30
	private String billingAgentAddress = ""; //INDEX = 34, LENGTH = 25
	private String reservedForMOH = ""; //INDEX = 59, LENGTH = 21

	public RVHR2Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR2Bean(String line) throws Exception
	{
		if (!hrRecord(line)) throw new Exception("HR2 record is corrupted. -- Try again with a standard file!");
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
	public String getBillingAgent()
	{
		return billingAgent;
	}
	public void setBillingAgent(String billingAgent)
	{
		this.billingAgent = billingAgent;
	}
	public String getBillingAgentAddress()
	{
		return billingAgentAddress;
	}
	public void setBillingAgentAddress(String billingAgentAddress)
	{
		this.billingAgentAddress = billingAgentAddress;
	}
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	@Override
	public String toString()
	{
		return "SecondRecordBean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", billingAgent=" + billingAgent + ", billingAgentAddress=" + billingAgentAddress
				+ ", reservedForMOH=" + reservedForMOH + "]";
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		
		return json;
	}
	public void printRecord()
	{
		//System.out.println("Billing Agent Address:, \"" + billingAgentAddress + "\"");
		System.out.println("Billing Agent Address:");
		String[] addr = billingAgentAddress.split("\\s+");
		for (int i=0; i<addr.length; i++)
			System.out.print(",\"" + addr[i] + "\"");
		System.out.println();
	}
	//Occurs Once in every file - always the first record
	public boolean hrRecord(String line)
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR2\") = " + line.indexOf("HR2") + ", TOTAL LENGTH = " + line.length());//total len = 80
		
		if (line.length() != 79)
		{
			System.err.println("ERROR: the 2nd record of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else if (line.indexOf("HR2") != 0)
		{
			System.err.println("ERROR: this file does not contain HR2 in the 2nd record.");
			valid = false;
		}
		else
		{
			transactionIdentifier = line.substring(0, 0+2);
			recordType = line.substring(2, 2+1).charAt(0);
			billingAgent = line.substring(3, 3+30);
			billingAgentAddress = line.substring(33, 33+25);
			reservedForMOH = line.substring(58, 58+21);
		}
		return valid;
	}

}
