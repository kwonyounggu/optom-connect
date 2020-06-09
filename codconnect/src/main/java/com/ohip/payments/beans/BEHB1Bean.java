package com.ohip.payments.beans;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.logging.Logger;

import org.json.JSONObject;

public class BEHB1Bean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = ""; 
	private char recordIdentifier = '0'; 
	private String techSpecReleaseIdentifier = "000";
	private String batchNumber = "00000";
	private String operatorNumber = "000000";
	private Date batchCreateDate = null;
	private String batchSequenceNumber = "0000";
	private String microStart = "00000000000";
	private String microEnd = "00000";
	private String microType = "0000000"; //always HCP/WCB or RMB
	private String groupNumber = "0000";
	private String providerNumber = "000000";
	private int numberOfClaims = -1;
	private int numberofRecords = -1;
	private Date batchProcessDate = null;
	private String editMessage = "";
	private String reservedForMOH = ""; 
		
	private SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy/MM/dd");

	public BEHB1Bean()
	{
		// TODO Auto-generated constructor stub
	}
	public BEHB1Bean(String line) throws Exception
	{
		if (!parseRecord(line)) throw new Exception("HB1 record is corrupted. -- Try again with a standard file!");
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
	public String getBatchNumber()
	{
		return batchNumber;
	}
	public void setBatchNumber(String batchNumber)
	{
		this.batchNumber = batchNumber;
	}
	public String getOperatorNumber()
	{
		return operatorNumber;
	}
	public void setOperatorNumber(String operatorNumber)
	{
		this.operatorNumber = operatorNumber;
	}
	public Date getBatchCreateDate()
	{
		return batchCreateDate;
	}
	public void setBatchCreateDate(Date batchCreateDate)
	{
		this.batchCreateDate = batchCreateDate;
	}
	public String getBatchSequenceNumber()
	{
		return batchSequenceNumber;
	}
	public void setBatchSequenceNumber(String batchSequenceNumber)
	{
		this.batchSequenceNumber = batchSequenceNumber;
	}
	public String getMicroStart()
	{
		return microStart;
	}
	public void setMicroStart(String microStart)
	{
		this.microStart = microStart;
	}
	public String getMicroEnd()
	{
		return microEnd;
	}
	public void setMicroEnd(String microEnd)
	{
		this.microEnd = microEnd;
	}
	public String getMicroType()
	{
		return microType;
	}
	public void setMicroType(String microType)
	{
		this.microType = microType;
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
	public int getNumberOfClaims()
	{
		return numberOfClaims;
	}
	public void setNumberOfClaims(int numberOfClaims)
	{
		this.numberOfClaims = numberOfClaims;
	}
	public int getNumberofRecords()
	{
		return numberofRecords;
	}
	public void setNumberofRecords(int numberofRecords)
	{
		this.numberofRecords = numberofRecords;
	}
	public Date getBatchProcessDate()
	{
		return batchProcessDate;
	}
	public void setBatchProcessDate(Date batchProcessDate)
	{
		this.batchProcessDate = batchProcessDate;
	}
	public String getEditMessage()
	{
		return editMessage;
	}
	public void setEditMessage(String editMessage)
	{
		this.editMessage = editMessage;
	}
	public String getReservedForMOH()
	{
		return reservedForMOH;
	}
	public void setReservedForMOH(String reservedForMOH)
	{
		this.reservedForMOH = reservedForMOH;
	}
	public JSONObject getJson()
	{
		JSONObject json = new JSONObject();
		json.put("transactionIdentifier", "HB1");
		json.put("batchNumber", batchNumber);
		json.put("operatorNumber", operatorNumber);
		json.put("batchCreateDate", simpleDate.format(batchCreateDate));
		json.put("batchSequenceNumber", batchSequenceNumber);
		json.put("microStart", microStart);
		json.put("microEnd", microEnd);
		json.put("microType", microType);
		json.put("groupNumber", groupNumber);
		json.put("providerNumber", providerNumber);
		json.put("numberOfClaims", numberOfClaims);
		json.put("numberofRecords", numberofRecords);
		json.put("batchProcessDate", simpleDate.format(batchProcessDate));
		json.put("editMessage", editMessage);
		json.put("reservedForMOH", reservedForMOH);

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
		return "BEHB1Bean [transactionIdentifier=" + transactionIdentifier + ", recordIdentifier=" + recordIdentifier
				+ ", techSpecReleaseIdentifier=" + techSpecReleaseIdentifier + ", batchNumber=" + batchNumber
				+ ", operatorNumber=" + operatorNumber + ", batchCreateDate=" + batchCreateDate + ", batchSequenceNumber="
				+ batchSequenceNumber + ", microStart=" + microStart + ", microEnd=" + microEnd + ", microType="
				+ microType + ", groupNumber=" + groupNumber + ", providerNumber=" + providerNumber
				+ ", numberOfClaims=" + numberOfClaims + ", numberofRecords=" + numberofRecords + ", batchProcessDate="
				+ batchProcessDate + ", editMessage=" + editMessage + ", reservedForMOH=" + reservedForMOH + "]";
	}
	//Occurs Once in every file - always the first record
	public boolean parseRecord(String line) throws Exception
	{
		boolean valid = true;
		if (line.length() != 132)
		{
			log.severe("ERROR: the HB1 record of the file does not have 132 chars such that " + line);
			valid = false;
		}
		else if (!line.startsWith("HB1V03"))
		{
			log.severe("ERROR: this file does not contain HB1V03 in the record.");
			valid = false;
		}
		else
		{
			try
			{
				transactionIdentifier = "HB";
				recordIdentifier = '1';
				techSpecReleaseIdentifier = "V03";
				batchNumber = line.substring(6, 6+5).trim();
				operatorNumber = line.substring(11, 11+6).trim();
				String temp = line.substring(17, 17+8).trim();
				if (temp.length() == 8)
					batchCreateDate = new SimpleDateFormat("yyyy/MM/dd").parse(line.substring(17, 17+4)+"/"+line.substring(21, 21+2)+"/"+line.substring(23, 23+2));
				else
					batchCreateDate = new SimpleDateFormat("yyyy/MM/dd").parse("1111/11/11");
				batchSequenceNumber = line.substring(25, 25+4).trim();
				microStart = line.substring(29, 29+11).trim();
				microEnd = line.substring(40, 40+5).trim();
				microType = line.substring(45, 45+7).trim();
				groupNumber = line.substring(52, 52+4).trim();
				providerNumber = line.substring(56, 56+6).trim();
				numberOfClaims = Integer.parseInt(line.substring(62, 62+5));
				numberofRecords = Integer.parseInt(line.substring(67, 67+6));
				temp = line.substring(73, 73+8).trim();
				if (temp.length() == 8)
					batchProcessDate = new SimpleDateFormat("yyyy/MM/dd").parse(line.substring(73, 73+4)+"/"+line.substring(77, 77+2)+"/"+line.substring(79, 79+2));
				else
					batchProcessDate = new SimpleDateFormat("yyyy/MM/dd").parse("1111/11/11");
				editMessage = line.substring(81, 81+40).trim();
				reservedForMOH = line.substring(121, 121+11).trim();
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
