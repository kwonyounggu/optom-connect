package com.beans;

import java.io.Serializable;

public class MusicGenresBean implements Serializable
{
	private static final long serialVersionUID = 1L;
	
	private int id = -1;
	private String name = ""; //Korean name:English name
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
	@Override
	public String toString()
	{
		return "MusicGenresBean [id=" + id + ", name=" + name + ", description=" + description + "]";
	}
}
