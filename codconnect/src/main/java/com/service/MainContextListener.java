package com.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NameClassPair;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;

import com.beans.AuthUserDetailsInternalBean;
import com.dao.AuthDao;

//*****************************************************************************************************************************************
//see jdbc.postgresql.org/documentation/81/ds-ds.html
//Note: you can have another account for openshift 3 which is used for postgresql and db-managing web-app so that your main web-app give a
// 		query to the db-webapp in the different cluster.
//      [NOT-WORKING due to the different clusters]<=the postgresql can have a route (domain) which can be set as 
//		a ds.setSeverName("abc.starter-openshift.openshift.10.2.2.2.xip.io")
//INFO: from openshift online
//The following service(s) have been created in your project: postgresql.

//Username: admin
//Password: 277312
//Database Name: webmondb
//Connection URL: postgresql://postgresql:5432/
//*****************************************************************************************************************************************

//todo https://examples.javacodegeeks.com/core-java/apache/commons/dbcp/dbcp-connection-pooling-example/


import com.utilities.DatasourceUtil;
import com.utilities.Email;
import com.utilities.JdbcDriver;
import com.utilities.TokenUtil;
import com.utilities.Utils;

//import com.scheduled.UploadHvacManualsTask;

//import it.sauronsoftware.cron4j.Scheduler;

/*
 * OK, ServletContext and InitialContext are very different things. 
 * In a web container, each web application is associated with a context, and all resources contained within a web application exist relative to its context. For example if we have a store application, it could exist under the context /store. Therefore if the application contained a file called cart.jsp if would be accessible at http://localhost:8080/store/cart.jsp.
 * Each context that exists in a web container, has a special object called a ServletContext associated with it. The ServletContext represents the web applications view on the container that it is deployed within. The ServletContext allows servlets to access resources available to them in the container. The ServletContext can be thought of as a Sandbox for a web application. This sandbox allows us to have all of the benefits of isolating web applications that we mentioned above (no name clashes, and efficient easy classloading without having to set a classpath.) 
 * The servlet context can be used to accomplish many tasks in a web application, but perhaps its primary uses are for sharing attributes between all of the servlets in an application, and for loading resources for use within the application. We also define application initialization parameters using the ServletContext, this is discussed in the section relating to deployment descriptors.

 * On the other hand, the InitialContext allows you to get a reference to the JNDI (or other naming service) naming service that is running on a given server (specified when you create the initial context.) This allows you to look up EJBs and other resources (JMS queues etc) that are stored in the JNDI (or other naming service)tree.
 * The <resource-ref> tag is used to abstract the name used in an EJB to reference anothe EJB from the JNDI name under which the bean is deployed. Check this thread for more details.
 * Hope this helps
 * Cheers
 * Sam
 */
public class MainContextListener implements ServletContextListener
{
	private  Logger log = Logger.getLogger(this.getClass().getName());
	////private Scheduler uploadHvacManualsScheduler=null;
	
	public MainContextListener()
	{		
	}
	
