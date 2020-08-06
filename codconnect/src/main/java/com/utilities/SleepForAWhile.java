package com.utilities;

public class SleepForAWhile
{

	public SleepForAWhile()
	{
		for(int i=0;i<5;i++)
		{  
		    try{Thread.sleep(500);}catch(InterruptedException e){System.out.println(e);}  
		    System.out.println("[SLEEP]: " + i);  
		} 
	}

	public static void main(String[] args)
	{
		SleepForAWhile sleep = new SleepForAWhile();
	}

}
