package com.test;

import com.ohip.mri.beans.HEBBean;

public class MRITest
{

	public MRITest()
	{
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args)
	{
		// TODO Auto-generated method stub
       HEBBean bean = new HEBBean();
       bean.setReservedForMOH();
       System.out.println("reseredLength: " + bean.getReservedForMOH().length());
       System.out.println("resered: [" + bean.getReservedForMOH() + "]");
	}

}
