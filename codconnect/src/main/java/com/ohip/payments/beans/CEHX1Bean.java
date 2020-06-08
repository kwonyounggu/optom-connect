package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

public class CEHX1Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; 
	private char recordIdentifier = '0'; 
	private String techSpecReleaseIdentifier = "000";
	private char mohOfficeCode = 'z';
	private String reservedForMOH1 = ""; //INDEX = 7, LENGTH = 1
	private String operatorNumber = "000000"; //from batch header 
	private String groupNumber = "0000"; //from batch header
	private String providerNumber = "000000"; //from batch header
	private String speciality = "00"; //from batch header
	private String stationNumber = "000";
	private Date claimProcessDate = null; //20191015, INDEX = 22, LENGTH = 8
	private String reservedForMOH2 = ""; //INDEX = 7, LENGTH = 1
	
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public CEHX1Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public CEHX1Bean(String line) throws Exception
	{
		if (!parseRecord(line)) throw new Exception("HX1 record is corrupted. -- Try again with a standard file!");
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
	public String getTechSpecReleaseIdentifier()
	{
		return techSpecReleaseIdentifier;
	}
	public void setTechSpecReleaseIdentifier(String techSpecReleaseIdentifier)
	{
		this.techSpecReleaseIdentifier = techSpecReleaseIdentifier;
	}
	public char getMohOfficeCode()
	{
		return mohOfficeCode;
	}
	public void setMohOfficeCode(char mohOfficeCode)
	{
		this.mohOfficeCode = mohOfficeCode;
	}
	public String getOperatorNumber()
	{
		return operatorNumber;
	}
	public void setOperatorNumber(String operatorNumber)
	{
		this.operatorNumber = operatorNumber;
	}
	public String getGroupNumber()
	{
		return groupNumber;
	}
	public void setGroupNumber(String groupNumber)
	{
		this.groupNumber = groupNumber;
	}
	public String getProviderNumber()
	{
		return providerNumber;
	}
	public void setProviderNumber(String providerNumber)
	{
		this.providerNumber = providerNumber;
	}
	public String getSpeciality()
	{
		return speciality;
	}
	public void setSpeciality(String speciality)
	{
		this.speciality = speciality;
	}
	public String getStationNumber()
	{
		return stationNumber;
	}
	public void setStationNumber(String stationNumber)
	{
		this.stationNumber = stationNumber;
	}
	public Date getClaimProcessDate()
	{
		return claimProcessDate;
	}
	public void setClaimProcessDate(Date claimProcessDate)
	{
		this.claimProcessDate = claimProcessDate;
	}
	public SimpleDateFormat getSimpleDate()
	{
		return simpleDate;
	}
	public void setSimpleDate(SimpleDateFormat simpleDate)
	{
		this.simpleDate = simpleDate;
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		json.put("transactionIdentifier", "HX1");
		json.put("mohOfficeCode", Character.toString(mohOfficeCode));
		json.put("reservedForMOH1", reservedForMOH1);
		json.put("operatorNumber", operatorNumber);
		json.put("groupNumber", groupNumber);
		json.put("providerNumber", providerNumber);
		json.put("speciality", speciality);
		json.put("stationNumber", stationNumber);
		if (claimProcessDate != null)
			json.put("claimProcessDate", simpleDate.format(claimProcessDate));
		else
			json.put("claimProcessDate", "1111/11/11");
		json.put("reservedForMOH2", reservedForMOH2);
		return json;
	}
	public static String getInsertStmtTo_ohip_mro_hx1(JSONObject json, int ohip_mro_tx_history_id)
	{
		String sqlCmd = "insert into ohip_mro_hx1 values(default, 'HX', '1', 'V03', " +
														"'" + json.getString("mohOfficeCode") + "', " +
														"'" + json.getString("reservedForMOH1") + "', " +
														"'" + json.getString("operatorNumber") + "', " +
														"'" + json.getString("groupNumber") + "', " +
														"'" +  json.getString("providerNumber") + "', " +
														"'" + json.getString("speciality") + "', " +
														"'" + json.getString("stationNumber") + "', " +
														"'" + json.getString("claimProcessDate") + "', " +
													   "'" + json.getString("reservedForMOH2") + "', " +
														     ohip_mro_tx_history_id + ");";	
		//System.err.println("[HX1 SQL]"+sqlCmd);
		return sqlCmd;
	}
	public static String getSqlOfAutoIncrementId()
	{
		return "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_hx1', 'ohip_mro_hx1_id'));";
	}
	public void printRecord()
	{
	}

	@Override
	public String toString()
	{
		return "CEHX1Bean [transactionIdentifier=" + transactionIdentifier + ", recordIdentifier=" + recordIdentifier
				+ ", techSpecReleaseIdentifier=" + techSpecReleaseIdentifier + ", mohOfficeCode=" + mohOfficeCode
				+ ", reservedForMOH1=" + reservedForMOH1 + ", operatorNumber=" + operatorNumber + ", groupNumber="
				+ groupNumber + ", providerNumber=" + providerNumber + ", speciality=" + speciality + ", stationNumber="
				+ stationNumber + ", claimProcessDate=" + (claimProcessDate!=null ? simpleDate.format(claimProcessDate) : null) + ", reservedForMOH2=" + reservedForMOH2
				+ "]";
	}
	//Occurs Once in every file - always the first record
	public boolean parseRecord(String line) throws Exception
	{
		boolean valid = true;
		//System.err.println("line.indexOf(\"HR1V030\") = " + line.indexOf("HR1V030") + ", TOTAL LENGTH = " + line.length());//total len = 79
		
		if (line.length() != 79)
		{
			log.severe("ERROR: the HX1 record of the file does not have 79 chars such that " + line);
			valid = false;
		}
		else if (!line.startsWith("HX1V03"))
		{
			log.severe("ERROR: this file does not contain HX1V03 in the first record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = "HX";
				recordIdentifier = '1';
				techSpecReleaseIdentifier = "V03";
				mohOfficeCode = line.substring(6, 6+1).charAt(0);
				reservedForMOH1 = line.substring(7, 7+10).trim();
				operatorNumber = line.substring(17, 17+6);
				groupNumber = line.substring(23, 23+4);
				providerNumber = line.substring(27, 27+6);
				speciality = line.substring(33, 33+2);
				stationNumber = line.substring(35, 35+3);
				String temp = line.substring(38, 38+8).trim();
				if (temp.length() == 8)
					claimProcessDate = new SimpleDateFormat("yyyy/MM/dd").parse(line.substring(38, 38+4)+"/"+line.substring(42, 42+2)+"/"+line.substring(44, 44+2));
				reservedForMOH2 = line.substring(46, 46+33).trim();
			}
			catch (NumberFormatException e)
			{
				log.severe("ERROR -> NumberFormatException: " + e.getMessage());
				valid = false;
			}
			catch (ParseException e)
			{
				log.severe("ERROR -> ParseException: " + e.getMessage());
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
