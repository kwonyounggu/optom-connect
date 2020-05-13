package com.beans;

import java.io.Serializable;

public class MusicArtistsBean implements Serializable
{

	private static final long serialVersionUID = 1L;
	private int id = -1;
	private String name = ""; //Korean name:English name
	private String gender = ""; //M, F, N
	private String description = "";
	
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public String getName()
	{
		return name;
	}
	public void setName(String name)
	{
		this.name = name;
	}
	public String getDescription()
	{
		return description;
	}
	public void setDescription(String description)
	{
		this.description = description;
	}
	public String getGender()
	{
		return gender;
	}
	public void setGender(String gender)
	{
		this.gender = gender;
	}
	@Override
	public String toString()
	{
		return "MusicArtistsBean [id=" + id + ", name=" + name + ", gender=" + gender + ", description=" + description
				+ "]";
	}
}
