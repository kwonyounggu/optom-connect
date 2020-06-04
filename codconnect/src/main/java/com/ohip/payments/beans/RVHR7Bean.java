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

public class RVHR7Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; //INDEX = 1, LENGTH = 2
	private char recordType = '0'; //INDEX = 3, LENGTH = 1, should be 7
	private String transactionCode = ""; //INDEX = 4, LENGTH = 2
	private char chequeIndicator = '0'; //INDEX = 6, LENGTH = 1
	private Date transactionDate = null; //index = 7, length = 8
	private float transactionAmount = 0.0f; //index = 15, length = 8
	private char transactionAmountSign = '0'; //index = 23, length = 1
	private String transactionMessage = ""; //index = 24, length = 50
	private String reservedForMOH = ""; //INDEX = 74, LENGTH = 6
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public RVHR7Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR7Bean(String line) throws Exception
	{
		if (!hrRecord(line)) throw new Exception("HR7 record is corrupted. -- Try again with a standard file!");
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

	public String getTransactionCode()
	{
		return transactionCode;
	}

	public void setTransactionCode(String transactionCode)
	{
		this.transactionCode = transactionCode;
	}

	public char getChequeIndicator()
	{
		return chequeIndicator;
	}

	public void setChequeIndicator(char chequeIndicator)
	{
		this.chequeIndicator = chequeIndicator;
	}

	public Date getTransactionDate()
	{
		return transactionDate;
	}

	public void setTransactionDate(Date transactionDate)
	{
		this.transactionDate = transactionDate;
	}

	public float getTransactionAmount()
	{
		return transactionAmount;
	}

	public void setTransactionAmount(float transactionAmount)
	{
		this.transactionAmount = transactionAmount;
	}

	public char getTransactionAmountSign()
	{
		return transactionAmountSign;
	}

	public void setTransactionAmountSign(char transactionAmountSign)
	{
		this.transactionAmountSign = transactionAmountSign;
	}

	public String getTransactionMessage()
	{
		return transactionMessage;
	}

	public void setTransactionMessage(String transactionMessage)
	{
		this.transactionMessage = transactionMessage;
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
		return "AccountingTxRecordHR7Bean [transactionIdentifier=" + transactionIdentifier + ", recordType="
				+ recordType + ", transactionCode=" + transactionCode + ", chequeIndicator=" + chequeIndicator
				+ ", transactionAmount=" + transactionAmount + ", transactionAmountSign=" + transactionAmountSign
				+ ", transactionMessage=" + transactionMessage + ", reservedForMOH=" + reservedForMOH 
				+ ", transactionDate=" + simpleDate.format(transactionDate) + "]";
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		switch(Integer.parseInt(transactionCode))
		{
			case 10: json.put("transactionCode", "Advance"); break;
			case 20: json.put("transactionCode", "Reduction"); break;
			case 30: json.put("transactionCode", "Unused"); break;
			case 40: json.put("transactionCode", "Advance repayment"); break;
			case 50: json.put("transactionCode", "Accounting adjustment"); break;
			case 60: json.put("transactionCode", "Error or Unknown"); break;
			case 70: json.put("transactionCode", "Attachments"); break;
			default: json.put("transactionCode", "Unknown"); break;
		}
		json.put("txCodeOrg", transactionCode);
		
		switch(chequeIndicator)
		{
			case 'M': json.put("chequeIndicator", "Manual Cheque issued"); break;
			case 'C': json.put("chequeIndicator", "Computer Cheque issued"); break;
			case 'I': json.put("chequeIndicator", "Interim payment/Direct Bank Deposit issued"); break;
			default:  json.put("chequeIndicator", "Unknown"); break;
		}
		json.put("ciOrg", Character.toString(chequeIndicator));
		
		json.put("transactionDate", simpleDate.format(transactionDate));
		json.put("transactionAmount", Character.compare(transactionAmountSign, '-')==0 ? (-transactionAmount) : transactionAmount);

		json.put("transactionAmountSign", Character.toString(transactionAmountSign).trim());
		json.put("transactionMessage", transactionMessage);
		json.put("reservedForMOH", reservedForMOH);
		
		return json;
	}
	public static String getInsertStmtTo_ohip_mro_hr7(JSONObject json, int ohip_mro_hr1_id)
	{
		return "insert into ohip_mro_hr7 values(default, 'HR', '7', " + 
														"'" + json.getString("txCodeOrg") + "', " +
													   "'" + json.getString("ciOrg") + "', " +
													   "'" + json.getString("transactionDate") + "', " +
													   "" + json.getFloat("transactionAmount") + ", " +
													   "'" + json.getString("transactionAmountSign") + "', " +
													   "'" + json.getString("transactionMessage") + "', " +
													   "'" + json.getString("reservedForMOH") + "', " +
														   + ohip_mro_hr1_id + ");";
		
														           
	}
	public void printRecord()
	{
		System.out.println("Accounting Tx Record - Health Reconciliation");
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
		
	}
	//Occurs Once in every file
	public boolean hrRecord(String line)
	{
		boolean valid = true;

		if (line.length() != 79)
		{
			log.severe("ERROR: the Accounting Tx record - Health Reconciliation of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else if (line.indexOf("HR7") != 0) //just one more check
		{
			log.severe("ERROR: this file does not contain HR7 in the Accounting Tx record - Health Reconciliation.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = line.substring(0, 0+2);
				recordType = line.substring(2, 2+1).charAt(0);
				transactionCode = line.substring(3, 3+2);
				chequeIndicator = line.substring(5, 5+1).charAt(0);
				transactionDate = new SimpleDateFormat("yyyy/MM/dd").parse(line.substring(6, 6+4)+"/"+line.substring(10, 10+2)+"/"+line.substring(12, 12+2));
	
				transactionAmount = (float)Integer.parseInt(line.substring(14, 14+8))/100;
				transactionAmountSign = line.substring(22, 23).charAt(0);
				transactionMessage  = line.substring(23, 23+50).trim();
				reservedForMOH = line.substring(73, 73+6).trim();
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
