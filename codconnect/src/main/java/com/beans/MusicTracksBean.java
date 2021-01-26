package com.beans;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonValue;

import org.json.JSONArray;
import org.json.JSONObject;

import com.enums.MusicClass;

public class MusicTracksBean implements Serializable
{

	private static final long serialVersionUID = 1L;

	private int id = -1;
	private int artistId = -1;
	private String title = "";
	private String version = "";  //A, B, C, ...
	private int genreId = -1;
	private String midiUrl = "";
	private String youtubeUrls = "";
	private String audioUrls = "";
	private String commentUrl = "";
	private String abcUrl = "";
	private Timestamp releaseDate = null;
	private int accessCount = 0;
	private String myYoutubePlayUrls = "";
	
	public String getYoutubeUrls()
	{
		return youtubeUrls;
	}
	public void setYoutubeUrls(String youtubeUrls)
	{
		this.youtubeUrls = youtubeUrls;
	}
	public String getAudioUrls()
	{
		return audioUrls;
	}
	public void setAudioUrls(String audioUrls)
	{
		this.audioUrls = audioUrls;
	}
	public String getAbcUrl()
	{
		return abcUrl;
	}
	public void setAbcUrl(String abcUrl)
	{
		this.abcUrl = abcUrl;
	}
	public String getMyYoutubePlayUrls()
	{
		return myYoutubePlayUrls;
	}
	public void setMyYoutubePlayUrls(String myYoutubePlayUrls)
	{
		this.myYoutubePlayUrls = myYoutubePlayUrls;
	}
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public int getArtistId()
	{
		return artistId;
	}
	public void setArtistId(int artistId)
	{
		this.artistId = artistId;
	}
	public String getTitle()
	{
		return title;
	}
	public void setTitle(String title)
	{
		this.title = title;
	}
	public String getVersion()
	{
		return version;
	}
	public void setVersion(String version)
	{
		this.version = version;
	}
	public int getGenreId()
	{
		return genreId;
	}
	public void setGenreId(int genreId)
	{
		this.genreId = genreId;
	}
	public String getMidiUrl()
	{
		return midiUrl;
	}
	public void setMidiUrl(String midiUrl)
	{
		this.midiUrl = midiUrl;
	}

	public Timestamp getReleaseDate()
	{
		return releaseDate;
	}
	public void setReleaseDate(Timestamp releaseDate)
	{
		this.releaseDate = releaseDate;
	}
	public int getAccessCount()
	{
		return accessCount;
	}
	public void setAccessCount(int accessCount)
	{
		this.accessCount = accessCount;
	}

	public String getCommentUrl()
	{
		return commentUrl;
	}
	public void setCommentUrl(String commentUrl)
	{
		this.commentUrl = commentUrl;
	}
	
	@Override
	public String toString()
	{
		return "MusicTracksBean [id=" + id + ", artistId=" + artistId + ", title=" + title + ", version=" + version
				+ ", genreId=" + genreId + ", midiUrl=" + midiUrl + ", youtubeUrls=" + youtubeUrls + ", audioUrls="
				+ audioUrls + ", commentUrl=" + commentUrl + ", abcUrl=" + abcUrl + ", releaseDate=" + releaseDate
				+ ", accessCount=" + accessCount + ", myYoutubePlayUrls=" + myYoutubePlayUrls + "]";
	}
	
	public static JSONObject fillBasicTreeData(boolean isKorean)
	{
		JSONObject rootJsonObj = new JSONObject();
		int langIndex = isKorean ? 0: 1;
		rootJsonObj.put("toggled", true);
		rootJsonObj.put("name", MusicClass.ROOTNAME.toString().split(":")[langIndex]);
		
		JSONArray jsonArray = new JSONArray();	
		rootJsonObj.put("children", jsonArray);
		
		for(MusicClass mc : MusicClass.values())
		{
			if(mc != MusicClass.ROOTNAME)
			{
				JSONObject jObj = new JSONObject();
				jObj.put("name", mc.toString().split(":")[langIndex]);
				if(mc == MusicClass.KPOP) jObj.put("toggled", true);
				else jObj.put("toggled", false);
				jObj.put("children", new JSONArray());
				
				jsonArray.put(jObj);
			}
		}
		
		/*
		JSONObject kPopObj = new JSONObject();
		kPopObj.put("name", MusicClass.KPOP.toString().split(":")[langIndex]);
		kPopObj.put("toggled", true);
		kPopObj.put("children", new JSONArray());
		
		JSONObject filmThemeObj = new JSONObject();
		filmThemeObj.put("name", MusicClass.FILMTHEME.toString().split(":")[langIndex]);
		filmThemeObj.put("toggled", false);
		filmThemeObj.put("children", new JSONArray());
		
		JSONObject gospelObj = new JSONObject();
		filmThemeObj.put("name", MusicClass.GOSPEL.toString().split(":")[langIndex]);
		filmThemeObj.put("toggled", false);
		filmThemeObj.put("children", new JSONArray());
		
		JSONObject enPopObj = new JSONObject();
		filmThemeObj.put("name", MusicClass.ENPOP.toString().split(":")[langIndex]);
		filmThemeObj.put("toggled", false);
		filmThemeObj.put("children", new JSONArray());
		
		JSONObject chasonObj = new JSONObject();
		filmThemeObj.put("name", MusicClass.CHASON.toString().split(":")[langIndex]);
		filmThemeObj.put("toggled", false);
		filmThemeObj.put("children", new JSONArray());
		
		JSONObject classicObj = new JSONObject();
		filmThemeObj.put("name", MusicClass.CLASSIC.toString().split(":")[langIndex]);
		filmThemeObj.put("toggled", false);
		filmThemeObj.put("children", new JSONArray());
		
		JSONObject kidsObj = new JSONObject();
		filmThemeObj.put("name", MusicClass.KIDS.toString().split(":")[langIndex]);
		filmThemeObj.put("toggled", false);
		filmThemeObj.put("children", new JSONArray());
		
		JSONObject miscObj = new JSONObject();
		filmThemeObj.put("name", MusicClass.MISC.toString().split(":")[langIndex]);
		filmThemeObj.put("toggled", false);
		filmThemeObj.put("children", new JSONArray());
		
		jsonArray.put(kPopObj);
		jsonArray.put(filmThemeObj);
		jsonArray.put(gospelObj);
		jsonArray.put(enPopObj);
		jsonArray.put(chasonObj);
		jsonArray.put(classicObj);
		jsonArray.put(kidsObj);
		jsonArray.put(miscObj);
		*/
		return rootJsonObj;
	}
}
