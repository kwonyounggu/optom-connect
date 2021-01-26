<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>

<%@ page import="java.util.*" %>
<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>


<% 
	/*
	//jsp to return json format with the following requirements
	//1. response.setContentType("application/json");
	//2. [{"id": "CARRIER:model1", "name": "model number 1"}]
	response.setContentType("application/json");
	
	DataSource ds=(DataSource)application.getAttribute("dataSource");
	HvacManualsDao hvacManualsDao=new HvacManualsDao(ds);
	Map<String, String> modelNumber=hvacManualsDao.getKeysValues_SS("select (brand_name || ':' || system_type || ':' || model_number) as id, model_number from hvac_manuals group by model_number, system_type, brand_name order by brand_name");
	
	System.out.println("len="+modelNumber.size());
	//Note: each property and value are expected double-quatationed
	Iterator<Map.Entry<String, String>> entries = modelNumber.entrySet().iterator();
	out.print("[");
	while(entries.hasNext())
	{
		Map.Entry<String, String> entry=entries.next();
		out.print("{	\"id\":     \""+entry.getKey()+"\", "); //brand
		out.print("  	\"name\":   \""+entry.getValue()+"\"");						
		out.print("}");
		if(entries.hasNext()) out.print(",");
	}
	out.print("]");
	*/
%>
[
   {"label":"item 1", "value":"item 1", "id": 1},
   {"label":"item 2", "value":"item 2", "id": 2},
   {"label":"item 3", "value":"item 1", "id": 3}
]