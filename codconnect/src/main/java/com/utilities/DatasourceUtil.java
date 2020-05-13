package com.utilities;

import org.apache.commons.dbcp2.BasicDataSource;

public class DatasourceUtil
{
	private static BasicDataSource dataSource = null;
	
	public static BasicDataSource getDataSource()
	{
	
			if (dataSource == null)
			{
				try
				{
					Class.forName(JdbcDriver.getDriver(JdbcDriver.POSTGRESQL));
					String osclusterUrl = JdbcDriver.makeURL(JdbcDriver.getOscuster_db_hostname(), JdbcDriver.getOscluster_dbname(), JdbcDriver.POSTGRESQL);
					
					BasicDataSource ds = new BasicDataSource();
					ds.setUrl(osclusterUrl);
					ds.setUsername(JdbcDriver.getOscluster_username());
					ds.setPassword(JdbcDriver.getOscluster_password());
					ds.setMinIdle(5);
					ds.setMaxIdle(10);
					ds.setMaxOpenPreparedStatements(100);
	
					dataSource = ds;
				}
				catch (ClassNotFoundException e)
				{
					e.printStackTrace();
				}
				
			}
			return dataSource;
	}
	
	//To provide more than one data source. 
	public static BasicDataSource getDataSource(String url, String username, String password)
	{
		BasicDataSource ds = new BasicDataSource();
		ds.setUrl(url);
		ds.setUsername(username);
		ds.setPassword(password);
		ds.setMinIdle(5);
		ds.setMaxIdle(10);
		ds.setMaxOpenPreparedStatements(100);
		return ds;
	}
}
