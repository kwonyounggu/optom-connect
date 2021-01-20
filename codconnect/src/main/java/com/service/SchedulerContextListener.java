package com.service;

import java.util.logging.Logger;


import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.scheduled.InvalidatingSignupTask;
import com.utilities.Utils;

import it.sauronsoftware.cron4j.Scheduler;


public class SchedulerContextListener implements ServletContextListener
{
	private  Logger log = Logger.getLogger(this.getClass().getName());
	public static Scheduler scheduler=null;
	
	public SchedulerContextListener()
	{		
	}
	
	public void contextInitialized(ServletContextEvent event)
	{
		log.info("SchedulerContextListener started initializing ... ");
		
		try
		{

			scheduler = new Scheduler();
			ServletContext context=event.getServletContext();
			context.setAttribute("scheduler", scheduler);
			log.info("Scheudler cronned at ["+Utils.SIGNUP_CRON+"], valid_signup widthin "+Utils.VALID_SIGNUP+"hrs");
			scheduler.schedule(Utils.SIGNUP_CRON, new InvalidatingSignupTask());
			
			//Dec 30 2020, uncomment the following statement later
			//scheduler.start();

			
		}

		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{	
			log.info("SchedulerContextListener finished initializing !!!");
		}
	}

	public void contextDestroyed(ServletContextEvent event)
	{
		log.info("SchedulerContextListener started being destroyed ...");
		ServletContext context=event.getServletContext();		
		context.removeAttribute("scheduler");
		
		if(scheduler != null && scheduler.isStarted()) scheduler.stop();
	}
}
