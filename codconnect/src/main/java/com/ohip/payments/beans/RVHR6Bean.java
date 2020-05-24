package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.json.JSONObject;

import java.lang.Character;

public class RVHR6Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	
	private String transactionIdentifier = ""; //INDEX = 1, LENGTH = 2
	private char recordType = '0'; //INDEX = 3, LENGTH = 1, should be 7
	private double amtBrtFwdClaimsAdjustment = 0.0d;
	private char amtBrtFwdClaimsAdjustmentSign = '\0'; 
	private double amtBrtFwdClaimsAdvances = 0.0d; 
	private char amtBrtFwdClaimsAdvancesSign = '\0'; 
	private double amtBrtFwdReductions = 0.0d; 
	private char amtBrtFwdReductionsSign = '\0'; 
	private double amtBrtFwdOtherReductions = 0.0d; 
	private char amtBrtFwdOtherReductionsSign = '\0'; 
	private String reservedForMOH = ""; 
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public RVHR6Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR6Bean(String line) throws Exception
	{
		if (!hr6Record(line)) throw new Exception("HR6 record is corrupted. -- Try again with a standard file!");
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
	public double getAmtBrtFwdOtherReductions()
	{
		return amtBrtFwdOtherReductions;
	}
	public void setAmtBrtFwdOtherReductions(double amtBrtFwdOtherReductions)
	{
		this.amtBrtFwdOtherReductions = amtBrtFwdOtherReductions;
	}
	public char getAmtBrtFwdOtherReductionsSign()
	{
		return amtBrtFwdOtherReductionsSign;
	}
	public void setAmtBrtFwdOtherReductionsSign(char amtBrtFwdOtherReductionsSign)
	{
		this.amtBrtFwdOtherReductionsSign = amtBrtFwdOtherReductionsSign;
	}
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	public void printHR6Record()
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
				+ ", amtBrtFwdOtherReductions=" + amtBrtFwdOtherReductions + ", amtBrtFwdOtherReductionsSign="
				+ amtBrtFwdOtherReductionsSign + ", reservedForMOH=" + reservedForMOH + "]";
	}
	public JSONObject getHR6Json()
	{
		JSONObject json = new JSONObject();
		json.put("amtBrtFwdClaimsAdjustment", amtBrtFwdClaimsAdjustment);
		json.put("amtBrtFwdClaimsAdjustmentSign", amtBrtFwdClaimsAdjustmentSign);
		json.put("amtBrtFwdClaimsAdvances", amtBrtFwdClaimsAdvances);
		json.put("amtBrtFwdClaimsAdvancesSign", amtBrtFwdClaimsAdvancesSign);
		json.put("amtBrtFwdReductions", amtBrtFwdReductions);
		json.put("amtBrtFwdReductionsSign", amtBrtFwdReductionsSign);
		json.put("amtBrtFwdOtherReductions", amtBrtFwdOtherReductions);
		json.put("amtBrtFwdOtherReductionsSign", amtBrtFwdOtherReductionsSign);
	
		return json;
	}
	//Occurs Once in every file
	public boolean hr6Record(String line)
	{
		boolean valid = true;

		if (line.length() != 79)
		{
			System.err.println("ERROR: Balance Forward Record – Health Reconciliation of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
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
				amtBrtFwdOtherReductions = Double.parseDouble(line.substring(33, 33+9))/100;
				amtBrtFwdOtherReductionsSign = line.substring(42, 42+1).charAt(0);

				reservedForMOH = line.substring(43, 43+36);
			}
			catch (NumberFormatException e)
			{
				System.err.println("ERROR -> NumberFormatException: " + e.getMessage());
				valid = false;
			}
			catch (Exception e)
			{
				System.err.println("ERROR -> Exception: " + e.getMessage());
				valid = false;
			}
		}
		return valid;
	}

}
