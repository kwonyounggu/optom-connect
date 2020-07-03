package com.test;

import org.json.JSONArray;
import org.json.JSONObject;

import com.ohip.mri.beans.HEBBean;
import com.ohip.mri.beans.HEHBean;
import com.ohip.mri.beans.HETBean;

public class MRITest
{
	public MRITest()
	{
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) throws Exception
	{
		
		String temp = "$25.02";
		System.out.println("temp: "+String.format("%s", temp.replaceAll("(\\$|\\.)", ""))); 
		// TODO Auto-generated method stub
       //HEBBean bean = new HEBBean(1, "123456");
       //bean.setReservedForMOH();
      // System.out.println("reseredLength: " + bean.getReservedForMOH().length());
       //System.out.println("resered: [" + bean.getReservedForMOH() + "]");
       //bean.printIt();
       
       //JSONArray claimList = new JSONArray("[{\"ohipNumber\":\"1111 - 111 - 111 - __\",\"patientDob\":\"2020-06-05\",\"serviceCode1\":\"V402A\",\"serviceCode2\":\"V406A\",\"numberOfServices2\":\"1\",\"diagnosticCode1\":\"378\",\"accountingNumber\":\"11111111\",\"numberOfServices1\":\"1\",\"serviceDate2\":\"2020-06-17\",\"serviceDate1\":\"2020-06-01\",\"diagnosticCode2\":\"371\"},{\"ohipNumber\":\"2222 - 222 - 222 - A_\",\"patientDob\":\"2020-06-06\",\"serviceCode1\":\"V404A\",\"diagnosticCode1\":\"377\",\"accountingNumber\":\"22222222\",\"numberOfServices1\":\"1\",\"serviceDate1\":\"2020-06-02\"},{\"ohipNumber\":\"3333 - 333 - 333 - AA\",\"patientDob\":\"2020-06-07\",\"serviceCode1\":\"V406A\",\"diagnosticCode1\":\"375\",\"numberOfServices1\":\"1\",\"serviceDate1\":\"2020-06-03\"}]");
       JSONArray claimList = new JSONArray("[{\"ohipNumber\":\"1111 - 111 - 111 - AB\",\"patientDob\":\"2020-07-01\",\"serviceCode1\":\"V402A\",\"feeSubmitted1\":\"$25.15\",\"diagnosticCode1\":\"378\",\"numberOfServices1\":\"1\",\"serviceDate1\":\"2020-07-08\"},{\"ohipNumber\":\"2222 - 222 - 222 - _A\",\"patientDob\":\"2020-07-02\",\"feeSubmitted2\":\"$42.50\",\"serviceCode1\":\"V406A\",\"feeSubmitted1\":\"$47.00\",\"serviceCode2\":\"V404A\",\"numberOfServices2\":\"1\",\"diagnosticCode1\":\"378\",\"numberOfServices1\":\"1\",\"serviceDate2\":\"2020-07-23\",\"serviceDate1\":\"2020-07-09\",\"diagnosticCode2\":\"375\"},{\"ohipNumber\":\"3333 - 333 - 333 - A_\",\"patientDob\":\"2020-07-03\",\"serviceCode1\":\"V404A\",\"feeSubmitted2\":\"$47.00\",\"feeSubmitted1\":\"$42.50\",\"serviceCode2\":\"V406A\",\"numberOfServices2\":\"1\",\"diagnosticCode1\":\"378\",\"numberOfServices1\":\"1\",\"serviceDate2\":\"2020-07-30\",\"serviceDate1\":\"2020-07-16\",\"diagnosticCode2\":\"366\"},{\"ohipNumber\":\"4444 - 444 - 444 - __\",\"patientDob\":\"2020-07-04\",\"serviceCode1\":\"V409A\",\"feeSubmitted1\":\"$43.80\",\"diagnosticCode1\":\"378\",\"numberOfServices1\":\"1\",\"serviceDate1\":\"2020-07-17\"}]");
       JSONObject claimData = new JSONObject();
       claimData.put("careProviderNumber", "123456");
       claimData.put("ohipClaimList", claimList);
       
       System.out.println(claimData.toString());
       
       HEBBean hebBean = new HEBBean(1, claimData.getString("careProviderNumber"));
       hebBean.printIt();
       System.out.println("[" + hebBean.toString().length() + "]:" + hebBean.toString());
       claimList = claimData.getJSONArray("ohipClaimList");
       
       //JSONArray claimListForRaw = new JSONArray();
       for (int i=0;i <claimList.length(); i++)
       {
    	   JSONObject jsonObj = claimList.getJSONObject(i);
    	   if (jsonObj.has("ohipNumber") && jsonObj.has("patientDob") && jsonObj.has("accountingNumber"))
    	   {
    		   HEHBean hehBean = new HEHBean(jsonObj.getString("ohipNumber"), jsonObj.getString("patientDob"), jsonObj.getString("accountingNumber"));
    		   //hehBean.printIt();
    		   System.out.println("[" + hehBean.toString().length() + "]:" + hehBean.toString());
    		   
    		   HETBean hetBean = new HETBean(jsonObj);
    		   hetBean.printIt();
    	   }
    	   else if (jsonObj.has("ohipNumber") && jsonObj.has("patientDob"))
    	   {
    		   HEHBean hehBean = new HEHBean(jsonObj.getString("ohipNumber"), jsonObj.getString("patientDob"));
    		   //hehBean.printIt();
    		   System.out.println("[" + hehBean.toString().length() + "]:" + hehBean.toString());
    		   
    		   HETBean hetBean = new HETBean(jsonObj);
    		   hetBean.printIt();
    	   }
       }

	}

}
