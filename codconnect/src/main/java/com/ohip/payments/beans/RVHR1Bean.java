package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import org.json.JSONObject;

public class RVHR1Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	
	private String transactionIdentifier = "HR"; //INDEX = 1, LENGTH = 2
	private char recordType = '1'; //INDEX = 3, LENGTH = 1
	private String techSpecReleaseIdentifier = "V03"; //INDEX = 4, LENGTH = 3
	private char reservedForMOH1 = '0'; //INDEX = 7, LENGTH = 1
	private String groupNumber = "0000"; //INDEX = 8, LENGTH = 4 
	private int healthCareProvider = -1; //INDEX = 12, LENGTH = 6
	private int speciality = -1; //INDEX = 18, LENGTH = 2
	private char mohOfficeCode = 'B'; //INDEX = 20, LENGTH = 1
	private int remittanceAdviceSequence = 7; //INDEX = 21, LENGTH = 1
	private Date paymentDate = null; //20191015, INDEX = 22, LENGTH = 8
	private String payeeName = "KWON                          ";//INDEX = 30, LENGTH = 30
	
	/*******************************************************************************
	Accumulation of the Amount Paid for all claim items appearing on the remittance
	advice Plus and/or Minus any Accounting Transactions and Balance Forward amounts.
	*******************************************************************************/
	private float totalAmountPayable = 0.0f; //INDEX = 60, LENGTH = 9 
	private char totalAmountPayableSign = ' '; //INDEX = 69, LENGTH = 1
	private String chequeNumber = "00000000"; //INDEX = 70, LENGTH = 8, 99999999 means 'direct deposit'
	private String reservedForMOH2 = ""; //INDEX = 78, LENGTH = 2
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public RVHR1Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR1Bean(String line) throws Exception
	{
		if (!hrRecord(line)) throw new Exception("HR1 record is corrupted. -- Try again with a standard file!");
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

	public String getTechSpecReleaseIdentifier()
	{
		return techSpecReleaseIdentifier;
	}

	public void setTechSpecReleaseIdentifier(String techSpecReleaseIdentifier)
	{
		this.techSpecReleaseIdentifier = techSpecReleaseIdentifier;
	}

	public char getReservedForMOH1()
	{
		return reservedForMOH1;
	}

	public void setReservedForMOH1(char reservedForMOH1)
	{
		this.reservedForMOH1 = reservedForMOH1;
	}

	public String getGroupNumber()
	{
		return groupNumber;
	}

	public void setGroupNumber(String groupNumber)
	{
		this.groupNumber = groupNumber;
	}

	public int getHealthCareProvider()
	{
		return healthCareProvider;
	}

	public void setHealthCareProvider(int healthCareProvider)
	{
		this.healthCareProvider = healthCareProvider;
	}

	public int getSpeciality()
	{
		return speciality;
	}

	public void setSpeciality(int speciality)
	{
		this.speciality = speciality;
	}

	public char getMohOfficeCode()
	{
		return mohOfficeCode;
	}

	public void setMohOfficeCode(char mohOfficeCode)
	{
		this.mohOfficeCode = mohOfficeCode;
	}

	public int getRemittanceAdviceSequence()
	{
		return remittanceAdviceSequence;
	}

	public void setRemittanceAdviceSequence(int remittanceAdviceSequence)
	{
		this.remittanceAdviceSequence = remittanceAdviceSequence;
	}

	public Date getPaymentDate()
	{
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate)
	{
		this.paymentDate = paymentDate;
	}

	public String getPayeeName()
	{
		return payeeName;
	}

	public void setPayeeName(String payeeName)
	{
		this.payeeName = payeeName;
	}

	public float getTotalAmountPayable()
	{
		return totalAmountPayable;
	}

	public void setTotalAmountPayable(float totalAmountPayable)
	{
		this.totalAmountPayable = totalAmountPayable;
	}

	public char getTotalAmountPayableSign()
	{
		return totalAmountPayableSign;
	}

	public void setTotalAmountPayableSign(char totalAmountPayableSign)
	{
		this.totalAmountPayableSign = totalAmountPayableSign;
	}

	public String getChequeNumber()
	{
		return chequeNumber;
	}

	public void setChequeNumber(String chequeNumber)
	{
		this.chequeNumber = chequeNumber;
	}

	public String getReservedForMOH2()
	{
		return reservedForMOH2;
	}

	public void setReservedForMOH2(String reservedForMOH2)
	{
		this.reservedForMOH2 = reservedForMOH2;
	}

	@Override
	public String toString()
	{
		return "FirstRecordBean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", techSpecReleaseIdentifier=" + techSpecReleaseIdentifier + ", reservedForMOH1=" + reservedForMOH1
				+ ", groupNumber=" + groupNumber + ", healthCareProvider=" + healthCareProvider + ", speciality="
				+ speciality + ", mohOfficeCode=" + mohOfficeCode + ", remittanceAdviceSequence="
				+ remittanceAdviceSequence + ", payeeName=" + payeeName + ", totalAmountPayable=" + totalAmountPayable
				+ ", totalAmountPayableSign=" + totalAmountPayableSign + ", chequeNumber=" + chequeNumber
				+ ", reservedForMOH2=" + reservedForMOH2 
				+ ", paymentDate=" + simpleDate.format(paymentDate) + "]";
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		
		return json;
	}
	public void printRecord()
	{
		System.out.println("Provider Number:, " + healthCareProvider);
		System.out.println("Payment Date:, " + simpleDate.format(paymentDate));
		System.out.println("Payee Name:, " + "\"" + payeeName + "\"");
		System.out.println("Payment Method:, " + (chequeNumber.equals("99999999") ? "Direct deposit" : ("Cheque: " + chequeNumber)));
		NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.CANADA);
		System.out.println("Total Amount Payable:, \"" + currencyFormat.format((double)totalAmountPayable) + "\"");
		//System.out.println("(Accumulation of the Amount Paid for all claim items appearing on the remittance advice Plus and/or Minus any Accounting Transactions and Balance Forward amounts)");
	}
	//Occurs Once in every file - always the first record
	public boolean hrRecord(String line)
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR1V030\") = " + line.indexOf("HR1V030") + ", TOTAL LENGTH = " + line.length());//total len = 79
		
		if (line.length() != 79)
		{
			System.err.println("ERROR: this file does not contain HR1V030 in the first record.");
			valid = false;
		}
		else if (line.indexOf("HR1V030") != 0)
		{
			System.err.println("ERROR: this file does not contain HR1V030 in the first record.");
			valid = false;
		}
		else
		{
			try
			{
				groupNumber = line.substring(7, 7+4);
				healthCareProvider = Integer.parseInt(line.substring(11, 11+6));
				speciality = Integer.parseInt(line.substring(17, 17+2));
				mohOfficeCode = line.substring(19, 20).charAt(0);
				remittanceAdviceSequence = Integer.parseInt(line.substring(20, 21));
				paymentDate = new SimpleDateFormat("yyyy/MM/dd").parse(line.substring(21, 21+4)+"/"+line.substring(25, 25+2)+"/"+line.substring(27, 27+2));
				payeeName = line.substring(29, 29+30);
				totalAmountPayable = (float)Integer.parseInt(line.substring(59, 59+9))/100;
				totalAmountPayableSign = line.substring(68, 69).charAt(0);
				chequeNumber = line.substring(69, 69+8);
				reservedForMOH2 = line.substring(77, 77+2);
			}
			catch (NumberFormatException e)
			{
				System.err.println("ERROR -> NumberFormatException: " + e.getMessage());
			}
			catch (ParseException e)
			{
				System.err.println("ERROR -> ParseException: " + e.getMessage());
			}
		}
		return valid;
	}

}
