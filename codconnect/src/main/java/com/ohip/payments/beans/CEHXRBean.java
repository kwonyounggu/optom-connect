package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

public class CEHXRBean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; 
	private char recordIdentifier = '0'; 
	private String registrationNumber = "000000000012";
	private String patientLastName = "000000000";
	private String patientFirstName = "00000";
	private char patientSex = '0';
	private String provinceCode = "00";
	private String reservedForMOH = ""; 
	private String errorCode1 = "000"; //Refer to errorcode list
	private String errorCode2 = "000"; //Refer to errorcode list
	private String errorCode3 = "000"; //Refer to errorcode list
	private String errorCode4 = "000"; //Refer to errorcode list
	private String errorCode5 = "000"; //Refer to errorcode list

	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public CEHXRBean()
	{
		// TODO Auto-generated constructor stub
	}
	public CEHXRBean(String line) throws Exception
	{
		if (!parseRecord(line)) throw new Exception("HXR record is corrupted. -- Try again with a standard file!");
	}
	public String getTransactionIdentifier()
	{
		return transactionIdentifier;
	}
	public void setTransactionIdentifier(String transactionIdentifier)
	{
		this.transactionIdentifier = transactionIdentifier;
	}
	public char getRecordIdentifier()
	{
		return recordIdentifier;
	}
	public void setRecordIdentifier(char recordIdentifier)
	{
		this.recordIdentifier = recordIdentifier;
	}
	public String getRegistrationNumber()
	{
		return registrationNumber;
	}
	public void setRegistrationNumber(String registrationNumber)
	{
		this.registrationNumber = registrationNumber;
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
	public char getPatientSex()
	{
		return patientSex;
	}
	public void setPatientSex(char patientSex)
	{
		this.patientSex = patientSex;
	}
	public String getProvinceCode()
	{
		return provinceCode;
	}
	public void setProvinceCode(String provinceCode)
	{
		this.provinceCode = provinceCode;
	}
	public String getErrorCode1()
	{
		return errorCode1;
	}
	public void setErrorCode1(String errorCode1)
	{
		this.errorCode1 = errorCode1;
	}
	public String getErrorCode2()
	{
		return errorCode2;
	}
	public void setErrorCode2(String errorCode2)
	{
		this.errorCode2 = errorCode2;
	}
	public String getErrorCode3()
	{
		return errorCode3;
	}
	public void setErrorCode3(String errorCode3)
	{
		this.errorCode3 = errorCode3;
	}
	public String getErrorCode4()
	{
		return errorCode4;
	}
	public void setErrorCode4(String errorCode4)
	{
		this.errorCode4 = errorCode4;
	}
	public String getErrorCode5()
	{
		return errorCode5;
	}
	public void setErrorCode5(String errorCode5)
	{
		this.errorCode5 = errorCode5;
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		json.put("registrationNumber", registrationNumber);
		json.put("patientLastName", patientLastName);
		json.put("patientFirstName", patientFirstName);
		json.put("patientSex", Character.toString(patientSex));
		json.put("provinceCode", provinceCode);
		json.put("errorCode1", errorCode1);
		json.put("errorCode2", errorCode2);
		json.put("errorCode3", errorCode3);
		json.put("errorCode4", errorCode4);
		json.put("errorCode5", errorCode5);

		return json;
	}
	public static String getInsertStmtTo_ohip_mro_hr1(JSONObject json, int ohip_mro_tx_history_id)
	{
		/*
		return "insert into ohip_mro_hr1 values(default, 'HR', '1', 'V03', '0', '" + json.getString("groupNumber") + "', " +
														"" + json.getInt("healthCareProvider") + ", " +
														"" + json.getInt("speciality") + ", " +
													   "'" + json.getString("mohOfficeCode") + "', " +
														"" + json.getInt("remittanceAdviceSequence") + ", " +
													   "'" + json.getString("paymentDate") + "', " +
													   "'" + json.getString("title") + "|" + json.getString("initials") + "|" + json.getString("lastName") + "', " +
													    "" + json.getFloat("totalAmountPayable") + ", " +
													   "'" + json.getString("totalAmountPayableSign") + "', " +
													   "'" + json.getString("chequeNumber") + "', " +
													   "'" + json.getString("reservedForMOH2") + "', " +
														   + ohip_mro_tx_history_id + ");";
		*/
		
		return null;												           
	}
	public void printRecord()
	{

	}
	
	@Override
	public String toString()
	{
		return "CEHXRBean [transactionIdentifier=" + transactionIdentifier + ", recordIdentifier=" + recordIdentifier
				+ ", registrationNumber=" + registrationNumber + ", patientLastName=" + patientLastName
				+ ", patientFirstName=" + patientFirstName + ", patientSex=" + patientSex + ", provinceCode="
				+ provinceCode + ", errorCode1=" + errorCode1 + ", errorCode2=" + errorCode2 + ", errorCode3="
				+ errorCode3 + ", errorCode4=" + errorCode4 + ", errorCode5=" + errorCode5 + "]";
	}
	//Occurs Once in every file - always the first record
	public boolean parseRecord(String line) throws Exception
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR1V030\") = " + line.indexOf("HR1V030") + ", TOTAL LENGTH = " + line.length());//total len = 79
		
		if (line.length() != 79)
		{
			log.severe("ERROR: the HXR record of the file does not have 79 chars such that " + line);
			valid = false;
		}
		else if (!line.startsWith("HXR"))
		{
			log.severe("ERROR: this file does not contain HXR in the record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = "HX";
				recordIdentifier = 'R';
				registrationNumber = line.substring(3, 3+12).trim();
				patientLastName = line.substring(15, 15+9).trim();
				patientFirstName = line.substring(24, 24+5).trim();
				patientSex = line.substring(29, 29+1).charAt(0);
				provinceCode = line.substring(30, 30+2).trim();
				reservedForMOH = line.substring(32, 32+32).trim();
				errorCode1 = line.substring(64, 64+3).trim();
				errorCode2 = line.substring(67, 67+3).trim();
				errorCode3 = line.substring(70, 70+3).trim();
				errorCode4 = line.substring(73, 73+3).trim();
				errorCode5 = line.substring(76, 76+3).trim();
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
