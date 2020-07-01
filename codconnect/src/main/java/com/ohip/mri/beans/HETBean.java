package com.ohip.mri.beans;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
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
	private String reservedForMOH1_1 = "  ";
	private String feeSubmitted1 = "123400";
	private String numberOfServices1 = "00";
	private String serviceDate1 = "        ";
	private String diagnosticCode1 = "123 ";
	private String reservedForOOC1 = "          ";
	private String reservedForMOH1_2 = " ";
	
	private String serviceCode2 = "12345";
	private String reservedForMOH2_1 = "  ";
	private String feeSubmitted2 = "123400";
	private String numberOfServices2 = "00";
	private String serviceDate2 = "        ";
	private String diagnosticCode2 = "123 ";
	private String reservedForOOC2 = "          ";
	private String reservedForMOH2_2 = " ";
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public HETBean()
	{
	}
	public HETBean(JSONObject jsonObj) throws Exception
	{
		
	}

	private void setParameters(String healthNumberVersionCode, String patientDob, String accountingNumber) throws Exception
	{
		/*
		this.accountingNumber = accountingNumber;
		this.patientDob = patientDob.replace("-", "");
		String[] healthNumberPieces = healthNumberVersionCode.split(" - ");
		if (healthNumberPieces.length < 4) throw new Exception("Heath Card Number is invalid. -- Check it out!");
		for(int i=0; i<healthNumberPieces.length; i++)
		{
			//System.out.println(healthNumberPieces[i]);
			switch(i)
			{
				case 0: //System.out.println(healthNumberPieces[i].matches("\\d{4}"));
						if (healthNumberPieces[i].matches("\\d{4}")) this.healthNumber = healthNumberPieces[i];
						else throw new Exception("Heath Card Number is invalid. -- Check it out!");
						break;
				case 1: //System.out.println(healthNumberPieces[i].matches("\\d{3}")); break;
				case 2: if (healthNumberPieces[i].matches("\\d{3}")) this.healthNumber += healthNumberPieces[i];
						else throw new Exception("Heath Card Number is invalid. -- Check it out!");
						break;
				case 3: this.versionCode = healthNumberPieces[i].replace("_", " "); 
						//System.out.println(this.versionCode.matches("[A-Z]{2}")); 
						//System.out.println(this.versionCode);
						break;
				default: break;
			}
			
		}
		*/
	}

	@Override
	public String toString()
	{
		return   
				"";
	}
	public void printIt()
	{
		/*
		System.out.println("[Transaction Identifier("+transactionIdentifier.length()+"): [" + transactionIdentifier +"]");
		System.out.println("[Record Identifiation("+recordIdentifier.length()+"): [" + recordIdentifier +"]");
		System.out.println("[Health Number("+healthNumber.length()+"): [" + healthNumber +"]");
		System.out.println("[Version Code("+versionCode.length()+"): [" + versionCode +"]");
		System.out.println("[Patient DOB("+patientDob.length()+"): [" + patientDob +"]");
		System.out.println("[Accounting Number("+accountingNumber.length()+"): [" + accountingNumber +"]");
		System.out.println("[Payment Program("+paymentProgram.length()+"): [" + paymentProgram +"]");
		System.out.println("[Payee("+payee.length()+"): [" + payee +"]");
		System.out.println("[Referring Care Provider("+referringCareProviderNumber.length()+"): [" + referringCareProviderNumber +"]");
		System.out.println("[Master Number("+masterNumber.length()+"): [" + masterNumber +"]");
		System.out.println("[In-Patient Admission Date("+inPatientAdmissionDate.length()+"): [" + inPatientAdmissionDate +"]");
		System.out.println("[Referring Lab Licence("+referringLabLicence.length()+"): [" + referringLabLicence +"]");
		System.out.println("[Manual Review Indicator("+manualReviewIndicator.length()+"): [" + manualReviewIndicator +"]");
		System.out.println("[Service Location Indicator("+serviceLocationIndicator.length()+"): [" + serviceLocationIndicator +"]");
		System.out.println("[Reserved For OOC("+reservedForOOC.length()+"): [" + reservedForOOC +"]");
		System.out.println("[Reserved for MOH Use("+reservedForMOH.length()+"): [" + reservedForMOH +"]");
		*/
	}

}