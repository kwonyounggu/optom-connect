<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>
<%@ page import = "java.io.*" %>
<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.stream.Collectors" %>
<%@ page import = "java.util.List" %>
<%@ page import = "java.util.Enumeration" %>
<%@ page import = "org.json.*" %>
<%@ page import = "com.utilities.*" %>
<%@ page import = "com.beans.AuthUserDetailsInternalBean" %>
<%@ page import = "com.ohip.mri.beans.*" %>
<%@ page import = "com.dao.AuthDao" %>
<%@ page import = "org.apache.commons.dbcp2.BasicDataSource" %>
<%@ page import = "javax.mail.Session" %>

<%
	response.setContentType("application/json");
	System.out.println("getClaimFile.jsp is called");
	
	
	System.out.println("getRealPath('/'): [" + request.getServletContext().getRealPath("/") +"]");
	System.out.println("System.getProperty('jboss.server.data.dir'): " + System.getProperty("jboss.server.data.dir"));
	
	File path = new File(System.getProperty("jboss.server.data.dir") + "/mri_claims");
	
	if(!path.exists()||!path.isDirectory()) System.out.println("path.mkdirs(): " + path.mkdirs());
	ClaimFileManagement cf = new ClaimFileManagement(DatasourceUtil.getDataSource());
	String fileName = cf.createFileName("123458");
	String filePath = path + "/" + fileName + ".json";
	System.out.println("fileName: " + filePath);
			
			
	try (FileWriter file = new FileWriter(filePath)) 
	{
		 
        //file.write(employeeList.toJSONString());
        file.flush();

    } 
	catch (IOException e) 
	{
        e.printStackTrace();
    }
	catch (Exception e) 
	{
        e.printStackTrace();
    }
		
	if(request.getMethod().equals("POST"))
	{
		
		String payloadString = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		JSONObject jsonObj = new JSONObject(payloadString);
		//AuthUserDetailsInternalBean ab = null;
		try
		{
			
			JsonUtils.printJsonObject(jsonObj);
			
	        String token = request.getHeader("Authorization");
			JSONObject decodedToken = null; 

			if (token != null && token.startsWith("Bearer ")) //Signed In
			{
				token = token.replace("Bearer ", "");
				
				TokenUtil tokenUtil = (TokenUtil)request.getServletContext().getAttribute("tokenUtil");
				decodedToken = tokenUtil.verifyToken(token);
				
				//Note you need to validate if the user is still in the database whose id is still valid/enabled
			}
			jsonObj.put("decodedToken", decodedToken);//remove later
			/*** WRITE INTO A DIRECTORY AND UPDATE OHIP_MRI_HISTORY TABLE ***/
			
			/*
			File path = new File(System.getProperty("jboss.server.data.dir") + "/mri_claims");
	
			if(!path.exists()||!path.isDirectory()) path.mkdirs();
			
			try (FileWriter file = new FileWriter("employees.json")) 
			{
				 
		        //file.write(employeeList.toJSONString());
		        //file.flush();
		
		    } 
			catch (IOException e) 
			{
		        e.printStackTrace();
		    }
			*/
			
			/************************************************************************/
			JSONArray claimListForRaw = new JSONArray();
			HEBBean hebBean = new HEBBean(1, jsonObj.getString("careProviderNumber"));
			claimListForRaw.put(hebBean.getRawLine());

			JSONArray claimList = jsonObj.getJSONArray("ohipClaimList");   
	        for (int i=0;i <claimList.length(); i++)
	        {
	    	   JSONObject jsonO = claimList.getJSONObject(i);
	    	   HEHBean hehBean = new HEHBean(jsonO); 
	    	   claimListForRaw.put(hehBean.getRawLine());
	    	   HETBean hetBean = new HETBean(jsonO);
	    	   claimListForRaw.put(hetBean.getRawLine());  
	        }
		    HEEBean heeBean = new HEEBean(claimList.length(), 0);
		    claimListForRaw.put(heeBean.getRawLine());
		       
			jsonObj.put("claimFileData", claimListForRaw);
			/************************************************************************/
		
			
	
			jsonObj.put("isItValid", true);
		}
		catch(Exception | Error e)
		{   
			e.printStackTrace();
			System.err.println("ERROR (getClaimFile.jsp): "+ e);
			jsonObj = new JSONObject();
			jsonObj.put("isItValid", false);
			jsonObj.put("errorMessage", e.getMessage().trim().isEmpty() ? 
					                      (e.getCause()+ "There is an unknown error. -- Try it later!") : e.getMessage());
		}
		finally
		{
			jsonObj.remove("careProviderNumber");
			jsonObj.remove("ohipClaimList");
			jsonObj.remove("decodedToken");
		}

		out.print(jsonObj);
		
	}
%>