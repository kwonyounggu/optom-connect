package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class RVHR4Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	
	private String transactionIdentifier = "hr"; //INDEX = 1, LENGTH = 2
	private char recordType = '4'; //INDEX = 3, LENGTH = 1
	private String claimNumber = ""; 
	private int transactionType = -1;
	private int healthcareProvider = -1;
	private int speciality = -1;
	private String accountingNumber = "";
	private String patientLastName = "";
	private String patientFirstName = "";
	private String provinceCode = "";
	private String healthRegistrationNumber = "";
	private String versionCode = "";
	private String paymentProgram = "";
	private String serviceLocator = "";
	private String mohGroupIdentifier = "";
	private String reservedForMOH = ""; //INDEX = 54, LENGTH = 26

	public RVHR4Bean()
	{
		// TODO Auto-generated constructor stub 
	}
	public RVHR4Bean(String line) throws Exception
	{
		if (!hr4Record(line)) throw new Exception("HR4 record is corrupted. -- Try again with a standard file!");
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
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
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
	public int getHealthcareProvider()
	{
		return healthcareProvider;
	}
	public void setHealthcareProvider(int healthcareProvider)
	{
		this.healthcareProvider = healthcareProvider;
	}
	public int getSpeciality()
	{
		return speciality;
	}
	public void setSpeciality(int speciality)
	{
		this.speciality = speciality;
	}
	public String getAccountingNumber()
	{
		return accountingNumber;
	}
	public void setAccountingNumber(String accountingNumber)
	{
		this.accountingNumber = accountingNumber;
	}
	public String getPatientLastName()
	{
		return patientLastName;
	}
	public void setPatientLastName(String patientLastName)
	{
		this.patientLastName = patientLastName;
	}
	public String getPatientFirstName()
	{
		return patientFirstName;
	}
	public void setPatientFirstName(String patientFirstName)
	{
		this.patientFirstName = patientFirstName;
	}
	public String getProvinceCode()
	{
		return provinceCode;
	}
	public void setProvinceCode(String provinceCode)
	{
		this.provinceCode = provinceCode;
	}
	public String getHealthRegistrationNumber()
	{
		return healthRegistrationNumber;
	}
	public void setHealthRegistrationNumber(String healthRegistrationNumber)
	{
		this.healthRegistrationNumber = healthRegistrationNumber;
	}
	public String getVersionCode()
	{
		return versionCode;
	}
	public void setVersionCode(String versionCode)
	{
		this.versionCode = versionCode;
	}
	public String getPaymentProgram()
	{
		return paymentProgram;
	}
	public void setPaymentProgram(String paymentProgram)
	{
		this.paymentProgram = paymentProgram;
	}
	public String getMohGroupIdentifier()
	{
		return mohGroupIdentifier;
	}
	public void setMohGroupIdentifier(String mohGroupIdentifier)
	{
		this.mohGroupIdentifier = mohGroupIdentifier;
	}
	@Override
	public String toString()
	{
		return "ClaimHR4RecordBean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", claimNumber=" + claimNumber + ", transactionType=" + transactionType + ", healthcareProvider="
				+ healthcareProvider + ", speciality=" + speciality + ", accountingNumber=" + accountingNumber
				+ ", patientLastName=" + patientLastName + ", patientFirstName=" + patientFirstName + ", provinceCode="
				+ provinceCode + ", healthRegistrationNumber=" + healthRegistrationNumber + ", versionCode="
				+ versionCode + ", paymentProgram=" + paymentProgram 
				+ "serviceLocator=" + serviceLocator + ", mohGroupIdentifier=" + mohGroupIdentifier
				+ ", reservedForMOH=" + reservedForMOH + "]";
	}
	public void printHR4Record()
	{
		System.out.print(accountingNumber + ", " + claimNumber + ", " + transactionType + ", " + healthRegistrationNumber + ", " + versionCode);
	}
	//Occurs Once in every file - always the first record
	public boolean hr4Record(String line)
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR4\") = " + line.indexOf("HR4") + ", TOTAL LENGTH = " + line.length());//total len = 79
		
		if (line.length() != 79)
		{
			System.err.println("ERROR: the hr4 record of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else if (line.indexOf("HR4") != 0)
		{
			System.err.println("ERROR: this file does not contain HR4 in the record.");
			valid = false;
		}
		else
		{
			transactionIdentifier = line.substring(0, 0+2);
			recordType = line.substring(2, 2+1).charAt(0);
			claimNumber = line.substring(3, 3+11);
			transactionType = Integer.parseInt(line.substring(14, 15));
			healthcareProvider = Integer.parseInt(line.substring(15, 15+6));
			speciality = Integer.parseInt(line.substring(21, 21+2));
			accountingNumber = line.substring(23, 23+8);
			patientLastName = line.substring(31, 31+14);
			patientFirstName = line.substring(45, 45+5);
			provinceCode = line.substring(50, 50+2);
			healthRegistrationNumber = line.substring(52, 52+12);
			versionCode = line.substring(64, 64+2);
			paymentProgram = line.substring(66, 66+3);
			serviceLocator = line.substring(69, 69+4);
			mohGroupIdentifier = line.substring(73, 73+4);
			reservedForMOH = line.substring(77, 77+2);
		}
		return valid;
	}
	public String getServiceLocator()
	{
		return serviceLocator;
	}
	public void setServiceLocator(String serviceLocator)
	{
		this.serviceLocator = serviceLocator;
	}

}
