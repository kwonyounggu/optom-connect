package com.scheduled;

import java.util.List;
import java.util.logging.Logger;

import com.beans.AuthUserDetailsInternalBean;

import com.dao.AuthDao;
import com.utilities.DatasourceUtil;
import com.utilities.Utils;

import it.sauronsoftware.cron4j.Task;
import it.sauronsoftware.cron4j.TaskExecutionContext;

public class InvalidatingSignupTask extends Task
{
	private Logger log = Logger.getLogger(this.getClass().getName()); 
	
	public InvalidatingSignupTask()
	{	
	}
	@Override
	public void execute(TaskExecutionContext arg0) throws RuntimeException
	{

		try
		{
			/*
			 * read the table, auth_user_details_internal where auth_user_account_status!=1 && registration_time is over 72 hours/3days
			 * delete the records if any
			 */
			AuthDao authDao = new AuthDao(DatasourceUtil.getDataSource());
			List<AuthUserDetailsInternalBean> list = authDao.getRecords("where auth_user_account_status_id=2 and registration_time < (now()-interval '"+Utils.VALID_SIGNUP+" hours')");
			log.info("Number of registrations to delete through scheduler: " + list.size());
			for(AuthUserDetailsInternalBean ab : list)
			{
				authDao.deleteRecords(ab);
			}
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
			e.printStackTrace();
			
		}
	}

}
