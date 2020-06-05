package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.logging.Logger;

import org.json.JSONObject;


public class CEHX8Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = "hx"; //INDEX = 1, LENGTH = 2
	private char recordIndentifier = '0'; //INDEX = 3, LENGTH = 1, should be 7
	private String explanatoryCode = "00";
    private String explanatoryDescription = "";
	private String reservedForMOH = ""; 
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public CEHX8Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public CEHX8Bean(String line) throws Exception
	{
		if (!parseRecord(line)) throw new Exception("HX8 record is corrupted. -- Try again with a standard file!");
	}

	public String getTransactionIdentifier()
	{
		return transactionIdentifier;
	}
	public void setTransactionIdentifier(String transactionIdentifier)
	{
		this.transactionIdentifier = transactionIdentifier;
	}
	public char getRecordIndentifier()
	{
		return recordIndentifier;
	}
	public void setRecordIndentifier(char recordIndentifier)
	{
		this.recordIndentifier = recordIndentifier;
	}
	public String getExplanatoryCode()
	{
		return explanatoryCode;
	}
	public void setExplanatoryCode(String explanatoryCode)
	{
		this.explanatoryCode = explanatoryCode;
	}
	public String getexplanatoryDescription()
	{
		return explanatoryDescription;
	}
	public void setexplanatoryDescription(String explanatoryDescription)
	{
		this.explanatoryDescription = explanatoryDescription;
	}
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	public void printRecord()
	{
		System.out.println("---");
		
	}

	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		json.put("transactionIdentifier", "HX8");
		json.put("explanatoryCode", explanatoryCode);
		json.put("explanatoryDescription", explanatoryDescription);
		
		return json;
	}
	/*
	 * Note StringEscapeUtils in Dev/carm/src/com/sickkids/caliper/dao/AllReviewDataBean.java 
	 */
	public static String getInsertStmtTo_ohip_mro_HX8(JSONObject json, int ohip_mro_hr1_id)
	{
		return "insert into ohip_mro_HX8 values(default, 'HR', '8', " + 
														"'" + json.getString("messageText").replace("'", "''") + "', " +  //replace all occurrence
													   "'" + json.getString("reservedForMOH") + "', " +
														   + ohip_mro_hr1_id + ");";										           
	}
	
	@Override
	public String toString()
	{
		return "CEHX8Bean [transactionIdentifier=" + transactionIdentifier + ", recordIndentifier=" + recordIndentifier
				+ ", explanatoryCode=" + explanatoryCode + ", explanatoryDescription=" + explanatoryDescription + "]";
	}
	//Occurs Once in every file
	public boolean parseRecord(String line)
	{
		boolean valid = true;

		if (line.length() != 79)
		{
			log.severe("ERROR: Error Report Explanation Code Message Record which does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else if (!line.startsWith("HX8"))
		{
			log.severe("ERROR: this file does not contain HX8 in the record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = line.substring(0, 0+2);
				recordIndentifier = line.substring(2, 2+1).charAt(0);
				explanatoryCode = line.substring(3, 3+2).trim();
				explanatoryDescription = line.substring(5, 5+55).trim();
				reservedForMOH = line.substring(60, 60+19).trim();
			}
			catch (Exception e)
			{
				log.severe("ERROR -> Exception: " + e.getMessage());
				valid = false;
			}
		}
		return valid;
	}

}
