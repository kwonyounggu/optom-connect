package com.utilities;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.dbcp2.BasicDataSource;
import org.json.JSONObject;

import com.dao.OHIPReportDao;

public class ClaimFileManagement
{
	private BasicDataSource _ds = null;
	
	public ClaimFileManagement(BasicDataSource ds)
	{
		this._ds = ds;
	}
	//Write a claim file under standalone/data/mri_claims in wildfly server
	//see https://howtodoinjava.com/library/json-simple-read-write-json-examples/
	public String writeJsonAndTable(JSONObject claimData, int authUserAccountId) throws Exception
	{
		File path = new File(System.getProperty("jboss.server.data.dir") + "/mri_claims");
		
		if(!path.exists()||!path.isDirectory()) path.mkdirs();
		String fileName = createFileName(claimData.getString("careProviderNumber"));
		String filePath = path + "/" + fileName + ".json";
		//System.out.println("fileName: " + filePath);
		
		FileWriter file = null;
		String batchSequenceNumber = "0000";
		try
		{
			file = new FileWriter(filePath);
	        file.write(claimData.toString());
	        
	        batchSequenceNumber = writeToTable(fileName, filePath, claimData.getString("careProviderNumber"), authUserAccountId);
	    } 
		catch (IOException e) 
		{
	        e.printStackTrace();
	        throw new Exception(e.getMessage());
	    }
		finally
		{
			if (file != null) 
			{
				file.flush();
				file.close();
			}
		}
		return fileName + ":" + batchSequenceNumber;
	}
	//write to the db table, ohip_mri_history, return batch sequence number
	private String writeToTable(String fileName, String filePath, String careProviderNumber, int authUserAccountId) throws Exception
	{
		String sql = "select batch_sequence_number from ohip_mri_creation_history where care_provider_number='" + careProviderNumber + "' order by date_creation desc limit 1;";
		OHIPReportDao dao = new OHIPReportDao(_ds);
		
		Object o = dao.queryObject(sql);
		String batchSequenceNumber = (o == null ? "0001" : String.format("%04d", (Integer.parseInt(o.toString()) + 1)));
		
		sql = "insert into ohip_mri_creation_history values(default, '" + fileName + "', '" +
																		  careProviderNumber + "', '" +
																		  batchSequenceNumber + "', '" +
																		  filePath + "', " + (authUserAccountId == -1 ? "NULL" :  authUserAccountId) + ", default)";
		System.out.println("[INFO] SQL: " + sql);
		
		dao.updateTable(sql);

		return batchSequenceNumber;
	}
	private String createFileName(String careProviderNumber) throws Exception
	{
		String sql = "select concat(claim_file_name, ':', date(date_creation)) as file_name_date from ohip_mri_creation_history where date_creation = " + 
				     "(select max(date_creation) from ohip_mri_creation_history where care_provider_number='" + careProviderNumber +"');";
		Object o = new OHIPReportDao(_ds).queryObject(sql);
		
		if (o != null) System.out.println("file_name_date: " + o.toString());
		String[] nowDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).split("-");
		int m = Integer.parseInt(nowDate[1]);
		String mAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(m-1, m);
		
		String newFileName = "";
		if (o == null)
			newFileName = "H" + mAlpha + careProviderNumber + ".001";
		else
		{
			String[] twoO = o.toString().split(":");
			
			String[] fileDate = twoO[1].split("-");
			
			if (fileDate[0].equals(nowDate[0]) && fileDate[1].equals(nowDate[1]))
			{
				//add ext sequence with one more
				int sequentialNum = Integer.parseInt(twoO[0].split("\\.")[1]);
				String ext = String.format("%03d", ++sequentialNum);
				newFileName = "H" + mAlpha + careProviderNumber + "." + ext;
			}
			else //in advance of the latest date year and month
			{
				newFileName = "H" + mAlpha + careProviderNumber + ".001";
			}
			
		}
		return newFileName;
	}

}
