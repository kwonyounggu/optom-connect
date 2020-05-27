package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.json.JSONObject;

import java.lang.Character;

public class RVHR8Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	
	private String transactionIdentifier = ""; //INDEX = 1, LENGTH = 2
	private char recordType = '0'; //INDEX = 3, LENGTH = 1, should be 7
    private String messageText = "";
	private String reservedForMOH = ""; 
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public RVHR8Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR8Bean(String line) throws Exception
	{
		if (!hrRecord(line)) throw new Exception("HR8 record is corrupted. -- Try again with a standard file!");
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
	public String getMessageText()
	{
		return messageText;
	}
	public void setMessageText(String messageText)
	{
		this.messageText = messageText;
	}
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	public SimpleDateFormat getSimpleDate()
	{
		return simpleDate;
	}
	public void setSimpleDate(SimpleDateFormat simpleDate)
	{
		this.simpleDate = simpleDate;
	}
	public void printRecord()
	{
		System.out.println("Message Facility Record – Health Reconciliation");
		
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
		return "RVHR8Bean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", messageText=" + messageText + ", reservedForMOH=" + reservedForMOH + "]";
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		json.put("messageText", messageText.trim());
		String temp = (String)json.get("messageText");
		if (temp.startsWith("*")) json.put("messageText", "*" + temp.length()); //eg: *78, means 78 asterisks
		
		return json;
	}
	//Occurs Once in every file
	public boolean hrRecord(String line)
	{
		boolean valid = true;

		if (line.length() != 79)
		{
			System.err.println("ERROR: Message Facility Record – Health Reconciliation of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = line.substring(0, 0+2);
				recordType = line.substring(2, 2+1).charAt(0);
				messageText = line.substring(3, 3+70);
				reservedForMOH = line.substring(73, 73+6);
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
