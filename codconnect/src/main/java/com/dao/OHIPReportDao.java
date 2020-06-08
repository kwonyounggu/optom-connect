package com.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.json.JSONArray;
import org.json.JSONObject;

import com.beans.MusicTracksBean;
import com.exceptions.DAOException;
import com.ohip.payments.beans.CEHX1Bean;
import com.ohip.payments.beans.CEHX8Bean;
import com.ohip.payments.beans.CEHX9Bean;
import com.ohip.payments.beans.CEHXHBean;
import com.ohip.payments.beans.CEHXRBean;
import com.ohip.payments.beans.CEHXTBean;
import com.ohip.payments.beans.FileInfoBean;
import com.ohip.payments.beans.RVHR1Bean;
import com.ohip.payments.beans.RVHR2Bean;
import com.ohip.payments.beans.RVHR3Bean;
import com.ohip.payments.beans.RVHR4Bean;
import com.ohip.payments.beans.RVHR5Bean;
import com.ohip.payments.beans.RVHR6Bean;
import com.ohip.payments.beans.RVHR7Bean;
import com.ohip.payments.beans.RVHR8Bean;
import com.utilities.JsonUtils;

public class OHIPReportDao
{
	private Logger log = Logger.getLogger(this.getClass().getName());
	private DataSource _ds = null;
	
