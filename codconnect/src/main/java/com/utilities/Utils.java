package com.utilities;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.ResourceBundle;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;

public class Utils
{
	public static final String DATE_FORMAT_NOW = "yyyy-MM-dd HH:mm:ss";
	public static final long MAX_FILE_SIZE = 5242880;
	public static final long MAX_MANUAL_FILE_SIZE = 52428800;
	
	public static String MYHOST_DOMAIN;
	public static boolean DEBUG_MODE;
	public static String COMPANY_EMAIL;
	public static String SIGNUP_CRON;
	public static int VALID_SIGNUP;
			
	public static String SMTP_HOST;
	public static String SMPT_SENDER;
	public static String SMPT_USERNAME;
	public static String SMPT_PASSCODE;
	static 
    {
        try 
        {
            ResourceBundle bundle = ResourceBundle.getBundle("host");
            
            MYHOST_DOMAIN = bundle.getString("myhost_domain");
            DEBUG_MODE = bundle.getString("debug_mode").equalsIgnoreCase("true");
            COMPANY_EMAIL = bundle.getString("company_email").toLowerCase();
            SIGNUP_CRON = bundle.getString("signup_cron");
            VALID_SIGNUP = Integer.parseInt(bundle.getString("valid_signup"));
            
            SMTP_HOST = bundle.getString("smtp_host");
            SMPT_SENDER = bundle.getString("smtp_sender");
            SMPT_USERNAME = bundle.getString("smtp_username");
            SMPT_PASSCODE = bundle.getString("smtp_passcode");
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
    }
	public static void delay(int sec)
	{
		try 
		{
		    Thread.sleep(sec*1000);
		} 
		catch(InterruptedException ex) 
		{
		    Thread.currentThread().interrupt();
		}
	}
	public static String getFormattedDate(Date date)
	{
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(date);
    }
    public static String now() 
    {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT_NOW);
        return sdf.format(cal.getTime());
    }
    public static String nowUS() 
    {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("MMM-dd-yyyy HH:mm");
        return sdf.format(cal.getTime());
    }
    public static long nowPlus(int day)
    {
    	Calendar c = Calendar.getInstance(); 
    	c.add(Calendar.DATE, day);
    	return c.getTimeInMillis();
    }
	public static final double roundOff(double x)
	{
		long val = Math.round(x * 100); // cents

		return val / 100.0;
	}		
	public static String getDateTime()
	{
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        return dateFormat.format(date);
    }
	public static String getMMMDateTime()
	{
        DateFormat dateFormat = new SimpleDateFormat("MMM-dd-yyyy HH:mm");
        Date date = new Date();
        return dateFormat.format(date);
    }
	public static synchronized String getDateTimeForFileName()
	{
        DateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");
        Date date = new Date();
        return dateFormat.format(date);
    }
	public static synchronized String getDate(Timestamp ts)
	{ 
		if(ts==null) return "";
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        return dateFormat.format(ts);
    }
	public static synchronized String getMMMDate(Timestamp ts)
	{ 
		if(ts.equals(Timestamp.valueOf("1969-01-01 00:00:00"))) return "NA";
        DateFormat dateFormat = new SimpleDateFormat("MMM-dd-yyyy");
        return dateFormat.format(ts);
    }
	public static synchronized String getDetailedMMMDate(Timestamp ts)
	{ 
		if(ts.equals(Timestamp.valueOf("1969-01-01 00:00:00"))) return "NA";
        DateFormat dateFormat = new SimpleDateFormat("MMM-dd-yyyy HH:mm");
        return dateFormat.format(ts);
    }
	//Provide ts+wk
	public static synchronized String getSpecifiedDate(Timestamp ts, int wk)
	{ 
		if(ts.equals(Timestamp.valueOf("1969-01-01 00:00:00"))) return "NA";
		DateFormat dateFormat = new SimpleDateFormat("MMM-dd-yyyy");
        Calendar cal = Calendar.getInstance();
        cal.setTime(ts);
        cal.add(Calendar.DAY_OF_WEEK, wk*7);
        return dateFormat.format(cal.getTime());
    }
	public static synchronized String getOffsetDate(int wk)
	{ 
		DateFormat dateFormat = new SimpleDateFormat("MMM-dd-yyyy");
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentTimestamp());
        cal.add(Calendar.DAY_OF_WEEK, wk*7);
        return dateFormat.format(cal.getTime());
    }
	public static synchronized Timestamp getSpecifiedTimestamp(Timestamp ts, int wk)
	{ 
		Calendar cal = Calendar.getInstance();
        cal.setTime(ts);
        cal.add(Calendar.DAY_OF_WEEK, wk*7);
        return new Timestamp(cal.getTimeInMillis());
    }

	public static String getDateTime(Timestamp ts)
	{
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        return dateFormat.format(ts);
    }
	public static String getDoublePrecision(double v)
	{
		DecimalFormat df=new DecimalFormat("###.##");
	    return df.format(v);
	}
	public static String getChoppedString(String s, int n)
	{
		return (s.length()>n? s.substring(0, n): s);
	}
	public static synchronized String getFirstCapitalString(String s)
	{
		char[] stringArray = s.toLowerCase().toCharArray();
		stringArray[0] = Character.toUpperCase(stringArray[0]);

		return String.valueOf(stringArray);
	}

	public static synchronized Timestamp currentTimestamp()
    {
    	return new Timestamp(new Date().getTime());	    	
    }
	//leading zeros in the given 'num' parameter
	//eg: intToString(2, 2) will return 02
	public static synchronized String intToString(int num, int digits) 
	{
	    assert digits > 0 : "Invalid number of digits";

	    // create variable length array of zeros
	    char[] zeros = new char[digits];
	    Arrays.fill(zeros, '0');
	    // format number as String
	    DecimalFormat df = new DecimalFormat(String.valueOf(zeros));

	    return df.format(num);
	}
	
	public static void printRequest(HttpServletRequest httpRequest) 
	{
	    System.out.println(" \n\n Headers");

	    Enumeration<String> headerNames = httpRequest.getHeaderNames();
	    while(headerNames.hasMoreElements()) 
	    {
	        String headerName = (String)headerNames.nextElement();
	        System.out.println(headerName + " = " + httpRequest.getHeader(headerName));
	    }

	    System.out.println("\n\nParameters");

	    Enumeration<String> params = httpRequest.getParameterNames();
	    while(params.hasMoreElements())
	    {
	        String paramName = (String)params.nextElement();
	        System.out.println(paramName + " = " + httpRequest.getParameter(paramName));
	    }

	    System.out.println("\n\n Row data");
	    System.out.println(extractPostRequestBody(httpRequest));
	}

	@SuppressWarnings("resource")
	public static String extractPostRequestBody(HttpServletRequest request) 
	{
	    if ("POST".equalsIgnoreCase(request.getMethod())) {
	        Scanner s = null;
	        try 
	        {
	            s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
	        }
	        catch (IOException e) 
	        {
	            e.printStackTrace();
	        }
	        return s.hasNext() ? s.next() : "";
	    }
	    return "";
	}
}
