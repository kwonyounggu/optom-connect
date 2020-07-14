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
			  	
			  	"/home/younggu/Downloads/mriTesting.005"
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
			HEBBean heb = new HEBBean();
			HEHBean heh = new HEHBean();
			HETBean het = new HETBean();
			HEEBean hee = new HEEBean();

			reader = new BufferedReader(new FileReader(fileName));
			String line = reader.readLine();
			
			for (int i=0; line != null && line.charAt(0) != (char)0x1A; i++)
			{
				
				if (line.startsWith("HEB"))
				{
					//System.out.println("HEB");
					heb.parseLine(line);
					System.out.println();
				}
				else if (line.startsWith("HEH"))
				{
					//System.out.println("HEH");
					heh.parseLine(line);
					System.out.println();
				}
				else if (line.startsWith("HET"))
				{
					//System.out.println("HET");
					het.parseLine(line);
					System.out.println();
				}
				else if (line.startsWith("HEE"))
				{
					System.out.println("HEE");
					//hee.parseLine(line);
				}

				//System.out.println("["+i+"]: ["+line+"]");
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
			try{reader.close();}catch(Exception e) {e.printStackTrace();}
		}
	}
	public static void main(String[] args)
	{
		// TODO Auto-generated method stub

		//String a = "";
		//String.format("%06d", 0).replace('0', ' ');
		//System.out.println("String.format(\"%06d\", 0): [" + String.format("%06d", 0) + "], String.format(\"%06d\", 0).replace('0', ' '): [" + String.format("%06d", 0).replace('0', ' ') + "]");
		ReadMRIFiles obj = new ReadMRIFiles();
		
		for (int i=0; i<ReadMRIFiles.filePath.length; i++)
		{
			obj.readFile(ReadMRIFiles.filePath[i]);
			FileReader is = null;
			try
			{
				is = new FileReader(ReadMRIFiles.filePath[i]);
				/*
				for (int j=0, c=is.read(); c != -1; j++)
				{
					System.out.print("["+j+"] c in HEX=["+Integer.toHexString(c)+"] c=["+(char)c+"]");
					if (c=='\r') System.out.println();
					c=is.read();
					//if (c == -1) System.out.println("["+j+"] c=["+Integer.toHexString(c)+"]");
				}
				*/
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
