package com.test;

import org.json.JSONObject;

import com.beans.MusicTracksBean;
import com.enums.MusicClass;

public class MusicClassTest
{

	public static void main(String[] args)
	{
		// TODO Auto-generated method stub
		MusicClass[] classes = MusicClass.values();
		for(MusicClass cs: classes)
			System.out.println(cs);
		
		System.out.println(MusicClass.GOSPEL.toString().split(":")[1]);
		try
		{
			JSONObject root = new JSONObject();
			root.put("kr", MusicTracksBean.fillBasicTreeData(true));
			root.put("en", MusicTracksBean.fillBasicTreeData(false));
			
			//root.getJSONObject("kr").getJSONArray("children").getJSONObject(0)
			for(int i=0; i<root.getJSONObject("kr").getJSONArray("children").length(); i++)
			{	System.out.println("["+i+"]: " + root.getJSONObject("kr").getJSONArray("children").getJSONObject(i).getString("name"));
				for(Object key: root.getJSONObject("kr").getJSONArray("children").getJSONObject(i).keySet())
					System.out.println("key: "+key);
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

	}

}
