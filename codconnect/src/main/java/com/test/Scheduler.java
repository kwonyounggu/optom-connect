package com.test;

import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

import com.utilities.CronUtil;

public class Scheduler
{

	public void generateCronExpression(Date date) 
	{

		try 
		{

			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String dt = dateFormat.format(date);
	
			Date cronDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dt);
	
			CronUtil calHelper = new CronUtil (cronDate);
			String cron = calHelper.getSeconds() + " " +
			calHelper.getMins() + " " +
			calHelper.getHours() + " " +
			calHelper.getDaysOfMonth() + " " +
			calHelper.getMonths() + " " +
			calHelper.getDaysOfWeek() + " " +
			calHelper.getYears();
			
			System.out.println("Cron Expression " + cron);

		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	public static void main(String[] args) throws Exception
	{
		new Scheduler().generateCronExpression(new Date());
	}
}
