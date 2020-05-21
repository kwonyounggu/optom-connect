package com.servlets;

import java.io.BufferedReader;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

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
		        //request.getInputStream() to read a binary file.
				//reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
				reader = request.getReader();
				String line = reader.readLine();
				
				for (int i=0; line != null; i++)
				{
					log.info(i + ": " + line);
					line = reader.readLine();
					
					//Read
					//beginning if ------WebKitFormBoundaryBnSIoQliBBVG1Aoa
					//discard if space line
					//if starting HR1 .. HR8
					//discard if space line
					//ending if ------WebKitFormBoundaryBnSIoQliBBVG1Aoa--
					if (line.startsWith("---") || line.trim().isEmpty()) continue;
					if (line.startsWith("Content-Disposition:"))
					{
						//Content-Disposition: form-data; name="mroFile"; filename="PD801989.795"
					}
					else if (line.startsWith("Content-Type: "))
					{
						//Content-Type: application/octet-stream
					}
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

}
