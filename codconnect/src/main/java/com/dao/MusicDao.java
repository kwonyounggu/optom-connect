package com.dao;

import java.sql.Connection;
//import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
//import org.json.JSONArray;
import org.json.JSONObject;

import com.beans.MusicTracksBean;
import com.exceptions.DAOException;
//import com.utilities.JsonUtils;

public class MusicDao
{
	private Logger log = Logger.getLogger(this.getClass().getName());
	private DataSource _ds = null;
	
	public MusicDao(BasicDataSource ds)
	{
		_ds = ds;
	}
	//select music_artists.name, title, version, music_genres.name, midi_url, youtube_url, audio_url, comment_url, abc_string, release_date, access_count  from music_tracks, music_artists, music_genres where music_tracks.artist_id=music_artists.id and music_tracks.genre_id=music_genres.id order by music_tracks.genre_id;
	public List<MusicTracksBean> getTrackRecords(String arg) throws DAOException
	{
		log.info("Calling for getTrackRecords("+arg+")");
		
		List<MusicTracksBean> list=new ArrayList<MusicTracksBean>();
		
		Connection c = null;
		Statement s=null;
		ResultSet rs=null;
		try
		{
			c = _ds.getConnection();
			s = c.createStatement();
			rs = s.executeQuery("select * from music_tracks "+arg);

			while (rs.next())
			{
				MusicTracksBean mtb=new MusicTracksBean();

				mtb.setId(rs.getInt(1));
				mtb.setArtistId(rs.getInt(2));
				mtb.setTitle(rs.getString(3));
				mtb.setVersion(rs.getString(4));
				mtb.setGenreId(rs.getShort(5));
				mtb.setMidiUrl(rs.getString(6));
				mtb.setYoutubeUrls(rs.getString(7));
				mtb.setAudioUrls(rs.getString(8));
				mtb.setCommentUrl(rs.getString(9));
				mtb.setAbcUrl(rs.getString(10));
				mtb.setReleaseDate(rs.getTimestamp(11));
				mtb.setAccessCount(rs.getInt(12));
				mtb.setMyYoutubePlayUrls(rs.getString(13));

				list.add(mtb);
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
			log.info("Ending for getTrackRecords(String arg)");
		}
		return list;
	} 
	public void getJsonTracks(JSONObject root) throws DAOException
	{
		log.info("Calling for getJsonTracks()");
		
		//List<Object> list=new ArrayList<Object>(2);
		
		//JSONObject jsonObjKr = new JSONObject();
		//JSONObject jsonObjEn = new JSONObject();

		Connection c = null;
		Statement s=null;
		ResultSet rs=null;
		try
		{
			root.put("kr", MusicTracksBean.fillBasicTreeData(true));
			root.put("en", MusicTracksBean.fillBasicTreeData(false));
			
			c = _ds.getConnection();
			s = c.createStatement();
			rs = s.executeQuery("select music_artists.name, title, version, music_genres.name, midi_url, youtube_urls, audio_urls, comment_url, abc_url, release_date, access_count, my_youtube_play_urls  from music_tracks, music_artists, music_genres where music_tracks.artist_id=music_artists.id and music_tracks.genre_id=music_genres.id order by music_genres.name");

			while (rs.next())
			{
				log.info("singer: " + rs.getString(1));
				log.info("title: " + rs.getString(2));
				log.info("version: " + rs.getString(3));
				log.info("genre: " + rs.getString(4));
				log.info("midiUrl: " + rs.getString(5));
				log.info("youtubeUrls: " + rs.getString(6));
				log.info("audioUrls: " + rs.getString(7));
				log.info("commentUrl: " + rs.getString(8));
				log.info("abcUrl: " + rs.getString(9));
				log.info("releaseData: " + rs.getTimestamp(10));
				log.info("accessCount: " + rs.getString(11));
				log.info("myYoutubePlayUrls: " + rs.getString(12));
				
				for(int i=0; i<root.getJSONObject("kr").getJSONArray("children").length(); i++)
				{
					JSONObject jObj = root.getJSONObject("en").getJSONArray("children").getJSONObject(i);
					if(jObj.getString("name").equals(rs.getString(4).split(":")[1]))
					{
						//English
						JSONObject leafObj = new JSONObject();
						leafObj.put("singer", rs.getString(1).split(":")[1]);
						leafObj.put("title", rs.getString(2).split(":")[1]);
						leafObj.put("version", rs.getString(3));
						leafObj.put("genre", rs.getString(4).split(":")[1]);
						leafObj.put("midiUrl", rs.getString(5));
						leafObj.put("youtubeUrls", rs.getString(6));
						leafObj.put("audioUrls", rs.getString(7));
						leafObj.put("commentUrl", rs.getString(8));
						leafObj.put("abcUrl", rs.getString(9));
						leafObj.put("releaseDate", rs.getTimestamp(10));
						leafObj.put("accessCount", rs.getString(11));
						leafObj.put("myYoutubePlayUrls", rs.getString(12));
						
						//leafObj.put("name", rs.getString(2).split(":")[1] + " (" + rs.getString(3) +")" + ", " + rs.getString(1).split(":")[1]);
						//Change to a singer name, song title (version)
						leafObj.put("name", rs.getString(1).split(":")[1] + ", " + rs.getString(2).split(":")[1] + " (" + rs.getString(3) +")");
						
						jObj.getJSONArray("children").put(leafObj);
						
						//Korean
						jObj = root.getJSONObject("kr").getJSONArray("children").getJSONObject(i);
						
						leafObj = new JSONObject();
						leafObj.put("singer", rs.getString(1).split(":")[0]);
						leafObj.put("title", rs.getString(2).split(":")[0]);
						leafObj.put("version", rs.getString(3));
						leafObj.put("genre", rs.getString(4).split(":")[0]);
						leafObj.put("midiUrl", rs.getString(5));
						leafObj.put("youtubeUrls", rs.getString(6));
						leafObj.put("audioUrls", rs.getString(7));
						leafObj.put("commentUrl", rs.getString(8));
						leafObj.put("abcUrl", rs.getString(9));
						leafObj.put("releaseDate", rs.getTimestamp(10));
						leafObj.put("accessCount", rs.getString(11));
						leafObj.put("myYoutubePlayUrls", rs.getString(12));
						
						//leafObj.put("name", rs.getString(2).split(":")[0] + " (" + rs.getString(3) +")" + ", " + rs.getString(1).split(":")[0]);
						//Change to a singer name, song title (version)
						leafObj.put("name", rs.getString(1).split(":")[0] + ", " + rs.getString(2).split(":")[0] + " (" + rs.getString(3) +")");
						
						jObj.getJSONArray("children").put(leafObj);
						
						break;
					}//if statement
				}//for loop
			}//while loop
			
			int totalSongs = 0;
			for(int i=0; i<root.getJSONObject("kr").getJSONArray("children").length(); i++)
			{
				JSONObject jObj = root.getJSONObject("kr").getJSONArray("children").getJSONObject(i);
				totalSongs += jObj.getJSONArray("children").length();
				String genreName = jObj.getString("name") + " (" + jObj.getJSONArray("children").length() + ")";
				System.out.println("kr name and length: " + genreName);
				jObj.put("name", genreName);
				
				jObj = root.getJSONObject("en").getJSONArray("children").getJSONObject(i);
				genreName = jObj.getString("name") + " (" + jObj.getJSONArray("children").length() + ")";
				System.out.println("en name and length: " + genreName);
				jObj.put("name", genreName);
			}
		
			root.getJSONObject("kr").put("name", root.getJSONObject("kr").getString("name") + " (" + totalSongs + ")");
			root.getJSONObject("en").put("name", root.getJSONObject("en").getString("name") + " (" + totalSongs + ")");
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
			log.info("Ending for getJsonTracks()");
		}
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
			if(con!=null) con.close();
			con=null;
		}
		catch (Exception e)
		{
			log.severe(e.getMessage());
		}
	}
	
}
