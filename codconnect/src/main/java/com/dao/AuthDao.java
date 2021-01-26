package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;

import com.beans.AuthUserDetailsInternalBean;
import com.beans.AuthUserExternalLoginBean;
import com.exceptions.DAOException;

public class AuthDao
{
	private Logger log = Logger.getLogger(this.getClass().getName());
	private DataSource _ds = null;
	
	public AuthDao(BasicDataSource ds)
	{
		_ds = ds;
	}
	
	//This is to check if the same user already is being existed before signing up
	public boolean isUserExists(String whereStatement) throws DAOException
	{
		//Check using the table, auth_user_details_internal
		
		log.info("Begining for isUserExists("+whereStatement+")");
		
		Connection c = null;
		Statement s=null;
		ResultSet rs=null;
		boolean bResult = false;
		try
		{
			c = _ds.getConnection();
			s = c.createStatement();
			String sql = "select count(*) from auth_user_details_internal where " + whereStatement.toLowerCase();
			rs = s.executeQuery(sql);
						
			if (rs.next())
			{				
				int count=rs.getInt(1);
				log.info("count=" + count + "bResult=" + (count>=1));
				bResult = (count>=1);
			}		
			else throw new SQLException("there exists an error in query, " + sql);
		}
		catch (SQLException e)
		{
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		finally
		{
			closeResultSet(rs);
			closeStatement(s);
			closeConnection(c);
			log.info("Ending for isUserExists("+whereStatement+")");
		}
		return bResult;
	}
	@SuppressWarnings("resource")
	public boolean signUpRegistration(AuthUserDetailsInternalBean ab) throws DAOException
	{
		log.info("Calling for signUpRegistration(AuthUserDetailsInternalBean ab)");
		boolean bResult = true;
		Connection c = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try
		{
			c = _ds.getConnection();
			c.setAutoCommit(false);
			
			String sQuery = "insert into auth_user_details_internal values(default,?,null,null,?,?,?,null,null,null,?,?,?,?,?,now(),?,?)";
			ps = c.prepareStatement(sQuery, Statement.RETURN_GENERATED_KEYS);
			
			ps.setString(1, ab.getFullName());
			ps.setString(2, ab.getEmail());
			ps.setString(3, ab.getPasswordSalt());
			ps.setString(4, ab.getPasswordHash()); 
			ps.setString(5, ab.getEmailConfirmationToken());
			ps.setInt(6, ab.getAuthUserAccountStatusId());
			ps.setInt(7, ab.getAuthUserAuthorizationLevelId());
			ps.setBoolean(8, ab.isAcceptTermsOfService());
			ps.setString(9, ab.getTimezone());
			ps.setString(10, ab.getProviderNumber());
			ps.setString(11, ab.getProvince());
			
			log.info(ps.toString());
			
			//if ps statement contains a bit operation then use the following api - Nov-09-2017
			//c.createStatement().execute(ps.toString());
			
			ps.executeUpdate();
			
			rs = ps.getGeneratedKeys();
			if(rs.next()) ab.setId(rs.getInt(1));
			else throw new SQLException("Newly inserted id in auth_user_details_internal has failed to return.");
			
			closeStatement(ps);
			
			//Now insert into the main table
			sQuery = "insert into auth_user_account values(default,?,?)";
			ps = c.prepareStatement(sQuery);
			
			ps.setString(1, ab.getFullName());
			ps.setInt(2, ab.getId());
			
			ps.executeUpdate();
			
			c.commit();
		}
		catch (SQLException e)
		{
			bResult = false;
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		finally
		{
			if(!bResult) try{ c.rollback(); } catch(Exception e) {e.printStackTrace();}
			try{ c.setAutoCommit(true);} catch(Exception e) {e.printStackTrace();}
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(c);
			log.info("Ending for signUpRegistration(AuthUserDetailsInternalBean ab)");
		}
		return bResult;
	}
	/*
	 * Note that password->hashSync(password, 10); here 10 is a salt value
	 */
	public AuthUserDetailsInternalBean insertAuthUserDetailsInternal(AuthUserDetailsInternalBean ab) throws DAOException
	{		
		log.info("Calling for insertAuthUserDetailsInternal(AuthUserDetailsInternalBean ab)");
		Connection c = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try
		{
			c = _ds.getConnection();
			String sQuery="insert into auth_user_details_internal values(default,?,null,null,?,?,?,null,null,null,null,?,?,?,?,current_timestamp,?,?)";
			ps = c.prepareStatement(sQuery);
			
			ps.setString(1, ab.getFullName());
			ps.setString(2, ab.getEmail());
			ps.setString(3, ab.getPasswordSalt());
			ps.setString(4, ab.getPasswordHash()); 
			ps.setInt(5, ab.getAuthUserAccountStatusId());
			ps.setInt(6, ab.getAuthUserAuthorizationLevelId());
			ps.setBoolean(7, ab.isAcceptTermsOfService());
			ps.setString(8, ab.getTimezone());
			ps.setString(10, ab.getProviderNumber());
			ps.setString(11, ab.getProvince());
			
			log.info(ps.toString());
			
			//if ps statement contains a bit operation then use the following api - Nov-09-2017
			//c.createStatement().execute(ps.toString());
			
			if(ps.executeUpdate()==1)//only one record inserted
			{
				rs = c.createStatement().executeQuery("select currval(pg_get_serial_sequence('auth_user_details_internal', 'id'");
				if(rs.next()) ab.setId(rs.getInt(1));
			}
			
		}
		catch (SQLException e)
		{
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		finally
		{
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(c);
			log.info("Ending for insertAuthUserDetailsInternal(AuthUserDetailsInternalBean ab)");
		}
		return ab;
	}
	/*
	 * Get this record and check pwd and provide necessary information to the client
	 */
	public AuthUserDetailsInternalBean getRecord(String value, String field) throws DAOException
	{
			log.info("Begining for getRecord("+value+", "+field+")");
			
			Connection c = null;
			Statement s=null;
			ResultSet rs=null;
			AuthUserDetailsInternalBean ab = new AuthUserDetailsInternalBean();
			try
			{
				c = _ds.getConnection();
				s = c.createStatement();
				
				if(field.equals("value")) value = value.toLowerCase();
				
				String sql = "select * from auth_user_details_internal where "+field+"='" + value + "' limit 1";
				
				rs = s.executeQuery(sql);

				if (rs.next())
				{	
					ab.setId(rs.getInt(1));
					ab.setFullName(rs.getString(2));
					ab.setFirstName(rs.getString(3));
					ab.setLastName(rs.getString(4));
					ab.setEmail(rs.getString(5));
					ab.setPasswordSalt(rs.getString(6));
					ab.setPasswordHash(rs.getString(7));
					ab.setPasswordHashAlgorithm(rs.getString(8));
					ab.setPasswordReminderToken(rs.getString(9));
					ab.setPasswordReminderExpire(rs.getTimestamp(10));
					ab.setEmailConfirmationToken(rs.getString(11));
					ab.setAuthUserAccountStatusId(rs.getShort(12));
					ab.setAuthUserAuthorizationLevelId(rs.getShort(13));
					ab.setAcceptTermsOfService(rs.getBoolean(14));
					ab.setTimezone(rs.getString(15));
					ab.setRegistrationTime(rs.getTimestamp(16));
					ab.setProviderNumber(rs.getString(17));
					ab.setProvince(rs.getString(18));
				}		
				
			}
			catch (SQLException e)
			{
				log.severe(e.getMessage());
				throw new DAOException(e);
			}
			finally
			{
				closeResultSet(rs);
				closeStatement(s);
				closeConnection(c);
				log.info("Ending for getRecord(value, field)");
			}
			return ab;
	}
	public List<AuthUserDetailsInternalBean> getRecords(String arg) throws DAOException
	{
		log.info("Calling for getRecords("+arg+")");
		
		List<AuthUserDetailsInternalBean> list=new ArrayList<AuthUserDetailsInternalBean>();
		
		Connection c = null;
		Statement s=null;
		ResultSet rs=null;
		try
		{
			c = _ds.getConnection();
			s = c.createStatement();
			rs = s.executeQuery("select * from auth_user_details_internal "+arg);

			while (rs.next())
			{
				AuthUserDetailsInternalBean ab=new AuthUserDetailsInternalBean();
				
				ab.setId(rs.getInt(1));
				ab.setFullName(rs.getString(2));
				ab.setFirstName(rs.getString(3));
				ab.setLastName(rs.getString(4));
				ab.setEmail(rs.getString(5));
				ab.setPasswordSalt(rs.getString(6));
				ab.setPasswordHash(rs.getString(7));
				ab.setPasswordHashAlgorithm(rs.getString(8));
				ab.setPasswordReminderToken(rs.getString(9));
				ab.setPasswordReminderExpire(rs.getTimestamp(10));
				ab.setEmailConfirmationToken(rs.getString(11));
				ab.setAuthUserAccountStatusId(rs.getShort(12));
				ab.setAuthUserAuthorizationLevelId(rs.getShort(13));
				ab.setAcceptTermsOfService(rs.getBoolean(14));
				ab.setTimezone(rs.getString(15));
				ab.setRegistrationTime(rs.getTimestamp(16));
				ab.setProviderNumber(rs.getString(17));
				ab.setProvince(rs.getString(18));

				list.add(ab);
			}
		}
		catch (SQLException e)
		{
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		finally
		{
			closeResultSet(rs);
			closeStatement(s);
			closeConnection(c);
			log.info("Ending for getRecords(String arg)");
		}
		return list;

	}
	
	//SNS Login Registration
	public boolean snsRegistration(AuthUserExternalLoginBean ab) throws DAOException
	{
		log.info("Calling for snsRegistration(AuthUserExternalLoginBean ab)");
		boolean bResult = true;
		Connection c = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try
		{
			c = _ds.getConnection();
			c.setAutoCommit(false);
			
			String sQuery = "insert into auth_user_account values(default,?,null)";
			ps = c.prepareStatement(sQuery, Statement.RETURN_GENERATED_KEYS);
			
			ps.setString(1, ab.getName()+" ["+ab.getExternalUserId()+"]");
			
			
			//if ps statement contains a bit operation then use the following api - Nov-09-2017
			//c.createStatement().execute(ps.toString());
			
			ps.executeUpdate();
			
			rs = ps.getGeneratedKeys();
			if(rs.next()) ab.setAuthUserAccountId(rs.getInt(1));
			else throw new SQLException("an newly inserted record into auth_user_account has failed to return.");
			
			closeStatement(ps);
			
			sQuery = "insert into auth_user_external_login values(default,?,?,?,?,?,now())";
			ps = c.prepareStatement(sQuery);
			
			ps.setInt(1, ab.getAuthUserAccountId());
			ps.setInt(2, ab.getAuthExternalAuthenticationProviderId());
			ps.setString(3, ab.getExternalUserId());
			ps.setString(4, ab.getName());
			ps.setString(5, ab.getEmail());
			
			ps.executeUpdate();
			
			c.commit();
		}
		catch (SQLException e)
		{
			bResult = false;
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		finally
		{
			if(!bResult) try{ c.rollback(); } catch(Exception e) {e.printStackTrace();}
			try{ c.setAutoCommit(true);} catch(Exception e) {e.printStackTrace();}
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(c);
			log.info("Ending for snsRegistration(AuthUserExternalLoginBean ab)");
		}
		return bResult;
	}
	
	public int getSnsProviderId(String snsProvider) throws DAOException
	{
			log.info("Begining for getSnsProviderId("+snsProvider+")");
			
			Connection c = null;
			Statement s = null;
			ResultSet rs = null;
			int snsId = -1;
			try
			{
				c = _ds.getConnection();
				s = c.createStatement();
				
				String sql = "select id from auth_external_authentication_provider where name='" + snsProvider + "'";
				
				rs = s.executeQuery(sql);

				if (rs.next())
				{	
					snsId = rs.getInt(1);					
				}		
				
			}
			catch (SQLException e)
			{
				log.severe(e.getMessage());
				throw new DAOException(e);
			}
			finally
			{
				closeResultSet(rs);
				closeStatement(s);
				closeConnection(c);
				log.info("Ending for getSnsProviderId(snsProvider)");
			}
			return snsId;
	}
	public Object queryObject(String sql) throws DAOException
	{
			log.info("Begining for queryObject("+sql+")");
			
			Connection c = null;
			Statement s = null;
			ResultSet rs = null;
			Object retObj = null;
			try
			{
				c = _ds.getConnection();
				s = c.createStatement();

				rs = s.executeQuery(sql);

				if (rs.next())
				{	
					retObj = rs.getObject(1);					
				}		
				
			}
			catch (SQLException e)
			{
				log.severe(e.getMessage());
				throw new DAOException(e);
			}
			finally
			{
				closeResultSet(rs);
				closeStatement(s);
				closeConnection(c);
				log.info("Ending for queryObject(sql)");
			}
			return retObj;
	}
	public int updateTable(String sqlCmd) throws DAOException
	{
		log.info("Begining for updateTable("+sqlCmd+")");
		
		Connection c = null;
		Statement s = null;
		int bResult = -1;
		try
		{
			c = _ds.getConnection();
			s = c.createStatement();
			
			bResult = s.executeUpdate(sqlCmd);		
		}
		catch (SQLException e)
		{
			log.severe(e.getMessage());
			throw new DAOException(e);
		}
		finally
		{
			closeStatement(s);
			closeConnection(c);
			log.info("Ending for updateTable(sqlCmd)");
		}
		return bResult;
	}
	/*
	 * Delete two records from two tables, auth_user_account and auth_user_details_internal
	 */
	public boolean deleteRecords(AuthUserDetailsInternalBean ab) throws DAOException
	{
		log.info("Begining for deleteRecords("+ab+")");
		
		Connection c = null;
		Statement s = null;
		boolean bResult = true;
		try
		{
			c = _ds.getConnection();
			s = c.createStatement();
			
			s.executeUpdate("delete from auth_user_details_internal where id="+ab.getId());
			s.executeUpdate("delete from auth_user_account where auth_user_details_internal_id="+ab.getId());		
		}
		catch (SQLException e)
		{
			log.severe(e.getMessage());
			bResult = false;
			throw new DAOException(e);
		}
		finally
		{
			closeStatement(s);
			closeConnection(c);
			log.info("Ending for deleteRecords(AuthUserDetailsInternalBean ab)");
		}
		return bResult;
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
	
}
