package com.ohip.mri.beans;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

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
	private char[] reservedForMOH = new char[42];//42 spaces
	private int sequentialNumber = 0;

	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public HEBBean()
	{
		// TODO Auto-generated constructor stub
		setReservedForMOH();
	}
	public HEBBean(int sequentialNumber, String careProviderNumber) //which is 3-4 digits
	{
		this.sequentialNumber = sequentialNumber;
		this.careProviderNumber = careProviderNumber;
		setReservedForMOH();
	}
	public HEBBean(String line) throws Exception
	{
	}
	public String getReservedForMOH()
	{
		return String.copyValueOf(reservedForMOH);
	}
	public void setReservedForMOH()
	{
		Arrays.fill(reservedForMOH, ' ');
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
			   careProviderNumber + speciality + getReservedForMOH();
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
		System.out.println("[Reserved for MOH Use("+getReservedForMOH().length()+"): [" + getReservedForMOH() +"]");
	}
	
}
