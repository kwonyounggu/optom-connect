package org.openshift;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;
import java.util.logging.Logger;

import org.apache.commons.dbcp2.BasicDataSource;

import com.exceptions.DAOException;

public class InsultGenerator 
{
	private Logger log = Logger.getLogger(this.getClass().getName());
	BasicDataSource _ds = null;
	public InsultGenerator(BasicDataSource ds)
	{
		_ds = ds;
	}
	public String generateInsult() throws DAOException
	{
		String words[][] = {{"Artless", "Bawdy", "Beslubbering"}, {"Base-court", "Bat-fowling", "Beef-witted"}, {"Apple-john", "Baggage", "Barnacle"}};
		String vowels = "AEIOU";
		String article = "an";
		String theInsult = "";
		
		/*
		String firstAdjective = words[0][new Random().nextInt(words[0].length)];
		String secondAdjective = words[1][new Random().nextInt(words[1].length)];
		String noun = words[2][new Random().nextInt(words[2].length)];
		if (vowels.indexOf(firstAdjective.charAt(0)) == -1)
		{
			article = "a";
		}
		*/
		Connection c = null;
		Statement s=null;
		ResultSet rs=null;
		log.info(">>> here-1");
		try
		{

			c = _ds.getConnection();
			
			
			if(c != null)
			{
				String sql = "select a.string as first, b.string as second, c.string as noun from short_adjective a, long_adjective b, noun c order by random() limit 1";
				s = c.createStatement();
				rs = s.executeQuery(sql);
				
				while(rs.next())
				{
					if (vowels.indexOf(rs.getString("first").charAt(0)) == -1)
					{
						article = "a";
					}
					
					theInsult = String.format("Hello Thou art %s %s %s %s!", article, rs.getString("first"), rs.getString("second"), rs.getString("noun"));
				}
				rs.close();
				c.close();
			}
			else theInsult = "Database Connection is NULL!!!";
		}
		catch (SQLException e)
		{
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		finally
		{
			closeResultSet(rs);
			closeStatement(s);
			closeConnection(c);
			log.info("Ending for generateInsult()");
		}
		//The following is the same as a statement implemented at the last in the catch block
		return theInsult;
		
	}
	
	private void closeResultSet(ResultSet rs)
	{
		try
		{
			if(rs!=null) rs.close();
			rs=null;
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
		}
	}
	private void closeConnection(Connection con)
	{
		try
		{
			if(con!=null) con.close();
			con=null;
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
		}
	}
	private void closeStatement(Statement stmt)
	{
		try
		{
			if(stmt!=null) stmt.close();
			stmt=null;
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
		}
	}

}
