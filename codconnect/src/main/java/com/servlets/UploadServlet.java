package com.servlets;

import java.io.BufferedReader;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.dao.OHIPReportDao;
import com.ohip.payments.beans.*;
import com.utilities.DatasourceUtil;
import com.utilities.JsonUtils;
import com.utilities.TokenUtil;

import java.util.logging.Logger;


/**
 * Servlet implementation class UploadServlet
 */
@WebServlet("/upload")
public class UploadServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	private static final long MRO_MAX_FILE_SIZE = 1000000L;
	private Logger log = Logger.getLogger(this.getClass().getName());

	public UploadServlet()
	{
		super();
		// TODO Auto-generated constructor stub
	}
	private JSONObject validateHeaders(HttpServletRequest request) throws Exception
	{		
		//Supposed to request through POST not GET or other method
		if (!request.getMethod().equalsIgnoreCase("POST")) throw new Exception("Not expected method of request.");
		//The following check can be expanded with other files being uploaded from other known path
		else if (request.getHeader("Referer").lastIndexOf("/accounting/ohip/convert") < 0) throw new Exception("Not expected referer of request.");
		else if (Integer.parseInt(request.getHeader("Content-Length")) > MRO_MAX_FILE_SIZE) throw new Exception("Not expected over-sized file of request.");
		else if (request.getContentType().indexOf("multipart/form-data") < 0) throw new Exception("Not expected form-data file of request.");
		
		String token = request.getHeader("Authorization");
		JSONObject decodedToken = null; 

		if (token != null && token.startsWith("Bearer ")) //Signed In
		{
			token = token.replace("Bearer ", "");
			
			TokenUtil tokenUtil = (TokenUtil)request.getServletContext().getAttribute("tokenUtil");
			decodedToken = tokenUtil.verifyToken(token);
			
			//Note you need to validate if the user is still in the database whose id is still valid/enabled
		}
	
		return decodedToken;
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		BufferedReader reader = null;
		JSONObject returnJson = new JSONObject();
		try
		{
			
			    JSONObject decodedToken = validateHeaders(request);
		        //check fileName.ext, name, decoding errors while putting to db if logged in and db store checked through GUI

				reader = request.getReader();
				String line = reader.readLine();
				
				FileInfoBean fb = new FileInfoBean();
				//find file information in detail
				for (int i=0; line != null; i++)
				{log.info(line);
					if (line.startsWith("Content-Disposition:"))
					{						
						String[] dispInfo = extractDispositionInfo(line);
						fb.setName(dispInfo[1]);
						fb.setFileName(dispInfo[2].toUpperCase());
						log.info(fb.toString());
						
						returnJson.put("fileInfo", fb.getJson());
						
						if (Integer.parseInt(fb.getfNumber()) == 0)
							throw new Exception("Group/Provider number is not valid. -- Try again with the original!");
						
						break;
					}
					line = reader.readLine();
				}

				//if (fb.getfType() == 'P')
				switch (fb.getfType())
				{
					case 'P':  
					{
						returnJson.put("report", handleRemittanceAdviceFile(reader, fb, decodedToken)); 
						break;
					}
					case 'E':  
					case 'F':  
					{
						returnJson.put("claimError", handleClaimErrorFile(reader, fb, decodedToken)); 
						break;
						//throw new Exception("Error files are not ready to handle yet. -- Try it later!"); 
					}
					case 'X':  
					{
						throw new Exception("Rejection files are not ready to handle yet. -- Try it later!"); 
					}
					default: 
					{
						throw new Exception("The given file name is corrupted. -- Try it agin with the right one!");
					}
				}
				//response.getWriter().print("SUCCESS: ");
				
				returnJson.put("isItValid", true);
		}
		catch (Exception | Error e)
		{
			log.severe(e.getMessage());
			try
			{
				JsonUtils.removeAll(returnJson.getJSONObject("report")); //Not necessary
			}
			catch(Exception | Error jsonE)
			{
				log.severe(jsonE.getMessage());
			}
			returnJson.put("isItValid", false);
			returnJson.put("errorMessage", e.getMessage().trim().isEmpty() ? 
					                      (e.getCause()+ "There is an unknown error. -- Try it later!") : e.getMessage());
		}
		finally
		{
			response.getWriter().print(returnJson);
			response.getWriter().flush();
			response.getWriter().close();
			if (reader != null) reader.close();
		}
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	//**************************************************************************************************************************
	//* Check if there exists HR1, HR2, HR3, HR4, HR5, HR8 which should be included all the time.
	//**************************************************************************************************************************
	private JSONObject handleClaimErrorFile(BufferedReader reader, FileInfoBean fb, JSONObject decodedToken) throws IOException, Exception
	{
		
		JSONObject claminErrorJson = new JSONObject();
		claminErrorJson.put("hxh", new JSONArray());
		claminErrorJson.put("hxr", new JSONArray());
		claminErrorJson.put("hxt", new JSONArray());
		claminErrorJson.put("hx8", new JSONArray());
		/*
		JSONObject total = new JSONObject();
		total.put("numberOfServices", 0);
		total.put("amountSubmitted", 0.0);
		total.put("amountPaid", 0.0);
		
		OHIPReportDao reportDao = new OHIPReportDao(DatasourceUtil.getDataSource());
		*/
		String line = reader.readLine();
		for (int i=0; line != null; i++)
		{
			System.err.println("[LINE:" + i + " ], " + line);
			if (line.startsWith("HX1"))
			{
				CEHX1Bean bean = new CEHX1Bean(line);
				System.out.println(bean.toString());
				claminErrorJson.put("hx1", bean.getJson());
			}
			else if (line.startsWith("HXH"))
			{
				CEHXHBean bean = new CEHXHBean(line);
				System.out.println(bean.toString());
				claminErrorJson.getJSONArray("hxh").put(bean.getJson());
			}
			else if (line.startsWith("HXR"))
			{
				CEHXRBean bean = new CEHXRBean(line);
				System.out.println(bean.toString());
				claminErrorJson.getJSONArray("hxr").put(bean.getJson());
			}
			else if (line.startsWith("HXT"))
			{
				CEHXTBean bean = new CEHXTBean(line);
				System.out.println(bean.toString());
				claminErrorJson.getJSONArray("hxt").put(bean.getJson());
			}
			else if (line.startsWith("HX8"))
			{
				CEHX8Bean bean = new CEHX8Bean(line);
				System.out.println(bean.toString());
				claminErrorJson.getJSONArray("hx8").put(bean.getJson());
			}
			else if (line.startsWith("HX9"))
			{
				CEHX9Bean bean = new CEHX9Bean(line);
				System.out.println(bean.toString());
				claminErrorJson.put("hx9", bean.getJson());
			}
			/*
			if (line.startsWith("HR1"))
			{
				RVHR1Bean hrBean = new RVHR1Bean(line);
				//hrBean.printRecord();
				
				if (fb.getfNumber().length()==4 && !hrBean.getGroupNumber().equals(fb.getfNumber()))
					throw new Exception("Group number is not matching. -- Try again with the original!");
				else if (fb.getfNumber().length()==6 && hrBean.getHealthCareProvider() != fb.getfNumberInt())
					throw new Exception("Provider number is not matching. -- Try again with the original!");
				else if (hrBean.getSpeciality() != 56)
					throw new Exception("The remittance advice report is only for eye doctors (O.D)!");
				reportJson.put("hr1", hrBean.getJson());
			}
			else if (line.startsWith("HR2"))
			{
				RVHR2Bean hrBean = new RVHR2Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr2", hrBean.getJson());
			}
			else if (line.startsWith("HR3"))
			{
				RVHR3Bean hrBean = new RVHR3Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr3", hrBean.getJson());
			}
			else if (line.startsWith("HR4"))
			{
				RVHR4Bean hrBean = new RVHR4Bean(line);
				//hrBean.printRecord();
				reportJson.getJSONArray("hr4").put(hrBean.getJson());
			}
			else if (line.startsWith("HR5"))
			{
				RVHR5Bean hrBean = new RVHR5Bean(line);
				total.put("numberOfServices", total.getInt("numberOfServices") + hrBean.getNumberOfServices());
				total.put("amountSubmitted", total.getFloat("amountSubmitted") + hrBean.getAmountSubmitted());
				total.put("amountPaid", total.getFloat("amountPaid") + hrBean.getAmountPaid());
				//hrBean.printRecord();
				JSONObject hr5Json = hrBean.getJson();
				reportJson.getJSONArray("hr5").put(hr5Json);
				
				// This way more than one item with a claim header can be in the list
				// from such as HR4, HR5, HR5, HR5.
				JSONArray hr4Array = reportJson.getJSONArray("hr4");
				JSONObject hr4Json = (JSONObject)hr4Array.get(hr4Array.length() - 1);
			}
			else if (line.startsWith("HR6"))
			{
				RVHR6Bean hrBean = new RVHR6Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr6", hrBean.getJson());
			}
			else if (line.startsWith("HR7"))
			{
				RVHR7Bean hrBean = new RVHR7Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr7", hrBean.getJson());
			}
			else if (line.startsWith("HR8"))
			{
				RVHR8Bean hrBean = new RVHR8Bean(line);
				//hrBean.printRecord();
				reportJson.getJSONArray("hr8").put(hrBean.getJson());
			}
			else if (line.trim().isEmpty() || line.startsWith("Content") || line.startsWith("---")) {}
			else
			{
				throw new Exception("The file content is corrupted. -- Please try again with the original!");
			}*/
			line = reader.readLine();
		}
		
		try
		{
			//Check if the required records are existing minimally in the file.
			/*
			if (!(reportJson.has("hr1") && reportJson.has("hr2") && reportJson.has("hr3") && reportJson.has("hr8") &&
				!reportJson.getJSONArray("hr4").isEmpty() && !reportJson.getJSONArray("hr5").isEmpty()))
			{
				throw new Exception("The minimal records are not in the file. -- Try again with the original!");
			}
			*/
		}
		catch(JSONException e)
		{
			log.severe("ERROR: " + e.getMessage());
			throw new Exception(e.getMessage());
		}
		if (decodedToken != null)
		{
			//Check if the user allows data insertion in terms of auth_user_matrix_with_settings
			//Insert into db
			
			//reportDao.insertRAData(reportJson, fb, decodedToken);
		
		}

		return claminErrorJson;
	}

	//**************************************************************************************************************************
	//* Check if there exists HR1, HR2, HR3, HR4, HR5, HR8 which should be included all the time.
	//**************************************************************************************************************************
	private JSONObject handleRemittanceAdviceFile(BufferedReader reader, FileInfoBean fb, JSONObject decodedToken) throws IOException, Exception
	{
		JSONObject reportJson = new JSONObject();
		reportJson.put("hr4", new JSONArray());
		reportJson.put("hr5", new JSONArray());
		reportJson.put("hr8", new JSONArray());
		reportJson.put("hr45", new JSONArray()); //combine two of hr4 and hr5
		
		JSONObject total = new JSONObject();
		total.put("numberOfServices", 0);
		total.put("amountSubmitted", 0.0);
		total.put("amountPaid", 0.0);
		
		OHIPReportDao reportDao = new OHIPReportDao(DatasourceUtil.getDataSource());
		
		String line = reader.readLine();
		for (int i=0; line != null; i++)
		{
			if (line.startsWith("HR1"))
			{
				RVHR1Bean hrBean = new RVHR1Bean(line);
				//hrBean.printRecord();
				
				if (fb.getfNumber().length()==4 && !hrBean.getGroupNumber().equals(fb.getfNumber()))
					throw new Exception("Group number is not matching. -- Try again with the original!");
				else if (fb.getfNumber().length()==6 && hrBean.getHealthCareProvider() != fb.getfNumberInt())
					throw new Exception("Provider number is not matching. -- Try again with the original!");
				else if (hrBean.getSpeciality() != 56)
					throw new Exception("The remittance advice report is only for eye doctors (O.D)!");
				reportJson.put("hr1", hrBean.getJson());
			}
			else if (line.startsWith("HR2"))
			{
				RVHR2Bean hrBean = new RVHR2Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr2", hrBean.getJson());
			}
			else if (line.startsWith("HR3"))
			{
				RVHR3Bean hrBean = new RVHR3Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr3", hrBean.getJson());
			}
			else if (line.startsWith("HR4"))
			{
				RVHR4Bean hrBean = new RVHR4Bean(line);
				//hrBean.printRecord();
				reportJson.getJSONArray("hr4").put(hrBean.getJson());
			}
			else if (line.startsWith("HR5"))
			{
				RVHR5Bean hrBean = new RVHR5Bean(line);
				total.put("numberOfServices", total.getInt("numberOfServices") + hrBean.getNumberOfServices());
				total.put("amountSubmitted", total.getFloat("amountSubmitted") + hrBean.getAmountSubmitted());
				total.put("amountPaid", total.getFloat("amountPaid") + hrBean.getAmountPaid());
				//hrBean.printRecord();
				JSONObject hr5Json = hrBean.getJson();
				reportJson.getJSONArray("hr5").put(hr5Json);
				
				// ***** Make HR45 COMBINATION ARRAY ****
				// This way more than one item with a claim header can be in the list
				// from such as HR4, HR5, HR5, HR5.
				JSONArray hr4Array = reportJson.getJSONArray("hr4");
				JSONObject hr4Json = (JSONObject)hr4Array.get(hr4Array.length() - 1);
				
				if (hr4Json.getString("claimNumber").equals(hr5Json.getString("claimNumber")))
				{
					JSONObject hr45Bean = new JSONObject();
					
					hr45Bean.put("accountingNumber", hr4Json.getString("accountingNumber"));
					hr45Bean.put("claimNumber", hr4Json.getString("claimNumber"));
					hr45Bean.put("transactionType", hr4Json.getInt("transactionType"));
					hr45Bean.put("healthcareProvider", hr4Json.getInt("healthcareProvider"));
					hr45Bean.put("speciality", hr4Json.getInt("speciality"));
					hr45Bean.put("provinceCode", hr4Json.getString("provinceCode"));
					hr45Bean.put("healthRegistrationNumber", hr4Json.getString("healthRegistrationNumber"));
					hr45Bean.put("versionCode", hr4Json.getString("versionCode"));
					hr45Bean.put("paymentProgram", hr4Json.getString("paymentProgram"));
					
					hr45Bean.put("serviceDate", hr5Json.getString("serviceDate"));
					hr45Bean.put("numberOfServices", hr5Json.getInt("numberOfServices"));
					hr45Bean.put("serviceCode", hr5Json.getString("serviceCode"));
					hr45Bean.put("amountSubmitted", hr5Json.getFloat("amountSubmitted"));
					hr45Bean.put("amountPaid", hr5Json.getFloat("amountPaid"));
					hr45Bean.put("explanatoryCode", hr5Json.getString("explanatoryCode"));
					
					if (hr5Json.getString("explanatoryCode").length() == 2)
					{
						Object codeDesc = reportDao.queryObject("select code_description from ohip_mro_remittance_advice_explantory_codes_v68 where codes='" + hr5Json.getString("explanatoryCode") +"'" );
						if (codeDesc == null)
							hr45Bean.put("explanatoryCodeDesc", "Unknown");
						else
							hr45Bean.put("explanatoryCodeDesc", (String)codeDesc);
					}
					
					reportJson.getJSONArray("hr45").put(hr45Bean);
				}
			}
			else if (line.startsWith("HR6"))
			{
				RVHR6Bean hrBean = new RVHR6Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr6", hrBean.getJson());
			}
			else if (line.startsWith("HR7"))
			{
				RVHR7Bean hrBean = new RVHR7Bean(line);
				//hrBean.printRecord();
				reportJson.put("hr7", hrBean.getJson());
			}
			else if (line.startsWith("HR8"))
			{
				RVHR8Bean hrBean = new RVHR8Bean(line);
				//hrBean.printRecord();
				reportJson.getJSONArray("hr8").put(hrBean.getJson());
			}
			else if (line.trim().isEmpty() || line.startsWith("Content") || line.startsWith("---")) {}
			else
			{
				throw new Exception("The file content is corrupted. -- Please try again with the original!");
			}
			line = reader.readLine();
		}
		
		try
		{
			//Check if the required records are existing minimally in the file.
			if (!(reportJson.has("hr1") && reportJson.has("hr2") && reportJson.has("hr3") && reportJson.has("hr8") &&
				!reportJson.getJSONArray("hr4").isEmpty() && !reportJson.getJSONArray("hr5").isEmpty()))
			{
				throw new Exception("The minimal records are not in the file. -- Try again with the original!");
			}
		}
		catch(JSONException e)
		{
			log.severe("ERROR: " + e.getMessage());
			throw new Exception(e.getMessage());
		}
		if (decodedToken != null)
		{
			//Check if the user allows data insertion in terms of auth_user_matrix_with_settings
			//Insert into db
			//OHIPReportDao reportDao = new OHIPReportDao(DatasourceUtil.getDataSource());
			reportDao.insertRAData(reportJson, fb, decodedToken);
		
		}
		
		reportJson.put("total", total);
		return reportJson;
	}
    //docstore.mik.ua/orelly/java-ent/servlet/ch04_04.htm
	private String[] extractDispositionInfo(String line) throws IOException 
	{ 
		// Return the line's data as an array: disposition, name, filename 
		String[] retval = new String[3]; 
		
		// Convert the line to a lowercase string without the ending \r\n 
		// Keep the original line for error messages and for variable names. 
		String origline = line; line = origline.toLowerCase(); 
		
		// Get the content disposition, should be "form-data" 
		int start = line.indexOf("content-disposition: "); 
		int end = line.indexOf(";"); 
		if (start == -1 || end == -1) 
		{ 
			throw new IOException("Content disposition corrupt: " + origline); 
		} 
		
		String disposition = line.substring(start + 21, end); 
		if (!disposition.equals("form-data")) 
		{ 
			throw new IOException("Invalid content disposition: " + disposition); 
		} 
		
		// Get the field name 
		start = line.indexOf("name=\"", end); // start at last semicolon 
		end = line.indexOf("\"", start + 7); // skip name=\" 
		if (start == -1 || end == -1) 
		{ 
			throw new IOException("Content disposition corrupt: " + origline); 
		} 
		String name = origline.substring(start + 6, end); 
		
		// Get the filename, if given 
		String filename = null; 
		start = line.indexOf("filename=\"", end + 2); // start after name 
		end = line.indexOf("\"", start + 10); // skip filename=\" 
		if (start != -1 && end != -1) 
		{ // note the != 
			filename = origline.substring(start + 10, end); 
			// The filename may contain a full path. Cut to just the filename. 
			int slash = Math.max(filename.lastIndexOf('/'), filename.lastIndexOf('\\')); 
			if (slash > -1) 
			{ 
				filename = filename.substring(slash + 1); // past last slash 
			} 
			if (filename.equals("")) filename = "unknown"; // sanity check 
		} 
		
		// Return a String array: disposition, name, filename 
		
		retval[0] = disposition; 
		retval[1] = name; 
		retval[2] = filename; 
		
		return retval;	
	}
}

