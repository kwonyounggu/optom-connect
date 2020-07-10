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

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

public class HEEBean implements Serializable
{

	/**
	 * Note that the INDEX should be subtracted by one
	 */
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	private String transactionIdentifier = "HE"; 
	private String recordIdentifier = "E"; 
	private String hCount = "0000";
	private String rCount = "0000"; 
	private String tCount = "00000";
	private String reservedForMOH = StringUtils.leftPad("", 63);

	public HEEBean()
	{
	}
	public HEEBean(int hCount, int rCount) throws Exception
	{
		this.hCount = String.format("%04d", hCount);
		this.rCount = String.format("%04d", rCount);
		this.tCount = String.format("%05d", rCount+hCount);
	}

	@Override
	public String toString()
	{
		return transactionIdentifier + recordIdentifier + hCount + rCount + tCount + reservedForMOH;
	}
	public JSONObject getRawLine()
	{
		JSONObject json = new JSONObject();
		json.put("hee", this.toString());
		return json;
	}
	public void printIt()
	{
		System.out.println("[Transaction Identifier("+transactionIdentifier.length()+"): [" + transactionIdentifier +"]");
		System.out.println("[Record Identification("+recordIdentifier.length()+"): [" + recordIdentifier +"]");
		System.out.println("[H Count("+hCount.length()+"): [" + hCount +"]");
		System.out.println("[R Count("+rCount.length()+"): [" + rCount +"]");
		System.out.println("[T Count("+tCount.length()+"): [" + tCount +"]");
		System.out.println("[Reserved for MOH Use("+reservedForMOH.length()+"): [" + reservedForMOH +"]");
	}
	public boolean parseLine(String line) throws Exception
	{
		boolean valid = true;
		if (line.length() != 79)
		{
			log.severe("ERROR: this file length, " + line.length() +", is not 79!!!");
			valid = false;
		}
		else
		{
			try
			{
				System.out.println("Tx ID: [" + line.substring(0, 0+2) +"] len=[" + line.substring(0, 0+2).length() +"]");
				System.out.println("Record ID: [" + line.substring(2, 2+1) +"] len=[" + line.substring(2, 2+1).length() +"]");
				System.out.println("Tech Spec ID: [" + line.substring(3, 3+3) +"] len=[" + line.substring(3, 3+3).length() +"]");
				System.out.println("MOH Office Code: [" + line.substring(6, 6+1) +"] len=[" + line.substring(6, 6+1).length() +"]");
				System.out.println("Batch ID: [" + line.substring(7, 7+12) +"] len=[" + line.substring(7, 7+12).length() +"]");
				System.out.println("Operator Number: [" + line.substring(19, 19+6) +"] len=[" + line.substring(19, 19+6).length() +"]");
				System.out.println("Group Number: [" + line.substring(25, 25+4) +"] len=[" + line.substring(25, 25+4).length() +"]");
				System.out.println("Care Provider Number: [" + line.substring(29, 29+6) +"] len=[" + line.substring(29, 29+6).length() +"]");
				System.out.println("Speciality: [" + line.substring(35, 35+2) +"] len=[" + line.substring(35, 35+2).length() +"]");
				System.out.println("Reserved for MOH: [" + line.substring(37, 37+42) +"] len=[" + line.substring(37, 37+42).length() +"]");
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
