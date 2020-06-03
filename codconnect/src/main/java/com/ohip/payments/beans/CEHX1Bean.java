package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

public class CEHX1Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; 
	private char recordIdentifier = '0'; 
	private String techSpecReleaseIdentifier = "000";
	private char mohOfficeCode = 'z';
	private String reservedForMOH1 = ""; //INDEX = 7, LENGTH = 1
	private String operatorNumber = "000000"; //from batch header 
	private String groupNumber = "0000"; //from batch header
	private String providerNumber = "000000"; //from batch header
	private int speciality = -1; //from batch header
	private String stationNumber = "000";
	private Date claimProcessDate = null; //20191015, INDEX = 22, LENGTH = 8
	private String reservedForMOH2 = ""; //INDEX = 7, LENGTH = 1
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public CEHX1Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public CEHX1Bean(String line) throws Exception
	{
		if (!parseRecord(line)) throw new Exception("HX1 record is corrupted. -- Try again with a standard file!");
	}
	public String getTransactionIdentifier()
	{
		return transactionIdentifier;
	}
	public void setTransactionIdentifier(String transactionIdentifier)
	{
		this.transactionIdentifier = transactionIdentifier;
	}
	public char getRecordIdentifier()
	{
		return recordIdentifier;
	}
	public void setRecordIdentifier(char recordIdentifier)
	{
		this.recordIdentifier = recordIdentifier;
	}
	public String getTechSpecReleaseIdentifier()
	{
		return techSpecReleaseIdentifier;
	}
	public void setTechSpecReleaseIdentifier(String techSpecReleaseIdentifier)
	{
		this.techSpecReleaseIdentifier = techSpecReleaseIdentifier;
	}
	public char getMohOfficeCode()
	{
		return mohOfficeCode;
	}
	public void setMohOfficeCode(char mohOfficeCode)
	{
		this.mohOfficeCode = mohOfficeCode;
	}
	public String getOperatorNumber()
	{
		return operatorNumber;
	}
	public void setOperatorNumber(String operatorNumber)
	{
		this.operatorNumber = operatorNumber;
	}
	public String getGroupNumber()
	{
		return groupNumber;
	}
	public void setGroupNumber(String groupNumber)
	{
		this.groupNumber = groupNumber;
	}
	public String getProviderNumber()
	{
		return providerNumber;
	}
	public void setProviderNumber(String providerNumber)
	{
		this.providerNumber = providerNumber;
	}
	public int getSpeciality()
	{
		return speciality;
	}
	public void setSpeciality(int speciality)
	{
		this.speciality = speciality;
	}
	public String getStationNumber()
	{
		return stationNumber;
	}
	public void setStationNumber(String stationNumber)
	{
		this.stationNumber = stationNumber;
	}
	public Date getClaimProcessDate()
	{
		return claimProcessDate;
	}
	public void setClaimProcessDate(Date claimProcessDate)
	{
		this.claimProcessDate = claimProcessDate;
	}
	public SimpleDateFormat getSimpleDate()
	{
		return simpleDate;
	}
	public void setSimpleDate(SimpleDateFormat simpleDate)
	{
		this.simpleDate = simpleDate;
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		/*
		json.put("groupNumber", groupNumber);//Check this with fileInfo
		json.put("healthCareProvider", healthCareProvider);//Check this with fileInfo
		json.put("speciality", speciality);
		json.put("mohOfficeCode", Character.toString(mohOfficeCode));
		json.put("remittanceAdviceSequence", remittanceAdviceSequence); //Type 7 which is in tech spec.
		json.put("paymentDate", simpleDate.format(paymentDate));
		//json.put("payeeName", payeeName);
		json.put("lastName", payeeName.substring(0, 24).trim());
		json.put("title", payeeName.substring(25, 27).trim());
		json.put("initials", payeeName.substring(28).trim());
		json.put("totalAmountPayable", Character.compare(totalAmountPayableSign, '-')==0 ? (-totalAmountPayable) : totalAmountPayable);
		json.put("totalAmountPayableSign", Character.toString(totalAmountPayableSign).trim());
		json.put("chequeNumber", chequeNumber);
		//json.put("chequeNumber", (chequeNumber.equals("99999999") ? "Direct deposit" : (chequeNumber.trim().isEmpty() ? "Pay Patient" : chequeNumber)));
		json.put("reservedForMOH2", reservedForMOH2);
		*/
		return json;
	}
	public static String getInsertStmtTo_ohip_mro_hr1(JSONObject json, int ohip_mro_tx_history_id)
	{
		/*
		return "insert into ohip_mro_hr1 values(default, 'HR', '1', 'V03', '0', '" + json.getString("groupNumber") + "', " +
														"" + json.getInt("healthCareProvider") + ", " +
														"" + json.getInt("speciality") + ", " +
													   "'" + json.getString("mohOfficeCode") + "', " +
														"" + json.getInt("remittanceAdviceSequence") + ", " +
													   "'" + json.getString("paymentDate") + "', " +
													   "'" + json.getString("title") + "|" + json.getString("initials") + "|" + json.getString("lastName") + "', " +
													    "" + json.getFloat("totalAmountPayable") + ", " +
													   "'" + json.getString("totalAmountPayableSign") + "', " +
													   "'" + json.getString("chequeNumber") + "', " +
													   "'" + json.getString("reservedForMOH2") + "', " +
														   + ohip_mro_tx_history_id + ");";
		*/
		
		return null;												           
	}
	public void printRecord()
	{
		/*
		System.out.println("Provider Number:, " + healthCareProvider);
		System.out.println("Payment Date:, " + simpleDate.format(paymentDate));
		System.out.println("Payee Name:, " + "\"" + payeeName + "\"");
		System.out.println("Payment Method:, " + (chequeNumber.equals("99999999") ? "Direct deposit" : ("Cheque: " + chequeNumber)));
		NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.CANADA);
		System.out.println("Total Amount Payable:, \"" + currencyFormat.format((double)totalAmountPayable) + "\"");
		*/
	}

	@Override
	public String toString()
	{
		return "CEHX1Bean [transactionIdentifier=" + transactionIdentifier + ", recordIdentifier=" + recordIdentifier
				+ ", techSpecReleaseIdentifier=" + techSpecReleaseIdentifier + ", mohOfficeCode=" + mohOfficeCode
				+ ", reservedForMOH1=" + reservedForMOH1 + ", operatorNumber=" + operatorNumber + ", groupNumber="
				+ groupNumber + ", providerNumber=" + providerNumber + ", speciality=" + speciality + ", stationNumber="
				+ stationNumber + ", claimProcessDate=" + claimProcessDate + ", reservedForMOH2=" + reservedForMOH2
				+ "]";
	}
	//Occurs Once in every file - always the first record
	public boolean parseRecord(String line) throws Exception
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR1V030\") = " + line.indexOf("HR1V030") + ", TOTAL LENGTH = " + line.length());//total len = 79
		
		if (line.length() != 79)
		{
			log.severe("ERROR: the HX1 record of the file does not have 79 chars such that " + line);
			valid = false;
		}
		else if (!line.startsWith("HX1V03"))
		{
			log.severe("ERROR: this file does not contain HX1V03 in the first record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = "HX";
				recordIdentifier = '1';
				techSpecReleaseIdentifier = "V03";
				mohOfficeCode = line.substring(6, 6+1).charAt(0);
				reservedForMOH1 = line.substring(7, 7+10).trim();
				operatorNumber = line.substring(17, 17+6);
				groupNumber = line.substring(23, 23+4);
				providerNumber = line.substring(27, 27+6);
				speciality = Integer.parseInt(line.substring(33, 33+2));
				stationNumber = line.substring(35, 35+3);
				claimProcessDate = new SimpleDateFormat("yyyy/MM/dd").parse(line.substring(38, 38+4)+"/"+line.substring(42, 42+2)+"/"+line.substring(44, 44+2));
				reservedForMOH2 = line.substring(46, 46+33);
			}
			catch (NumberFormatException e)
			{
				log.severe("ERROR -> NumberFormatException: " + e.getMessage());
				valid = false;
			}
			catch (ParseException e)
			{
				log.severe("ERROR -> ParseException: " + e.getMessage());
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