	public OHIPReportDao(BasicDataSource ds)
	{
		_ds = ds;
	}
	public boolean insertRAData(JSONObject jsonData, FileInfoBean fb, JSONObject token) throws DAOException
	{
		Connection c = null;
		Statement s=null;
		ResultSet rs=null;
		try
		{
			c = _ds.getConnection();
			c.setAutoCommit(false);
			
			s = c.createStatement();
			String sqlCmd = "";
			
			// ********** GET AUTH_USER_ACCOUNT_ID **********
			if (token.getString("sub").equals("internalLogin"))
				sqlCmd = "select id from auth_user_account where auth_user_details_internal_id=" +
						    "(select id from auth_user_details_internal where email='" + token.getString("jti") + "');";
			else if (token.getString("sub").equals("externalLogin"))
				sqlCmd = "select auth_user_account_id from auth_user_external_login where email='" + token.getString("jti") + "';";
			else
				throw new DAOException("Unknown subject of token out of expecting 'internalLogin' or 'externalLogin'");

			rs = s.executeQuery(sqlCmd);
			if (rs.next()) token.put("authUserAccountId", rs.getInt(1));
			else throw new DAOException("Oops DB corrupted, please logout and login. -- Do it again!");
			//1. check if the same person has already put the same file data through ohip_mro_tx_history
			// ********** CHECK IF THE SAME FILE IS ALREADY INSERTED BY THE SAME USER_ID **********
			// if it is already in, then update or discard
			sqlCmd = "select 1 from ohip_mro_tx_history where file_name='" + fb.getFileName() + "' " +
					 "and auth_user_account_id=" + token.getInt("authUserAccountId") + " limit 1;";
			rs = s.executeQuery(sqlCmd);
			if (rs.next())
			{
				//There is already file info in the tables so update it, do it later for updating hr1 to hr8 and ohip_mro_tx_history
			}
			// ********** INSERT INTO TABLES SUCH AS HR1 ... HR8 AND HISTORY TABLE **********
			else
			{
				//First , insert into ohip_mro_tx_history in order to have a ohip_mro_history_id
				sqlCmd = fb.getInsertStmtTo_ohip_mro_tx_history(token.getInt("authUserAccountId"));
				//log.info(sqlCmd);
				s.executeUpdate(sqlCmd);
				sqlCmd = "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_tx_history', 'ohip_mro_tx_history_id'));";
				rs = s.executeQuery(sqlCmd); //to have ohip_mro_tx_history_id into the ohip_mro_hr1 as a fk.
				if (rs.next()) 
				{
					s.executeUpdate(RVHR1Bean.getInsertStmtTo_ohip_mro_hr1(jsonData.getJSONObject("hr1"), rs.getInt(1)));
				}
				sqlCmd = "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_hr1', 'ohip_mro_hr1_id'));";
				rs = s.executeQuery(sqlCmd); //ohip_mro_hr1_id for hr2 ... hr8
				int ohipMroHr1Id = -1;
				if (rs.next())
				{
					ohipMroHr1Id = rs.getInt(1);
					s.executeUpdate(RVHR2Bean.getInsertStmtTo_ohip_mro_hr2(jsonData.getJSONObject("hr2"), ohipMroHr1Id));
				}
				s.executeUpdate(RVHR3Bean.getInsertStmtTo_ohip_mro_hr3(jsonData.getJSONObject("hr3"), ohipMroHr1Id));
				JSONArray hrArray = jsonData.getJSONArray("hr4");
				for (int i=0, size=hrArray.length(); i < size; i++)
				{
					JSONObject hr4Bean = hrArray.getJSONObject(i);
					s.executeUpdate(RVHR4Bean.getInsertStmtTo_ohip_mro_hr4(hr4Bean, ohipMroHr1Id));
				}
				hrArray = jsonData.getJSONArray("hr5");
				for (int i=0, size=hrArray.length(); i < size; i++)
				{
					JSONObject hr5Bean = hrArray.getJSONObject(i);
					s.executeUpdate(RVHR5Bean.getInsertStmtTo_ohip_mro_hr5(hr5Bean, ohipMroHr1Id));
				}
				if (jsonData.has("hr6"))
					s.executeUpdate(RVHR6Bean.getInsertStmtTo_ohip_mro_hr6(jsonData.getJSONObject("hr6"), ohipMroHr1Id));
				
				if (jsonData.has("hr7"))
					s.executeUpdate(RVHR7Bean.getInsertStmtTo_ohip_mro_hr7(jsonData.getJSONObject("hr7"), ohipMroHr1Id));
				hrArray = jsonData.getJSONArray("hr8");
				log.info("length of hr8: " + hrArray.length());
				for (int i=0, size=hrArray.length(); i < size; i++)
				{
					JSONObject hr8Bean = hrArray.getJSONObject(i);
					s.executeUpdate(RVHR8Bean.getInsertStmtTo_ohip_mro_hr8(hr8Bean, ohipMroHr1Id));
				}
				
			}

			//c.rollback();
			c.commit();
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
			try
			{
				c.rollback();
			}
			catch(Exception rbe)
			{
				log.severe("Rollback failed: " + rbe.getMessage());
			}
			throw new DAOException(e);
		}
		finally
		{
			closeResultSet(rs);
			closeStatement(s);
			closeConnection(c);
			log.info("Ending for insertRAData(...)");
		}
		return true;
	}
	/*
	 * Check if hx sequence is minimally in the tracks such as hx1, hxh, hxt, hx9
	 */
	public boolean insertClaimErrorData(JSONArray jsonData, FileInfoBean fb, JSONObject token) throws DAOException
	{
		Connection c = null;
		Statement s=null;
		ResultSet rs=null;
		try
		{
			c = _ds.getConnection();
			c.setAutoCommit(false);
			
			s = c.createStatement();
			String sqlCmd = "";
			
			// ********** GET AUTH_USER_ACCOUNT_ID **********
			if (token.getString("sub").equals("internalLogin"))
				sqlCmd = "select id from auth_user_account where auth_user_details_internal_id=" +
						    "(select id from auth_user_details_internal where email='" + token.getString("jti") + "');";
			else if (token.getString("sub").equals("externalLogin"))
				sqlCmd = "select auth_user_account_id from auth_user_external_login where email='" + token.getString("jti") + "';";
			else
				throw new DAOException("Unknown subject of token out of expecting 'internalLogin' or 'externalLogin'");

			rs = s.executeQuery(sqlCmd);
			if (rs.next()) token.put("authUserAccountId", rs.getInt(1));
			else throw new DAOException("Oops DB corrupted, please logout and login. -- Do it again!");
			//1. check if the same person has already put the same file data through ohip_mro_tx_history
			// ********** CHECK IF THE SAME FILE IS ALREADY INSERTED BY THE SAME USER_ID **********
			// if it is already in, then update or discard
			sqlCmd = "select 1 from ohip_mro_tx_history where file_name='" + fb.getFileName() + "' " +
					 "and auth_user_account_id=" + token.getInt("authUserAccountId") + " limit 1;";
			rs = s.executeQuery(sqlCmd);
			if (rs.next())
			{
				//There is already file info in the tables so update it, do it later for updating hr1 to hr8 and ohip_mro_tx_history
			}
			// ********** INSERT INTO TABLES SUCH AS HX1 ... HX9 AND HISTORY TABLE **********
			else
			{
				//First , insert into ohip_mro_tx_history in order to have a ohip_mro_history_id
				sqlCmd = fb.getInsertStmtTo_ohip_mro_tx_history(token.getInt("authUserAccountId"));
				//log.info(sqlCmd);
				s.executeUpdate(sqlCmd);
				sqlCmd = "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_tx_history', 'ohip_mro_tx_history_id'));";
				rs = s.executeQuery(sqlCmd); //to have ohip_mro_tx_history_id into the ohip_mro_hr1 as a fk.
				int ohipMroTxHistoryId = -1;
				int ohipMroHx1Id = -1;
				int ohipMroHxhId = -1;
				int ohipMroHxtId = -1;
				String hxSequence = "";
				if (rs.next()) ohipMroTxHistoryId = rs.getInt(1);
				for (int i=0, size=jsonData.length(); i < size; i++)
				{
					JSONObject jo = jsonData.getJSONObject(i);
					switch(jo.getString("transactionIdentifier"))
					{
						case "HX1":
						{
							hxSequence += "HX1";
							s.executeUpdate(CEHX1Bean.getInsertStmtTo_ohip_mro_hx1(jo, ohipMroTxHistoryId));
							sqlCmd = "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_hx1', 'ohip_mro_hx1_id'));";
							rs = s.executeQuery(sqlCmd); 
							if (rs.next()) ohipMroHx1Id = rs.getInt(1);
							break;
						}
						case "HXH":
						{
							hxSequence += ",HXH";
							s.executeUpdate(CEHXHBean.getInsertStmtTo_ohip_mro_hxh(jo, ohipMroHx1Id));
							sqlCmd = "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_hxh', 'ohip_mro_hxh_id'));";
							rs = s.executeQuery(sqlCmd); 
							if (rs.next()) ohipMroHxhId = rs.getInt(1);
							break;
						}
						case "HXR":
						{
							hxSequence += ",HXR";
							s.executeUpdate(CEHXRBean.getInsertStmtTo_ohip_mro_hxr(jo, ohipMroHx1Id, ohipMroHxhId));
							break;
						}
						case "HXT":
						{
							hxSequence += ",HXT";
							s.executeUpdate(CEHXTBean.getInsertStmtTo_ohip_mro_hxt(jo, ohipMroHx1Id, ohipMroHxhId));
							sqlCmd = "SELECT CURRVAL(pg_get_serial_sequence('ohip_mro_hxt', 'ohip_mro_hxt_id'));";
							rs = s.executeQuery(sqlCmd); 
							if (rs.next()) ohipMroHxtId = rs.getInt(1);
							break;
						}
						case "HX8":
						{
							hxSequence += ",HX8";
							s.executeUpdate(CEHX8Bean.getInsertStmtTo_ohip_mro_hx8(jo, ohipMroHx1Id, ohipMroHxhId, ohipMroHxtId));
							break;
						}
						case "HX9":
						{
							hxSequence += ",HX9";
							s.executeUpdate(CEHX9Bean.getInsertStmtTo_ohip_mro_hx9(jo, ohipMroTxHistoryId, hxSequence));
							break;
						}
						default: 
						{
							throw new Exception("Unknown Transaction Identifier in Claim Error. -- Try again with the orignial!");
						}
							
					}
				}
			}

			c.rollback();
			//c.commit();
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
			try
			{
				c.rollback();
			}
			catch(Exception rbe)
			{
				log.severe("Rollback failed: " + rbe.getMessage());
			}
			throw new DAOException(e);
		}
		finally
		{
			closeResultSet(rs);
			closeStatement(s);
			closeConnection(c);
			log.info("Ending for insertClaimErrorData(...)");
		}
		return true;
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
				log.info("Ending for queryObject()");
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
			if(con != null) 
			{
				con.setAutoCommit(true);
				con.close();
			}
			con = null;
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
		}
	}
	
}
