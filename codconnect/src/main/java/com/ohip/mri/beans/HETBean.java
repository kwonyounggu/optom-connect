package com.ohip.mri.beans;

import java.io.Serializable;

import java.text.SimpleDateFormat;

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
	private String reservedForMOH1_1 = "  ";//len=2
	private String feeSubmitted1 = "000000";
	private String numberOfServices1 = "00";
	private String serviceDate1 = String.format("%08d", 0).replace('0', ' ');
	private String diagnosticCode1 = "123 ";
	private String reservedForOOC1 = String.format("%010d", 0).replace('0', ' ');
	private String reservedForMOH1_2 = " ";
	
	private String serviceCode2 = String.format("%05d", 0).replace('0', ' ');
	private String reservedForMOH2_1 = "  ";
	private String feeSubmitted2 = String.format("%06d", 0).replace('0', ' ');
	private String numberOfServices2 = "  ";
	private String serviceDate2 = String.format("%08d", 0).replace('0', ' ');
	private String diagnosticCode2 = String.format("%04d", 0).replace('0', ' ');
	private String reservedForOOC2 = String.format("%010d", 0).replace('0', ' ');
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
					this.serviceCode2 = jsonObj.getString(keyStr).length() != 5 ? this.serviceCode2 : jsonObj.getString(keyStr);
					break;
				}
				case "feeSubmitted1": 
				{
					this.feeSubmitted1 = "00" + jsonObj.getString(keyStr).replaceAll("(\\$|\\.)", "");
					break;
				}
				case "feeSubmitted2": 
				{
					if (jsonObj.getString(keyStr).length() == 6)
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
		return transactionIdentifier + recordIdentifier + serviceCode1 + reservedForMOH1_1 +
				feeSubmitted1 + numberOfServices1 + serviceDate1 + diagnosticCode1 + reservedForOOC1 + reservedForMOH1_2 +
				serviceCode2 + reservedForMOH2_1 +
				feeSubmitted2 + numberOfServices2 + serviceDate2 + diagnosticCode2 + reservedForOOC2 + reservedForMOH2_2;
	}
	public JSONObject getRawLine()
	{
		JSONObject json = new JSONObject();
		json.put("het", this.toString());
		return json;
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
		System.out.println("[Service Code#2("+serviceCode2.length()+"): [" + serviceCode2 +"]");
		System.out.println("[Reserved for MOH("+reservedForMOH2_1.length()+"): [" + reservedForMOH2_1 +"]");
		System.out.println("[Fee Submitted("+feeSubmitted2.length()+"): [" + feeSubmitted2 +"]");
		System.out.println("[Number of Services("+numberOfServices2.length()+"): [" + numberOfServices2 +"]");
		System.out.println("[Service Date("+serviceDate2.length()+"): [" + serviceDate2 +"]");
		System.out.println("[Diagnostic Code("+diagnosticCode2.length()+"): [" + diagnosticCode2 +"]");
		System.out.println("[Reserved for OOC("+reservedForOOC2.length()+"): [" + reservedForOOC2 +"]");
		System.out.println("[Reserved for MOH("+reservedForMOH2_2.length()+"): [" + reservedForMOH2_2 +"]");
	}
	public boolean parseLine(String line) throws Exception
	{
		boolean valid = true;
		if (line.length() != 79)
		{
			log.severe("ERROR: this file length, " + line.length() +", is not 79!!!");
			valid = false;
		}
		else
		{
			try
			{
				System.out.println("Tx ID: [" + line.substring(0, 0+2) +"] len=[" + line.substring(0, 0+2).length() +"]");
				System.out.println("Record ID: [" + line.substring(2, 2+1) +"] len=[" + line.substring(2, 2+1).length() +"]");
				System.out.println("Service Code #1: [" + line.substring(3, 3+5) +"] len=[" + line.substring(3, 3+5).length() +"]");
				System.out.println("Reserved for MOH: [" + line.substring(8, 8+2) +"] len=[" + line.substring(8, 8+2).length() +"]");
				System.out.println("Fee Submitted: [" + line.substring(10, 10+6) +"] len=[" + line.substring(10, 10+6).length() +"]");
				System.out.println("Number of Services: [" + line.substring(16, 16+2) +"] len=[" + line.substring(16, 16+2).length() +"]");
				System.out.println("Service Date: [" + line.substring(18, 18+8) +"] len=[" + line.substring(18, 18+8).length() +"]");
				System.out.println("Diagnostic Code: [" + line.substring(26, 26+4) +"] len=[" + line.substring(26, 26+4).length() +"]");
				System.out.println("Reserved for OOC: [" + line.substring(30, 30+10) +"] len=[" + line.substring(30, 30+10).length() +"]");
				System.out.println("Reserved for MOH: [" + line.substring(40, 40+1) +"] len=[" + line.substring(40, 40+1).length() +"]");
				System.out.println("Service Code #2: [" + line.substring(41, 41+5) +"] len=[" + line.substring(41, 41+5).length() +"]");
				System.out.println("Reserved for MOH: [" + line.substring(46, 46+2) +"] len=[" + line.substring(46, 46+2).length() +"]");
				System.out.println("Fee Submitted: [" + line.substring(48, 48+6) +"] len=[" + line.substring(48, 48+6).length() +"]");
				System.out.println("Number of Services: [" + line.substring(54, 54+2) +"] len=[" + line.substring(54, 54+2).length() +"]");
				System.out.println("Service Date: [" + line.substring(56, 56+8) +"] len=[" + line.substring(56, 56+8).length() +"]");
				System.out.println("Diagnostic Code: [" + line.substring(64, 64+4) +"] len=[" + line.substring(64, 64+4).length() +"]");
				System.out.println("Reserved for OOC: [" + line.substring(68, 68+10) +"] len=[" + line.substring(68, 68+10).length() +"]");
				System.out.println("Reserved for MOH: [" + line.substring(78, 78+1) +"] len=[" + line.substring(78, 78+1).length() +"]");
			}
			catch (NumberFormatException e)
			{
				log.severe("ERROR -> NumberFormatException: " + e.getMessage());
				valid = false;
			}

			catch(Exception e)
			{
				log.severe("Caused by " + e.getCause() + ", " + e.getMessage());
				valid = false;
			}
		}
		return valid;
	}
}
