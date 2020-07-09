package com.test;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import com.ohip.mri.beans.*;

public class ReadMRIFiles
{
	/*"/home/younggu/Downloads/myFile_3_claims_2_1_2_services.txt", */
	public static final String[] filePath =
		{
			  	
			  	"/home/younggu/Downloads/myFile.txt"
		};


	public ReadMRIFiles()
	{
		// TODO Auto-generated constructor stub
	}

	public void readFile(String fileName)
	{
		BufferedReader reader = null;
		try
		{
			boolean valid = true;
			HEBBean heb = new HEBBean();
			HEHBean heh = new HEHBean();
			HETBean het = new HETBean();
			HEEBean hee = new HEEBean();

			reader = new BufferedReader(new FileReader(fileName));
			String line = reader.readLine();
			
			for (int i=0; line != null; i++)
			{
				/*
				switch(i)
				{
					case 0: if (!(valid = firstRecordBean.firstRecord(line))) break;
							firstRecordBean.printFirstRecord();
							//System.err.println(firstRecordBean.toString());
							break;
					case 1: if (!(valid = secondRecordBean.secondRecord(line))) break;
							secondRecordBean.printSecondRecord();
							//System.out.println(secondRecordBean.toString());
							break;
					case 2: if (!(valid = thirdRecordBean.thirdRecord(line))) break;
							thirdRecordBean.printThirdRecord();
							//System.out.println(thirdRecordBean.toString());
							break;
					default:
							if (i == 3)
								System.out.println("\"Accounting No\", \"Claim No\", \"Tx Type\", \"Reg No\", \"Vsn Code\", \"Claim No\", \"Tx Type\", \"No Svc\", \"Svc Code\", \"Svc Date\", \"Amt Submit\", \"Amt Paid\"");
							if (line.startsWith("HR4"))
							{
								ClaimHR4RecordBean hr4Bean = new ClaimHR4RecordBean(line);
								hr4RecordList.add(hr4Bean);
								//System.out.println(hr4Bean.toString());
								hr4Bean.printHR4Record();
							}
							else if (line.startsWith("HR5"))
							{
								ClaimHR5RecordBean hr5Bean = new ClaimHR5RecordBean(line);
								hr5RecordList.add(hr5Bean);
								//System.out.println(hr5Bean.toString());
								hr5Bean.printHR5Record();
							}
							else if (line.startsWith("HR7"))
							{
								AccountingTxRecordHR7Bean hr7Bean = new AccountingTxRecordHR7Bean(line);
								hr7Bean.printAccountingTxRecord();
							}
							break;
				}*/
				if (!valid) break;
				System.out.println("["+i+"]: ["+line+"]");
				line = reader.readLine();
			}
			reader.close();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			//close all if any exceptions
		}
	}
	public static void main(String[] args)
	{
		// TODO Auto-generated method stub

		ReadMRIFiles obj = new ReadMRIFiles();
		
		for (int i=0; i<ReadMRIFiles.filePath.length; i++)
		{
			obj.readFile(ReadMRIFiles.filePath[i]);
			FileReader is = null;
			try
			{
				is = new FileReader(ReadMRIFiles.filePath[i]);
				for (int j=0, c=is.read(); c != -1; j++)
				{
					System.out.print("["+j+"] c in HEX=["+Integer.toHexString(c)+"] c=["+(char)c+"]");
					if (c=='\r') System.out.println();
					c=is.read();
					//if (c == -1) System.out.println("["+j+"] c=["+Integer.toHexString(c)+"]");
				}

			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			finally
			{
				if (is != null) try {is.close();} catch(Exception ef) {}
			}
			
			//System.err.println("Request Len: "+obj.hr4RecordList.size()+", Resonse Len: "+obj.hr5RecordList.size());
		}
		
	}
}
