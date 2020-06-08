package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

public class CEHXTBean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; 
	private char recordIdentifier = '0'; 
	private String serviceCode = "00000";
	private String reservedForMOH1 = ""; 
	private float feeSubmitted = 0.0f;
	private int numberOfServices = 0;
	private Date serviceDate = null;
	private String diagnosticCode = "0000";
	private String reservedForMOH2 = ""; 
	private String explanatoryCode = "00";
	private String errorCode1 = "000"; //Refer to errorcode list
	private String errorCode2 = "000"; //Refer to errorcode list
	private String errorCode3 = "000"; //Refer to errorcode list
	private String errorCode4 = "000"; //Refer to errorcode list
	private String errorCode5 = "000"; //Refer to errorcode list

	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public CEHXTBean()
	{
		// TODO Auto-generated constructor stub
	}
	public CEHXTBean(String line) throws Exception
	{
		if (!parseRecord(line)) throw new Exception("HXT record is corrupted. -- Try again with a standard file!");
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
	public String getServiceCode()
	{
		return serviceCode;
	}
	public void setServiceCode(String serviceCode)
	{
		this.serviceCode = serviceCode;
	}
	public float getFeeSubmitted()
	{
		return feeSubmitted;
	}
	public void setFeeSubmitted(float feeSubmitted)
	{
		this.feeSubmitted = feeSubmitted;
	}
	public int getNumberOfServices()
	{
		return numberOfServices;
	}
	public void setNumberOfServices(int numberOfServices)
	{
		this.numberOfServices = numberOfServices;
	}
	public Date getServiceDate()
	{
		return serviceDate;
	}
	public void setServiceDate(Date serviceDate)
	{
		this.serviceDate = serviceDate;
	}
	public String getDiagnosticCode()
	{
		return diagnosticCode;
	}
	public void setDiagnosticCode(String diagnosticCode)
	{
		this.diagnosticCode = diagnosticCode;
	}
	public String getExplanatoryCode()
	{
		return explanatoryCode;
	}
	public void setExplanatoryCode(String explanatoryCode)
	{
		this.explanatoryCode = explanatoryCode;
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
		json.put("transactionIdentifier", "HXT");
		json.put("serviceCode", serviceCode);
		json.put("reservedForMOH1", reservedForMOH1);
		json.put("feeSubmitted", feeSubmitted);
		json.put("numberOfServices", numberOfServices);
		if (serviceDate != null)
			json.put("serviceDate", simpleDate.format(serviceDate));
		else
			json.put("serviceDate", "1111/11/11");
		json.put("diagnosticCode", diagnosticCode);
		json.put("reservedForMOH2", reservedForMOH2);
		json.put("explanatoryCode", explanatoryCode);
		json.put("errorCode1", errorCode1);
		json.put("errorCode2", errorCode2);
		json.put("errorCode3", errorCode3);
		json.put("errorCode4", errorCode4);
		json.put("errorCode5", errorCode5);

		return json;
	}
	public static String getInsertStmtTo_ohip_mro_hxt(JSONObject json, int ohip_mro_hx1_id, int ohip_mro_hxh_id)
	{
		return "insert into ohip_mro_hxt values(default, 'HX', 'T', " +
				"'" + json.getString("serviceCode") + "', " +
				"'" + json.getString("reservedForMOH1") + "', " +
				"" + json.getFloat("feeSubmitted") + ", " +
				"" + json.getInt("numberOfServices") + ", " +
				"'" + json.getString("serviceDate") + "', " +
				"'" + json.getString("diagnosticCode") + "', " +
				"'" + json.getString("reservedForMOH2") + "', " +
				"'" + json.getString("explanatoryCode") + "', " +
				"'" + json.getString("errorCode1") + "', " +
				"'" + json.getString("errorCode2") + "', " +
				"'" + json.getString("errorCode3") + "', " +
				"'" + json.getString("errorCode4") + "', " +
				"'" + json.getString("errorCode5") + "', " +
					  ohip_mro_hx1_id + ", " +
					  ohip_mro_hxh_id + ");";									           
	}
	public static String getSqlOfAutoIncrementId()
	{
		return "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_hxt', 'ohip_mro_hxt_id'));";
	}
	public void printRecord()
	{

	}

	@Override
	public String toString()
	{
		return "CEHXTBean [transactionIdentifier=" + transactionIdentifier + ", recordIdentifier=" + recordIdentifier
				+ ", serviceCode=" + serviceCode + ", feeSubmitted=" + feeSubmitted + ", numberOfServices="
				+ numberOfServices + ", serviceDate=" + (serviceDate!=null ? simpleDate.format(serviceDate) : null) + ", diagnosticCode=" + diagnosticCode
				+ ", explanatoryCode=" + explanatoryCode + ", errorCode1=" + errorCode1 + ", errorCode2=" + errorCode2
				+ ", errorCode3=" + errorCode3 + ", errorCode4=" + errorCode4 + ", errorCode5=" + errorCode5 + "]";
	}
	//Occurs Once in every file - always the first record
	public boolean parseRecord(String line) throws Exception
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR1V030\") = " + line.indexOf("HR1V030") + ", TOTAL LENGTH = " + line.length());//total len = 79
		
		if (line.length() != 79)
		{
			log.severe("ERROR: the HXT record of the file does not have 79 chars such that " + line);
			valid = false;
		}
		else if (!line.startsWith("HXT"))
		{
			log.severe("ERROR: this file does not contain HXT in the record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = "HX";
				recordIdentifier = 'T';
				serviceCode = line.substring(3, 3+5).trim();
				reservedForMOH1 = line.substring(8, 8+2).trim();
				String temp = line.substring(10, 10+6).trim();
				if (temp.length() == 6)
					feeSubmitted = (float)Integer.parseInt(temp)/100;
				temp = line.substring(16, 16+2).trim();
				if (temp.length() == 2)
					numberOfServices = Integer.parseInt(temp);
				temp = line.substring(18, 18+8).trim();
				if (temp.length() == 8)
					serviceDate = new SimpleDateFormat("yyyy/MM/dd").parse(temp.substring(0, 0+4)+"/"+temp.substring(4, 4+2)+"/"+temp.substring(6, 6+2));

				diagnosticCode = line.substring(26, 26+4).trim();
				reservedForMOH2 = line.substring(30, 30+32).trim();
				explanatoryCode = line.substring(62, 62+2).trim();
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
