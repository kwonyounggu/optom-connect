package com.ohip.mri.beans;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

public class HEHBean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = "HE"; 
	private String recordIdentifier = "H"; 
	private String healthNumber = "1234567890";
	private String versionCode = "zz"; //can be [A ], [ A], [AA]
	private String patientDob = "11110101";//creation data 'YYYYMMDD0001'
	private String accountingNumber = "         ";
	private String paymentProgram = "HCP";
	private String payee = "P";
	private String referringCareProviderNumber = "      ";
	private String masterNumber = "    ";
	private String inPatientAdmissionDate = "      ";
	private String referringLabLicence = "    ";
	private String manualReviewIndicator = " ";
	private String serviceLocationIndicator = "    ";
	private String reservedForOOC = "           ";
	private String reservedForMOH = "      ";

	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public HEHBean()
	{
	}
	public HEHBean(String healthNumberVersionCode, String patientDob) throws Exception
	{
		setParameters(healthNumberVersionCode, patientDob, this.accountingNumber);
	}
	public HEHBean(String healthNumberVersionCode, String patientDob, String accountingNumber) throws Exception
	{
		setParameters(healthNumberVersionCode, patientDob, accountingNumber);
	}
	public HEHBean(String line) throws Exception
	{
	}
	private void setParameters(String healthNumberVersionCode, String patientDob, String accountingNumber) throws Exception
	{
		this.accountingNumber = accountingNumber;
		String[] healthNumberPieces = healthNumberVersionCode.split(" - ");
		for(int i=0; i<healthNumberPieces.length; i++)
		{
			System.out.println(healthNumberPieces[i]);
			switch(i)
			{
				case 0: System.out.println(healthNumberPieces[i].matches("\\d{4}")); 
						//if matches then assign otherwise throws an exception
						break;
				case 1: System.out.println(healthNumberPieces[i].matches("\\d{3}")); break;
				case 2: System.out.println(healthNumberPieces[i].matches("\\d{3}")); break;
				case 3: this.versionCode = healthNumberPieces[i].replace("_", " "); 
						System.out.println(this.versionCode.matches("[A-Z]{2}")); 
						System.out.println(this.versionCode);
						break;
				default: break;
			}
			
		}
	}

	@Override
	public String toString()
	{
		return "";
	}
	public void printIt()
	{
		/*
		System.out.println("[Transaction Identifier("+transactionIdentifier.length()+"): [" + transactionIdentifier +"]");
		System.out.println("[Record Identifiation("+recordIdentifier.length()+"): [" + recordIdentifier +"]");
		System.out.println("[Tech Spec Identifier("+techSpecReleaseIdentifier.length()+"): [" + techSpecReleaseIdentifier +"]");
		System.out.println("[MOH Office Code("+MOHOfficeCode.length()+"): [" + MOHOfficeCode +"]");
		System.out.println("[Batch Identification("+getBatchIdentification().length()+"): [" + getBatchIdentification() +"]");
		System.out.println("[Operator Number("+operatorNumber.length()+"): [" + operatorNumber +"]");
		System.out.println("[Group Number("+groupNumber.length()+"): [" + groupNumber +"]");
		System.out.println("[Care Provider Number("+careProviderNumber.length()+"): [" + careProviderNumber +"]");
		System.out.println("[Speciality("+speciality.length()+"): [" + speciality +"]");
		System.out.println("[Reserved for MOH Use("+getReservedForMOH().length()+"): [" + getReservedForMOH() +"]");
		*/
	}
	
}
