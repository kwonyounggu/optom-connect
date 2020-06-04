package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

import java.lang.Character;

public class RVHR6Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; //INDEX = 1, LENGTH = 2
	private char recordType = '0'; //INDEX = 3, LENGTH = 1, should be 7
	private double amtBrtFwdClaimsAdjustment = 0.0d;
	private char amtBrtFwdClaimsAdjustmentSign = '\0'; 
	private double amtBrtFwdClaimsAdvances = 0.0d; 
	private char amtBrtFwdClaimsAdvancesSign = '\0'; 
	private double amtBrtFwdReductions = 0.0d; 
	private char amtBrtFwdReductionsSign = '\0'; 
	private double amtBrtFwdOtherDeductions = 0.0d; 
	private char amtBrtFwdOtherDeductionsSign = '\0'; 
	private String reservedForMOH = ""; 
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public RVHR6Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR6Bean(String line) throws Exception
	{
		if (!hrRecord(line)) throw new Exception("HR6 record is corrupted. -- Try again with a standard file!");
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
	public double getAmtBrtFwdClaimsAdjustment()
	{
		return amtBrtFwdClaimsAdjustment;
	}
	public void setAmtBrtFwdClaimsAdjustment(double amtBrtFwdClaimsAdjustment)
	{
		this.amtBrtFwdClaimsAdjustment = amtBrtFwdClaimsAdjustment;
	}
	public char getAmtBrtFwdClaimsAdjustmentSign()
	{
		return amtBrtFwdClaimsAdjustmentSign;
	}
	public void setAmtBrtFwdClaimsAdjustmentSign(char amtBrtFwdClaimsAdjustmentSign)
	{
		this.amtBrtFwdClaimsAdjustmentSign = amtBrtFwdClaimsAdjustmentSign;
	}
	public double getAmtBrtFwdClaimsAdvances()
	{
		return amtBrtFwdClaimsAdvances;
	}
	public void setAmtBrtFwdClaimsAdvances(double amtBrtFwdClaimsAdvances)
	{
		this.amtBrtFwdClaimsAdvances = amtBrtFwdClaimsAdvances;
	}
	public char getAmtBrtFwdClaimsAdvancesSign()
	{
		return amtBrtFwdClaimsAdvancesSign;
	}
	public void setAmtBrtFwdClaimsAdvancesSign(char amtBrtFwdClaimsAdvancesSign)
	{
		this.amtBrtFwdClaimsAdvancesSign = amtBrtFwdClaimsAdvancesSign;
	}
	public double getAmtBrtFwdReductions()
	{
		return amtBrtFwdReductions;
	}
	public void setAmtBrtFwdReductions(double amtBrtFwdReductions)
	{
		this.amtBrtFwdReductions = amtBrtFwdReductions;
	}
	public char getAmtBrtFwdReductionsSign()
	{
		return amtBrtFwdReductionsSign;
	}
	public void setAmtBrtFwdReductionsSign(char amtBrtFwdReductionsSign)
	{
		this.amtBrtFwdReductionsSign = amtBrtFwdReductionsSign;
	}
	public double getAmtBrtFwdOtherDeductions()
	{
		return amtBrtFwdOtherDeductions;
	}
	public void setAmtBrtFwdOtherDeductions(double amtBrtFwdOtherDeductions)
	{
		this.amtBrtFwdOtherDeductions = amtBrtFwdOtherDeductions;
	}
	public char getAmtBrtFwdOtherDeductionsSign()
	{
		return amtBrtFwdOtherDeductionsSign;
	}
	public void setAmtBrtFwdOtherDeductionsSign(char amtBrtFwdOtherDeductionsSign)
	{
		this.amtBrtFwdOtherDeductionsSign = amtBrtFwdOtherDeductionsSign;
	}
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	public void printRecord()
	{
		System.out.println("Balance Forward Record – Health Reconciliation");
		
		/*
		System.out.print("Tx Code:, ");
		switch(Integer.parseInt(transactionCode))
		{
			case 10: System.out.println("10 - Advance"); break;
			case 20: System.out.println("20 - Reduction"); break;
			case 30: System.out.println("30 - Unused"); break;
			case 40: System.out.println("40 - Advance repayment"); break;
			case 50: System.out.println("50 - Accounting adjustment"); break;
			case 60: System.out.println("60 - Error or Unknown"); break;
			case 70: System.out.println("70 - Attachments"); break;
			default: System.out.println("Unknown - " + transactionCode); break;
		}
		System.out.print("Cheque Indicator: ,");
		switch(chequeIndicator)
		{
			case 'M': System.out.println("M - Manual Cheque issued"); break;
			case 'C': System.out.println("C - Computer Cheque issued"); break;
			case 'I': System.out.println("I - Interim payment/Direct Bank Deposit issued"); break;
			default: System.out.println("Unknown - " + chequeIndicator); break;
		}
		
		System.out.println("Transaction Date:, " + simpleDate.format(transactionDate));
		NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.CANADA);
		System.out.println("Transaction Amount:, \"" + currencyFormat.format((double)transactionAmount) + "\"");
		
		System.out.println("Transaction Amount Sign: , " + (Character.isWhitespace(transactionAmountSign) ? "Positive" : (transactionAmountSign == '-' ? "Negative" : "Unknown")));
		System.out.println("Transaction Message:, " + transactionMessage);
		
		*/
		
	}
	
	@Override
	public String toString()
	{
		return "RVHR6Bean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", amtBrtFwdClaimsAdjustment=" + amtBrtFwdClaimsAdjustment + ", amtBrtFwdClaimsAdjustmentSign="
				+ amtBrtFwdClaimsAdjustmentSign + ", amtBrtFwdClaimsAdvances=" + amtBrtFwdClaimsAdvances
				+ ", amtBrtFwdClaimsAdvancesSign=" + amtBrtFwdClaimsAdvancesSign + ", amtBrtFwdReductions="
				+ amtBrtFwdReductions + ", amtBrtFwdReductionsSign=" + amtBrtFwdReductionsSign
				+ ", amtBrtFwdOtherDeductions=" + amtBrtFwdOtherDeductions + ", amtBrtFwdOtherDeductionsSign="
				+ amtBrtFwdOtherDeductionsSign + ", reservedForMOH=" + reservedForMOH + "]";
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		json.put("amtBrtFwdClaimsAdjustment", Character.compare(amtBrtFwdClaimsAdjustmentSign, '-')==0 ? (-amtBrtFwdClaimsAdjustment) : amtBrtFwdClaimsAdjustment);
		json.put("amtBrtFwdClaimsAdjustmentSign", Character.toString(amtBrtFwdClaimsAdjustmentSign).trim());
		json.put("amtBrtFwdClaimsAdvances", Character.compare(amtBrtFwdClaimsAdvancesSign, '-')==0 ? (-amtBrtFwdClaimsAdvances) : amtBrtFwdClaimsAdvances);
		json.put("amtBrtFwdClaimsAdvancesSign", Character.toString(amtBrtFwdClaimsAdvancesSign).trim());
		json.put("amtBrtFwdReductions", Character.compare(amtBrtFwdReductionsSign, '-')==0 ? (-amtBrtFwdReductions) : amtBrtFwdReductions);
		json.put("amtBrtFwdReductionsSign", Character.toString(amtBrtFwdReductionsSign).trim());
		json.put("amtBrtFwdOtherDeductions", Character.compare(amtBrtFwdOtherDeductionsSign, '-')==0 ? (-amtBrtFwdOtherDeductions) : amtBrtFwdOtherDeductions);
		json.put("amtBrtFwdOtherDeductionsSign", Character.toString(amtBrtFwdOtherDeductionsSign).trim());
	    json.put("reservedForMOH", reservedForMOH);
		return json;
	}
	public static String getInsertStmtTo_ohip_mro_hr6(JSONObject json, int ohip_mro_hr1_id)
	{
		return "insert into ohip_mro_hr6 values(default, 'HR', '6', " + 
														"" + json.getFloat("amtBrtFwdClaimsAdjustment") + ", " +
													   "'" + json.getString("amtBrtFwdClaimsAdjustmentSign") + "', " +
													   "" + json.getFloat("amtBrtFwdClaimsAdvances") + ", " +
													   "'" + json.getString("amtBrtFwdClaimsAdvancesSign") + "', " +
													   "" + json.getFloat("amtBrtFwdReductions") + ", " +
													   "'" + json.getString("amtBrtFwdReductionsSign") + "', " +
													   "" + json.getFloat("amtBrtFwdOtherDeductions") + ", " +
													   "'" + json.getString("amtBrtFwdOtherDeductionsSign") + "', " +
													   "'" + json.getString("reservedForMOH") + "', " +
														   + ohip_mro_hr1_id + ");";
		
														           
	}
	//Occurs Once in every file
	public boolean hrRecord(String line)
	{
		boolean valid = true;

		if (line.length() != 79)
		{
			log.severe("ERROR: Balance Forward Record – Health Reconciliation of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = line.substring(0, 0+2);
				recordType = line.substring(2, 2+1).charAt(0);
				amtBrtFwdClaimsAdjustment = Double.parseDouble(line.substring(3, 3+9))/100;
				amtBrtFwdClaimsAdjustmentSign = line.substring(12, 12+1).charAt(0);
				amtBrtFwdClaimsAdvances = Double.parseDouble(line.substring(13, 13+9))/100;
				amtBrtFwdClaimsAdvancesSign = line.substring(22, 22+1).charAt(0);
				amtBrtFwdReductions = Double.parseDouble(line.substring(23, 23+9))/100;
				amtBrtFwdReductionsSign = line.substring(32, 32+1).charAt(0);
				amtBrtFwdOtherDeductions = Double.parseDouble(line.substring(33, 33+9))/100;
				amtBrtFwdOtherDeductionsSign = line.substring(42, 42+1).charAt(0);

				reservedForMOH = line.substring(43, 43+36).trim();
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
