package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.logging.Logger;

import org.json.JSONObject;


public class CEHX9Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = "hx"; //INDEX = 1, LENGTH = 2
	private char recordIndentifier = '0'; //INDEX = 3, LENGTH = 1, should be 7
	private int hxhCount = 0;
	private int hxrCount = 0;
	private int hxtCount = 0;
	private int hx8Count = 0;

	private String reservedForMOH = ""; 
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public CEHX9Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public CEHX9Bean(String line) throws Exception
	{
		if (!parseRecord(line)) throw new Exception("HX9 record is corrupted. -- Try again with a standard file!");
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
	public int getHxhCount()
	{
		return hxhCount;
	}
	public void setHxhCount(int hxhCount)
	{
		this.hxhCount = hxhCount;
	}
	public int getHxrCount()
	{
		return hxrCount;
	}
	public void setHxrCount(int hxrCount)
	{
		this.hxrCount = hxrCount;
	}
	public int getHxtCount()
	{
		return hxtCount;
	}
	public void setHxtCount(int hxtCount)
	{
		this.hxtCount = hxtCount;
	}
	public int getHx8Count()
	{
		return hx8Count;
	}
	public void setHx8Count(int hx8Count)
	{
		this.hx8Count = hx8Count;
	}
	public void printRecord()
	{
		System.out.println("---");
		
	}

	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		json.put("transactionIdentifier", "HX9");
		json.put("hxhCount", hxhCount);
		json.put("hxrCount", hxrCount);
		json.put("hxtCount", hxtCount);
		json.put("hx8Count", hx8Count);
		
		return json;
	}
	/*
	 * Note StringEscapeUtils in Dev/carm/src/com/sickkids/caliper/dao/AllReviewDataBean.java 
	 */
	public static String getInsertStmtTo_ohip_mro_HX9(JSONObject json, int ohip_mro_hr1_id)
	{
		return "insert into ohip_mro_HX9 values(default, 'HR', '8', " + 
														"'" + json.getString("messageText").replace("'", "''") + "', " +  //replace all occurrence
													   "'" + json.getString("reservedForMOH") + "', " +
														   + ohip_mro_hr1_id + ");";										           
	}

	@Override
	public String toString()
	{
		return "CEHX9Bean [transactionIdentifier=" + transactionIdentifier + ", recordIndentifier=" + recordIndentifier
				+ ", hxhCount=" + hxhCount + ", hxrCount=" + hxrCount + ", hxtCount=" + hxtCount + ", hx8Count="
				+ hx8Count + "]";
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
		else if (!line.startsWith("HX9"))
		{
			log.severe("ERROR: this file does not contain HX9 in the record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = line.substring(0, 0+2);
				recordIndentifier = line.substring(2, 2+1).charAt(0);
				String temp = line.substring(3, 3+7).trim();
				if (temp.length() == 7) hxhCount = Integer.parseInt(temp);
				temp = line.substring(10, 10+7).trim();
				if (temp.length() == 7) hxrCount = Integer.parseInt(temp);				
				temp = line.substring(17, 17+7).trim();
				if (temp.length() == 7) hxtCount = Integer.parseInt(temp);	
				temp = line.substring(24, 24+7).trim();
				if (temp.length() == 7) hx8Count = Integer.parseInt(temp);	
				
				reservedForMOH = line.substring(31, 31+48).trim();
			}
			catch (NumberFormatException e)
			{
				log.severe("ERROR -> NumberFormatException: " + e.getMessage());
				valid = false;
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
