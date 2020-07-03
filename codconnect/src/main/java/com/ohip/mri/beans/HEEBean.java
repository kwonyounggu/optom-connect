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

}
