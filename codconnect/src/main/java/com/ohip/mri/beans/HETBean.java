package com.ohip.mri.beans;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

public class HETBean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = "HE"; 
	private String recordIdentifier = "T"; 
	private String serviceCode1 = "12345";
	private String reservedForMOH1_1 = "  ";
	private String feeSubmitted1 = "000000";
	private String numberOfServices1 = "00";
	private String serviceDate1 = "        ";
	private String diagnosticCode1 = "123 ";
	private String reservedForOOC1 = "          ";
	private String reservedForMOH1_2 = " ";
	
	private String serviceCode2 = "     ";
	private String reservedForMOH2_1 = "  ";
	private String feeSubmitted2 = "000000";
	private String numberOfServices2 = "00";
	private String serviceDate2 = "        ";
	private String diagnosticCode2 = "    ";
	private String reservedForOOC2 = "          ";
	private String reservedForMOH2_2 = " ";
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public HETBean()
	{
	}
	public HETBean(JSONObject jsonObj) throws Exception
	{
		//to do here
		for(Object key: jsonObj.keySet())
		{
			String keyStr = (String)key;
			
			switch(keyStr)
			{
				case "serviceCode1": 
				{
					this.serviceCode1 = jsonObj.getString(keyStr);
					break;
				}
				case "serviceCode2": 
				{
					this.serviceCode2 = jsonObj.getString(keyStr).length() != 5 ? "     " : jsonObj.getString(keyStr);
					break;
				}
				case "feeSubmitted1": 
				{
					this.feeSubmitted1 = "00" + jsonObj.getString(keyStr).replaceAll("(\\$|\\.)", "");
					break;
				}
				case "feeSubmitted2": 
				{
					if (jsonObj.getString(keyStr).length() == 5)
						this.feeSubmitted2 = "00" + jsonObj.getString(keyStr).replaceAll("(\\$|\\.)", "");
					break;
				}
				case "numberOfServices1": 
				{
					this.numberOfServices1 = "0" + jsonObj.getString(keyStr);
					break;
				}
				case "numberOfServices2": 
				{
					if (jsonObj.getString(keyStr).length() == 1)
						this.numberOfServices2 = "0" + jsonObj.getString(keyStr);
					break;
				}
				case "serviceDate1": 
				{
					this.serviceDate1 = jsonObj.getString(keyStr).replaceAll("-", "");
					break;
				}
				case "serviceDate2": 
				{
					if (jsonObj.getString(keyStr).length() == 10)
						this.serviceDate2 = jsonObj.getString(keyStr).replaceAll("-", "");
					break;
				}
				case "diagnosticCode1": 
				{
					this.diagnosticCode1 = jsonObj.getString(keyStr) + " ";
					break;
				}
				case "diagnosticCode2": 
				{
					if (jsonObj.getString(keyStr).length() == 3)
						this.diagnosticCode2 = jsonObj.getString(keyStr) + " ";
					break;
				}
				default: break;
			}
		}
	}

	@Override
	public String toString()
	{
		return   
				"";
	}
	public void printIt()
	{
		System.out.println("[Transaction Identifier("+transactionIdentifier.length()+"): [" + transactionIdentifier +"]");
		System.out.println("[Record Identification("+recordIdentifier.length()+"): [" + recordIdentifier +"]");
		System.out.println("[Service Code#1("+serviceCode1.length()+"): [" + serviceCode1 +"]");
		System.out.println("[Reserved for MOH("+reservedForMOH1_1.length()+"): [" + reservedForMOH1_1 +"]");
		System.out.println("[Fee Submitted("+feeSubmitted1.length()+"): [" + feeSubmitted1 +"]");
		System.out.println("[Number of Services("+numberOfServices1.length()+"): [" + numberOfServices1 +"]");
		System.out.println("[Service Date("+serviceDate1.length()+"): [" + serviceDate1 +"]");
		System.out.println("[Diagnostic Code("+diagnosticCode1.length()+"): [" + diagnosticCode1 +"]");
		System.out.println("[Reserved for OOC("+reservedForOOC1.length()+"): [" + reservedForOOC1 +"]");
		System.out.println("[Reserved for MOH("+reservedForMOH1_2.length()+"): [" + reservedForMOH1_2 +"]");
		System.out.println("[Service Code#1("+serviceCode2.length()+"): [" + serviceCode2 +"]");
		System.out.println("[Reserved for MOH("+reservedForMOH2_1.length()+"): [" + reservedForMOH2_1 +"]");
		System.out.println("[Fee Submitted("+feeSubmitted2.length()+"): [" + feeSubmitted2 +"]");
		System.out.println("[Number of Services("+numberOfServices2.length()+"): [" + numberOfServices2 +"]");
		System.out.println("[Service Date("+serviceDate2.length()+"): [" + serviceDate2 +"]");
		System.out.println("[Diagnostic Code("+diagnosticCode2.length()+"): [" + diagnosticCode2 +"]");
		System.out.println("[Reserved for OOC("+reservedForOOC2.length()+"): [" + reservedForOOC2 +"]");
		System.out.println("[Reserved for MOH("+reservedForMOH2_2.length()+"): [" + reservedForMOH2_2 +"]");
	}

}
