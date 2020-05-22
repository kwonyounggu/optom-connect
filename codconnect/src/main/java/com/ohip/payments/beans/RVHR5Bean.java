package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class RVHR5Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	
	private String transactionIdentifier = "hr"; //INDEX = 1, LENGTH = 2
	private char recordType = '5'; //INDEX = 3, LENGTH = 1
	private String claimNumber = ""; 
	private int transactionType = -1;
	private Date serviceDate = null;
	private int numberOfServices = -1;
	private String serviceCode = "";
	private String reservedForMOH1 = "";
	private float amountSubmitted = 0.0f;
	private float amountPaid = 0.0f;
	private char amountPaidSign = '+';
	private String explanatoryCode = "";
	private String reservedForMOH2 = ""; 
	
	private String accountingNumber = "";
	private String clinicName = "";
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");
	private NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.CANADA);

	public RVHR5Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR5Bean(String line) throws Exception
	{
		if (!hr5Record(line)) throw new Exception("ERROR: invalid in decoding a hr5 record");
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

	public String getClaimNumber()
	{
		return claimNumber;
	}

	public void setClaimNumber(String claimNumber)
	{
		this.claimNumber = claimNumber;
	}

	public int getTransactionType()
	{
		return transactionType;
	}

	public void setTransactionType(int transactionType)
	{
		this.transactionType = transactionType;
	}

	public Date getServiceDate()
	{
		return serviceDate;
	}

	public void setServiceDate(Date serviceDate)
	{
		this.serviceDate = serviceDate;
	}

	public int getNumberOfServices()
	{
		return numberOfServices;
	}

	public void setNumberOfServices(int numberOfServices)
	{
		this.numberOfServices = numberOfServices;
	}

	public String getServiceCode()
	{
		return serviceCode;
	}

	public void setServiceCode(String serviceCode)
	{
		this.serviceCode = serviceCode;
	}

	public String getReservedForMOH1()
	{
		return reservedForMOH1;
	}

	public void setReservedForMOH1(String reservedForMOH1)
	{
		this.reservedForMOH1 = reservedForMOH1;
	}

	public float getAmountSubmitted()
	{
		return amountSubmitted;
	}

	public void setAmountSubmitted(float amountSubmitted)
	{
		this.amountSubmitted = amountSubmitted;
	}

	public float getAmountPaid()
	{
		return amountPaid;
	}

	public void setAmountPaid(float amountPaid)
	{
		this.amountPaid = amountPaid;
	}

	public char getAmountPaidSign()
	{
		return amountPaidSign;
	}

	public void setAmountPaidSign(char amountPaidSign)
	{
		this.amountPaidSign = amountPaidSign;
	}

	public String getExplanatoryCode()
	{
		return explanatoryCode;
	}

	public void setExplanatoryCode(String explanatoryCode)
	{
		this.explanatoryCode = explanatoryCode;
	}

	public String getReservedForMOH2()
	{
		return reservedForMOH2;
	}

	public void setReservedForMOH2(String reservedForMOH2)
	{
		this.reservedForMOH2 = reservedForMOH2;
	}

	public String getClinicName()
	{
		return clinicName;
	}
	public void setClinicName(String clinicName)
	{
		this.clinicName = clinicName;
	}
	public String getAccountingNumber()
	{
		return accountingNumber;
	}
	public void setAccountingNumber(String accountingNumber)
	{
		if (accountingNumber.trim().startsWith("0002")) clinicName = "RC";
		else if (accountingNumber.trim().startsWith("004")) clinicName = "SC";
		else clinicName = "UNKNOWN";
		this.accountingNumber = accountingNumber;
	}

	@Override
	public String toString()
	{
		return "ClaimHR5RecordBean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", claimNumber=" + claimNumber + ", transactionType=" + transactionType + ", serviceDate="
				+ serviceDate + ", numberOfServices=" + numberOfServices + ", serviceCode=" + serviceCode
				+ ", reservedForMOH1=" + reservedForMOH1 + ", amountSubmitted=" + amountSubmitted + ", amountPaid="
				+ amountPaid + ", amountPaidSign=" + amountPaidSign + ", explanatoryCode=" + explanatoryCode
				+ ", reservedForMOH2=" + reservedForMOH2 + ", accountingNumber=" + accountingNumber + ", clinicName="
				+ clinicName + ", simpleDate=" + simpleDate.format(serviceDate) + ", currencyFormat=" + currencyFormat + "]";
	}
	public void printHR5Record()
	{
		System.out.println(", " + claimNumber + ", " + transactionType + ", " + numberOfServices + ", " + serviceCode + ", " + simpleDate.format(serviceDate) + ", " + currencyFormat.format((double)amountSubmitted) + ", " + currencyFormat.format((double)amountPaid));
	}
	//Occurs Once in every file - always the first record
	public boolean hr5Record(String line)
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR5\") = " + line.indexOf("HR5") + ", TOTAL LENGTH = " + line.length());//total len = 79
		
		if (line.length() != 79)
		{
			System.err.println("ERROR: the hr5 record of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else if (line.indexOf("HR5") != 0)
		{
			System.err.println("ERROR: this file does not contain HR5 in the record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = line.substring(0, 0+2);
				recordType = line.substring(2, 2+1).charAt(0);
				claimNumber = line.substring(3, 3+11);
				transactionType = Integer.parseInt(line.substring(14, 15));
				serviceDate = new SimpleDateFormat("yyyy/MM/dd").parse(line.substring(15, 15+4)+"/"+line.substring(19, 19+2)+"/"+line.substring(21, 21+2));
				numberOfServices = Integer.parseInt(line.substring(23, 23+2));
				serviceCode = line.substring(25, 25+5);
				reservedForMOH1 = line.substring(30, 31);
				amountSubmitted = (float)Integer.parseInt(line.substring(31, 31+6))/100;
				amountPaid = (float)Integer.parseInt(line.substring(37, 37+6))/100;
				amountPaidSign = line.substring(43, 44).charAt(0);
				explanatoryCode = line.substring(44, 44+2);
				reservedForMOH2 = line.substring(46, 46+33);
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
