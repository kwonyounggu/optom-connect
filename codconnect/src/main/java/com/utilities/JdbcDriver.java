package com.utilities;

import java.util.ResourceBundle;

public class JdbcDriver
{
	public static final int ORACLE = 1;
	public static final int SYBASE = 2;
	public static final int MYSQL = 3;
	public static final int AS400 = 4;
	public static final int MSSQL = 5;
	public static final int POSTGRESQL = 6;
	public static final int UNKNOWN = -1;

	private static String oscuster_db_hostname;
	private static String oscluster_dbname;
	private static String oscluster_username;
	private static String oscluster_password;
   
    static 
    {
        try 
        {
            ResourceBundle bundle = ResourceBundle.getBundle("database");
            
            //oscuster_db_hostname = System.getenv("POSTGRESQL_SERVICE_HOST");
            oscuster_db_hostname = bundle.getString("oscuster_db_hostname");
            oscluster_dbname = bundle.getString("oscluster_dbname");
            oscluster_username = bundle.getString("oscluster_username");
            oscluster_password = bundle.getString("oscluster_key");
         
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
    }
	
	/**
	 * created on Sep-19-2017
	 */
    public static String getOscuster_db_hostname()
	{
		return oscuster_db_hostname;
	}
	public static void setOscuster_db_hostname(String oscuster_db_hostname)
	{
		JdbcDriver.oscuster_db_hostname = oscuster_db_hostname;
	}
	public static String getOscluster_dbname()
	{
		return oscluster_dbname;
	}
	public static void setOscluster_dbname(String oscluster_dbname)
	{
		JdbcDriver.oscluster_dbname = oscluster_dbname;
	}
	public static String getOscluster_username()
	{
		return oscluster_username;
	}
	public static void setOscluster_username(String oscluster_username)
	{
		JdbcDriver.oscluster_username = oscluster_username;
	}
	public static String getOscluster_password()
	{
		return oscluster_password;
	}
	public static void setOscluster_password(String oscluster_password)
	{
		JdbcDriver.oscluster_password = oscluster_password;
	}
	public static String makeURL(String host, String dbName, int vendor)
	{
		System.out.println("makeUrl("+host+", "+dbName+", "+vendor+")");
		if (vendor == ORACLE)
		{
			//return ("jdbc:oracle:thin:@" + host + ":1521:" + dbName);
			//jdbc:oracle:thin:@//<host>:<port>/<service_name>
			return ("jdbc:oracle:thin:@" + host + ":1521"+ "/" + dbName);
		}
		else if (vendor == SYBASE)
		{
			return ("jdbc:sybase:Tds:" + host + ":1521" + "?SERVICENAME=" + dbName);
		}
		else if (vendor == MYSQL)
		{
			//return ("jdbc:mysql://" + host + ":3306" + "/" + dbName);
			return ("jdbc:mysql://" + host + ":3306" + "/" + dbName+"?autoReconnect=true");
		}
		else if (vendor == MSSQL)
		{
			return (host);
		}
		else if (vendor==POSTGRESQL)
		{
			return ("jdbc:postgresql://" + host + ":5432" + "/" + dbName);
		}
		else
		{
			return (null);
		}
	}

	/** Get the fully qualified name of a driver. */

	public static String getDriver(int vendor)
	{
		if (vendor == ORACLE)
		{
			return ("oracle.jdbc.driver.OracleDriver");
		}
		else if (vendor == SYBASE)
		{
			return ("com.sybase.jdbc.SybDriver");
		}
		else if (vendor == MYSQL)
		{
			return ("com.mysql.jdbc.Driver");
		}
		else if (vendor == MSSQL)
		{
			return ("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		}
		else if (vendor == AS400)
		{
			return ("com.ibm.as400.access.AS400JDBCDriver");
		}
		else if (vendor==POSTGRESQL)
		{
			return ("org.postgresql.Driver");
		}
		else
		{
			return (null);
		}
	}

	/** Map name to int value. */

	public static int getVendor(String vendorName)
	{
		if (vendorName.equalsIgnoreCase("oracle"))
		{
			return (ORACLE);
		}
		else if (vendorName.equalsIgnoreCase("sybase"))
		{
			return (SYBASE);
		}
		else if (vendorName.equalsIgnoreCase("mysql"))
		{
			return (MYSQL);
		}
		else if (vendorName.equalsIgnoreCase("postgresql"))
		{
			return (POSTGRESQL);
		}
		else
		{
			return (UNKNOWN);
		}
	}
}