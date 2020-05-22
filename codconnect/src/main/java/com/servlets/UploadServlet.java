package com.servlets;

import java.io.BufferedReader;

import java.io.IOException;

import javax.mail.internet.ContentDisposition;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.beans.FileInfoBean;
import com.utilities.JsonUtils;
import com.utilities.TokenUtil;
import io.jsonwebtoken.Claims;


import java.util.Enumeration;
import java.util.logging.Logger;
import java.util.stream.Collectors;

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
		}
	
		return decodedToken;
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		BufferedReader reader = null;
		JSONObject jsonObj = new JSONObject();
		try
		{
			
			    JSONObject decodedToken = validateHeaders(request);
		        //check fileName.ext, name, decoding errors while putting to db if logged in and db store checked through GUI

				reader = request.getReader();
				String line = reader.readLine();
				
				FileInfoBean fb = new FileInfoBean();
				//find file information in detail
				for (int i=0; line != null; i++)
				{
					if (line.startsWith("Content-Disposition:"))
					{						
						String[] dispInfo = extractDispositionInfo(line);
						fb.setName(dispInfo[1]);
						fb.setFileName(dispInfo[2].toUpperCase());
						log.info(fb.toString());
						break;
					}
					line = reader.readLine();
				}
			    
				//response.getWriter().print("SUCCESS: ");
				
				jsonObj.put("cvs", "cvs file type");
				jsonObj.put("isItValid", true);
		}
		catch (IOException e)
		{
			e.printStackTrace();
			//response.getWriter().print("ERROR: " + e.getMessage());
			jsonObj.put("isItValid", false);
			jsonObj.put("errorMessage", e.getMessage());
		}
		catch (Exception e)
		{
			e.printStackTrace();
			//response.getWriter().print("ERROR: " + e.getMessage());
			jsonObj.put("isItValid", false);
			jsonObj.put("errorMessage", e.getMessage());
		}
		finally
		{
			response.getWriter().print(jsonObj);
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