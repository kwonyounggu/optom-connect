package com.ohip.mri.beans;

import java.io.Serializable;

import java.text.SimpleDateFormat;

import java.util.Date;

import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

public class HEBBean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = "HE"; 
	private String recordIdentifier = "B"; 
	private String techSpecReleaseIdentifier = "V03";
	private String MOHOfficeCode = " ";
	private String batchIdentification = "111101010001";//creation data 'YYYYMMDD0001'
	private String operatorNumber = "000000";
	private String groupNumber = "0000";
	private String careProviderNumber = "000000";
	private String speciality = "56";
	//private char[] reservedForMOH = new char[42];//42 spaces
	private String reservedForMOH = StringUtils.leftPad("", 42);
	private int sequentialNumber = 0;

	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public HEBBean()
	{
	}
	public HEBBean(int sequentialNumber, String careProviderNumber) //which is 3-4 digits
	{
		this.sequentialNumber = sequentialNumber;
		this.careProviderNumber = careProviderNumber;
	}
	public HEBBean(String line) throws Exception
	{
	}
	public String getBatchIdentification()
	{
		return new SimpleDateFormat("yyyyMMdd").format(new Date()) + String.format("%04d", sequentialNumber);
	}

	public String getCareProviderNumber()
	{
		return careProviderNumber;
	}
	public void setCareProviderNumber(String careProviderNumber)
	{
		this.careProviderNumber = careProviderNumber;
	}
	@Override
	public String toString()
	{
		return transactionIdentifier + recordIdentifier + techSpecReleaseIdentifier +
			   MOHOfficeCode + getBatchIdentification() + operatorNumber + groupNumber +
			   careProviderNumber + speciality + reservedForMOH;
	}
	public JSONObject getRawLine()
	{
		JSONObject json = new JSONObject();
		json.put("heb", this.toString());
		return json;
	}
	
	public void printIt()
	{
		System.out.println("[Transaction Identifier("+transactionIdentifier.length()+"): [" + transactionIdentifier +"]");
		System.out.println("[Record Identifiation("+recordIdentifier.length()+"): [" + recordIdentifier +"]");
		System.out.println("[Tech Spec Identifier("+techSpecReleaseIdentifier.length()+"): [" + techSpecReleaseIdentifier +"]");
		System.out.println("[MOH Office Code("+MOHOfficeCode.length()+"): [" + MOHOfficeCode +"]");
		System.out.println("[Batch Identification("+getBatchIdentification().length()+"): [" + getBatchIdentification() +"]");
		System.out.println("[Operator Number("+operatorNumber.length()+"): [" + operatorNumber +"]");
		System.out.println("[Group Number("+groupNumber.length()+"): [" + groupNumber +"]");
		System.out.println("[Care Provider Number("+careProviderNumber.length()+"): [" + careProviderNumber +"]");
		System.out.println("[Speciality("+speciality.length()+"): [" + speciality +"]");
		System.out.println("[Reserved for MOH Use("+reservedForMOH.length()+"): [" + reservedForMOH +"]");
	}
	
	public boolean parseLine(String line) throws Exception
	{
		boolean valid = true;
		if (line.length() != 79)
		{
			log.severe("ERROR: this record (HEB) length, " + line.length() +", is not 79!!!");
			valid = false;
		}
		else
		{
			try
			{
				System.out.println("Tx ID: [" + line.substring(0, 0+2) +"] len=[" + line.substring(0, 0+2).length() +"]");
				System.out.println("Record ID: [" + line.substring(2, 2+1) +"] len=[" + line.substring(2, 2+1).length() +"]");
				System.out.println("Tech Spec ID: [" + line.substring(3, 3+3) +"] len=[" + line.substring(3, 3+3).length() +"]");
				System.out.println("MOH Office Code: [" + line.substring(6, 6+1) +"] len=[" + line.substring(6, 6+1).length() +"]");
				System.out.println("Batch ID: [" + line.substring(7, 7+12) +"] len=[" + line.substring(7, 7+12).length() +"]");
				System.out.println("Operator Number: [" + line.substring(19, 19+6) +"] len=[" + line.substring(19, 19+6).length() +"]");
				System.out.println("Group Number: [" + line.substring(25, 25+4) +"] len=[" + line.substring(25, 25+4).length() +"]");
				System.out.println("Care Provider Number: [" + line.substring(29, 29+6) +"] len=[" + line.substring(29, 29+6).length() +"]");
				System.out.println("Speciality: [" + line.substring(35, 35+2) +"] len=[" + line.substring(35, 35+2).length() +"]");
				System.out.println("Reserved for MOH: [" + line.substring(37, 37+42) +"] len=[" + line.substring(37, 37+42).length() +"]");
			}
			catch(Exception e)
			{
				log.severe("Caused by " + e.getCause() + ", " + e.getMessage());
				throw new Exception(e);
				//valid = false;
			}
		}
		return valid;
	}
}
