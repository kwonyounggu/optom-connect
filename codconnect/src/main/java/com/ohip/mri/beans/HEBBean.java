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
	private char recordIdentifier = 'B'; 
	private String techSpecReleaseIdentifier = "V03";
	private String MOHOfficeCode = " ";
	private String batchIdentification = "111101010001";//creation data 'YYYYMMDD0001'
	private String operatorNumber = "000000";
	private String groupNumber = "0000";
	private String careProviderNumber = "000000";
	private String speciality = "56";
	private char[] reservedForMOH = new char[42];//42 spaces

	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public HEBBean()
	{
		// TODO Auto-generated constructor stub
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
		return new SimpleDateFormat("yyyyMMdd0SSS").format(new Date());
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
		return "HEBBean [batchIdentification=" + batchIdentification + "]";
	}
	
}