	public void contextInitialized(ServletContextEvent event)
	{
		log.info("MainContextListener started initializing ..., "+System.getenv("POSTGRESQL_SERVICE_HOST"));
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;

		String showTablesSQL = "SELECT * FROM pg_catalog.pg_tables";

		try
		{
			log.info("Checking what resources are being taken through InitialConext...");
			/*Map<String, Object> map = toMap(new InitialContext());
			for (Entry<String,Object> pair : map.entrySet())
			{
		            //iterate over the pairs
		            System.out.println(pair.getKey()+" "+pair.getValue().toString());
		    }
			*/
			/*
			 * The following statments are working but there is a drawback in case of over the connection limit.
			 * see https://stackoverflow.com/questions/13202107/database-pool-with-pgpoolingdatasource
			 * It is not a very good idea to use PGPoolingDataSource, as JDBC documentation explains.
			 * The base problem is that the call for getConnection() will be blocked until a connection is closed when the limit of connections has been reached.
				PGPoolingDataSource pds = new PGPoolingDataSource();
				pds.setDataSourceName("openshift_webmonster_psqlds");
				pds.setServerName("172.30.213.129");
				pds.setDatabaseName("webmondb");
				pds.setUser("admin");
				pds.setPassword("277312");
				pds.setMaxConnections(10);
			*/
			
			//DataSource instantiation for Openshift Cluster
			//BasicDataSource.java supposed to load an appropriate jdbc driver but not, so load it explicitly
			Class.forName(JdbcDriver.getDriver(JdbcDriver.POSTGRESQL));
			String osclusterUrl = JdbcDriver.makeURL(JdbcDriver.getOscuster_db_hostname(), JdbcDriver.getOscluster_dbname(), JdbcDriver.POSTGRESQL);
			log.info("osClusterDs: "+osclusterUrl);
			BasicDataSource osClusterDs = DatasourceUtil.getDataSource(osclusterUrl, JdbcDriver.getOscluster_username(), JdbcDriver.getOscluster_password());
			
			con = osClusterDs.getConnection();

			stmt = con.createStatement();
			rs = stmt.executeQuery(showTablesSQL);
			int totalRows = 0;

			log.info("Connected to DB of webmonster");
			while (rs.next())
			{
				totalRows++;
			}
			log.info("Number of tables in posgresql database of webmonster: " + totalRows);
			
			//Get Email PWD from the table in the 2nd record where id=2 in auth_user_details_internal
			AuthUserDetailsInternalBean ab = new AuthDao(osClusterDs).getRecord(Utils.COMPANY_EMAIL, "email");
			Email.smtpAccessPwd = new String(Base64.getDecoder().decode(ab.getPasswordHash()), "utf-8");
			Email.smtpAccessEmail = Utils.COMPANY_EMAIL;
			
			ServletContext context=event.getServletContext();
			context.setAttribute("osClusterDs", osClusterDs);
			context.setAttribute("tokenUtil", new TokenUtil());

			//This is to get additional DEs if being existed due to the addition from remote hospitals
			//uploadHvacManualsScheduler = new Scheduler();
	    	//The following will be executed once a day at 0:00AM
			//uploadHvacManualsScheduler.schedule("10 0 * * *", new UploadHvacManualsTask((DataSource)context.getAttribute("dataSource")));//"10 0 * * *" at 00:10am
			//uploadHvacManualsScheduler.schedule("52 20 * * *", new UploadHvacManualsTask((DataSource)context.getAttribute("dataSource")));//"10 0 * * *" at 00:10am
			//uploadHvacManualsScheduler.schedule("*/20 * * * *", new UploadHvacManualsTask((DataSource)context.getAttribute("dataSource")));//every 20 minute for testing.

			//uploadHvacManualsScheduler.start();
			
			
		}
		/*catch(NamingException e)
		{
			//This exception wont be occured since datasource wont be taken from InitialContext
			log.severe("JNDI Naming Exception: "+e.toString());
		}*/
		catch (Exception e)
		{
			log.severe("Can Not connect to Database. Just for your information with the environment values, "+e.getMessage());
			/*Map<String, String> env = System.getenv();
			for (String envName : env.keySet())
			{
				log.severe("" + envName + ":" + env.get(envName));
			}*/
			e.printStackTrace();
		}
		finally
		{
			log.info("Connection to DB closed.");
			closeResultSet(rs);
			closeStatement(stmt);
			closeConnection(con);
			
			log.info("MainContextListener finished initializing !!!");
		}
	}



	public static void closeResultSet(ResultSet rs)
	{
		try
		{
			if(rs!=null && !rs.isClosed()) rs.close();
		}
		catch (Exception e)
		{
		}
	}

	public static void closeConnection(Connection con)
	{
		try
		{
			if(con!=null && !con.isClosed()) con.close();
		}
		catch (Exception e)
		{
		}
	}

	public static void closeStatement(Statement stmt)
	{
		try
		{
			if(stmt!=null && !stmt.isClosed())stmt.close();
		}
		catch (Exception e)
		{
		}
	}
	public static Map<String, Object> toMap(Context ctx) throws NamingException 
	{
	    String namespace = ctx instanceof InitialContext ? ctx.getNameInNamespace() : "";
	    HashMap<String, Object> map = new HashMap<String, Object>();
	    System.out.print("> Listing namespace: " + namespace);
	    NamingEnumeration<NameClassPair> list = ctx.list(namespace);
	    while (list.hasMoreElements()) 
	    {
	        NameClassPair next = list.next();
	        String name = next.getName();
	        String jndiPath = namespace + name;
	        Object lookup;
	        try 
	        {
	        	 System.out.println("> Looking up name: " + jndiPath);
	            Object tmp = ctx.lookup(jndiPath);
	            if (tmp instanceof Context) 
	            {
	                lookup = toMap((Context) tmp);
	            } 
	            else 
	            {
	                lookup = tmp.toString();
	            }
	        } 
	        catch (Throwable t) 
	        {
	            lookup = t.getMessage();
	        }
	        map.put(name, lookup);

	    }
	    return map;
	}
	//The following function is just informational
	public static Connection getConnection(String dataSourceJNDI) throws SQLException, Exception
	{
		try
		{
			InitialContext jndiCntx = new InitialContext();
			
			NamingEnumeration<NameClassPair> list = jndiCntx.list("java:comp/env/jdbc");
			while (list.hasMore()) 
			{
			    System.out.println(list.next().getName());
			}
			
			DataSource ds = (DataSource) jndiCntx.lookup(dataSourceJNDI);		
			Connection c = ds.getConnection("admin", "277312");
			return c;
		}
		catch (NamingException ne)
		{
			throw new Exception(ne);
		}
		catch (Exception e)
		{
			throw new Exception(e);
		}
	}

	public void contextDestroyed(ServletContextEvent event)
	{
		log.info("MainContextListener started being destroyed ...");
		ServletContext context=event.getServletContext();		
		context.removeAttribute("osClusterDs");
		
		//if(uploadHvacManualsScheduler!=null && uploadHvacManualsScheduler.isStarted()) uploadHvacManualsScheduler.stop();
	}
}
