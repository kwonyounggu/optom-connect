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
	private String accountingNumber = "        ";
	private String paymentProgram = "HCP";
	private String payee = "P";
	private String referringCareProviderNumber = "      ";
	private String masterNumber = "    ";
	private String inPatientAdmissionDate = "        ";
	private String referringLabLicence = "    ";
	private String manualReviewIndicator = " ";
	private String serviceLocationIndicator = "    ";
	private String reservedForOOC = "           ";
	private String reservedForMOH = "      ";

	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public HEHBean()
	{
	}
	public HEHBean(JSONObject jsonObj) throws Exception
	{
		for(Object key: jsonObj.keySet())
		{
			String keyStr = (String)key;
			
			switch(keyStr)
			{
				case "ohipNumber":
				{
					String[] healthNumberPieces = jsonObj.getString(keyStr).split(" - ");
					if (healthNumberPieces.length < 4) throw new Exception("Heath Card Number is invalid. -- Check it out!");
					for(int i=0; i<healthNumberPieces.length; i++)
					{
						switch(i)
						{
							case 0: 
							{
									if (healthNumberPieces[i].matches("\\d{4}")) this.healthNumber = healthNumberPieces[i];
									else throw new Exception("Heath Card Number is invalid. -- Check it out!");
									break;
							}
							case 1: 
							case 2: 
							{
								if (healthNumberPieces[i].matches("\\d{3}")) this.healthNumber += healthNumberPieces[i];
								else throw new Exception("Heath Card Number is invalid. -- Check it out!");
								break;
							}
							case 3: 
							{
								this.versionCode = healthNumberPieces[i].replaceAll("_", " "); 
								break;
							}
							default: break;
						}
						
					}
				}
				case "patientDob":
				{
					this.patientDob = jsonObj.getString(keyStr).replaceAll("-", "");
					break;
				}
				case "accountingNumber":
				{
					this.accountingNumber = jsonObj.getString(keyStr);
					break;
				}
				default: break;
			}
		}
	}

	@Override
	public String toString()
	{
		return transactionIdentifier + recordIdentifier + healthNumber + versionCode +
				patientDob + accountingNumber + paymentProgram + payee +
				referringCareProviderNumber + masterNumber + inPatientAdmissionDate + referringLabLicence + 
				manualReviewIndicator + serviceLocationIndicator + reservedForOOC + reservedForMOH;
	}
	public JSONObject getRawLine()
	{
		JSONObject json = new JSONObject();
		json.put("heh", this.toString());
		return json;
	}
	public void printIt()
	{
		
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
		
	}
	public boolean parseLine(String line) throws Exception
	{
		boolean valid = true;
		if (line.length() != 79)
		{
			log.severe("ERROR: this record (HEH) length, " + line.length() +", is not 79!!!");
			valid = false;
		}
		else
		{
			try
			{
				System.out.println("Tx ID: [" + line.substring(0, 0+2) +"] len=[" + line.substring(0, 0+2).length() +"]");
				System.out.println("Record ID: [" + line.substring(2, 2+1) +"] len=[" + line.substring(2, 2+1).length() +"]");
				System.out.println("Health Number: [" + line.substring(3, 3+10) +"] len=[" + line.substring(3, 3+10).length() +"]");
				System.out.println("Version Code: [" + line.substring(13, 13+2) +"] len=[" + line.substring(13, 13+2).length() +"]");
				System.out.println("Patient Dob: [" + line.substring(15, 15+8) +"] len=[" + line.substring(15, 15+8).length() +"]");
				System.out.println("Accounting Number: [" + line.substring(23, 23+8) +"] len=[" + line.substring(23, 23+8).length() +"]");
				System.out.println("Payment Program: [" + line.substring(31, 31+3) +"] len=[" + line.substring(31, 31+3).length() +"]");
				System.out.println("Payee: [" + line.substring(34, 34+1) +"] len=[" + line.substring(34, 34+1).length() +"]");
				System.out.println("Referring H Care Provider Number: [" + line.substring(35, 35+6) +"] len=[" + line.substring(35, 35+6).length() +"]");
				System.out.println("Master Number: [" + line.substring(41, 41+4) +"] len=[" + line.substring(41, 41+4).length() +"]");
				System.out.println("In-Patient Admission Date: [" + line.substring(45, 45+8) +"] len=[" + line.substring(45, 45+8).length() +"]");
				System.out.println("Referring Lab Lic Number: [" + line.substring(53, 53+4) +"] len=[" + line.substring(53, 53+4).length() +"]");
				System.out.println("Manual Review Indicator: [" + line.substring(57, 57+1) +"] len=[" + line.substring(57, 57+1).length() +"]");
				System.out.println("Svc Loc Indicator: [" + line.substring(58, 58+4) +"] len=[" + line.substring(58, 58+4).length() +"]");
				System.out.println("Reserved for OOC: [" + line.substring(62, 62+11) +"] len=[" + line.substring(62, 62+11).length() +"]");
				System.out.println("Reserved for MOH: [" + line.substring(73, 73+6) +"] len=[" + line.substring(73, 73+6).length() +"]");
			}

			catch(Exception e)
			{
				log.severe("Caused by " + e.getCause() + ", " + e.getMessage());
				throw new Exception(e);
				//valid = false;
			}
		}
		return valid;
	}
	
}