/**********************************************************************************
 * 		        //request.getInputStream() to read a binary file.
				//reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
 */

/***********************************************************************************
 * Parsing the Content-Disposition in the following simple way is successful.
 *      //Content-Disposition: form-data; name="mroFile"; filename="PD801989.795"
		String[] disposition = line.split("; ");
		String name = disposition[1].split("=")[1];
		String fileName = disposition[2].split("=")[1];
		
		log.info("name: "+name+", fileName: "+fileName);
 ***********************************************************************************/

/**** Checking headers and parameters of request ********************************************
Enumeration<String> headerNames = request.getHeaderNames();
while(headerNames.hasMoreElements()) 
{
  String headerName = headerNames.nextElement();
  log.info("Header Name - " + headerName + ", Value - " + request.getHeader(headerName));
}

Enumeration<String> params = request.getParameterNames(); 
while(params.hasMoreElements())
{
 String paramName = params.nextElement();
 log.info("Parameter Name - "+paramName+", Value - "+request.getParameter(paramName));
}
*********************************************************************************************/
/***
  					else if (line.startsWith("HR1"))
					{
						
					}
					else if (line.startsWith("HR2"))
					{
						
					}
					else if (line.startsWith("HR3"))
					{
						
					}
					else if (line.startsWith("HR4"))
					{
						
					}
					else if (line.startsWith("HR5"))
					{
						
					}
					else if (line.startsWith("HR6"))
					{
						
					}
					else if (line.startsWith("HR7"))
					{
						
					}
					else if (line.startsWith("HR8"))
					{
						
					}
					else log.info("Discard line: "+i);
*********/