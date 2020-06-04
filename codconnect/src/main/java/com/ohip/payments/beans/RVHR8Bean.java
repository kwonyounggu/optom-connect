package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.logging.Logger;

import org.json.JSONObject;


public class RVHR8Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; //INDEX = 1, LENGTH = 2
	private char recordType = '0'; //INDEX = 3, LENGTH = 1, should be 7
    private String messageText = "";
	private String reservedForMOH = ""; 
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public RVHR8Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public RVHR8Bean(String line) throws Exception
	{
		if (!hrRecord(line)) throw new Exception("HR8 record is corrupted. -- Try again with a standard file!");
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
	public String getMessageText()
	{
		return messageText;
	}
	public void setMessageText(String messageText)
	{
		this.messageText = messageText;
	}
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	public SimpleDateFormat getSimpleDate()
	{
		return simpleDate;
	}
	public void setSimpleDate(SimpleDateFormat simpleDate)
	{
		this.simpleDate = simpleDate;
	}
	public void printRecord()
	{
		System.out.println("Message Facility Record – Health Reconciliation");
	
	}
	@Override
	public String toString()
	{
		return "RVHR8Bean [transactionIdentifier=" + transactionIdentifier + ", recordType=" + recordType
				+ ", messageText=" + messageText + ", reservedForMOH=" + reservedForMOH + "]";
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		
		if (messageText.startsWith("*")) json.put("messageText", "*" + messageText.length()); //eg: *78, means 78 asterisks
		else json.put("messageText", messageText);
		
		json.put("reservedForMOH", reservedForMOH);
		
		return json;
	}
	/*
	 * Note StringEscapeUtils in Dev/carm/src/com/sickkids/caliper/dao/AllReviewDataBean.java 
	 */
	public static String getInsertStmtTo_ohip_mro_hr8(JSONObject json, int ohip_mro_hr1_id)
	{
		return "insert into ohip_mro_hr8 values(default, 'HR', '8', " + 
														"'" + json.getString("messageText").replace("'", "''") + "', " +  //replace all occurrence
													   "'" + json.getString("reservedForMOH") + "', " +
														   + ohip_mro_hr1_id + ");";										           
	}
	//Occurs Once in every file
	public boolean hrRecord(String line)
	{
		boolean valid = true;

		if (line.length() != 79)
		{
			log.severe("ERROR: Message Facility Record – Health Reconciliation of this file does not contain total length, 79, but " + line.length() + " as specified in the spec.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = line.substring(0, 0+2);
				recordType = line.substring(2, 2+1).charAt(0);
				messageText = line.substring(3, 3+70).trim();
				reservedForMOH = line.substring(73, 73+6).trim();
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
