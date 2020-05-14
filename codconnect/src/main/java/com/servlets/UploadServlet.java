package com.servlets;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import java.util.Enumeration;
import java.util.logging.Logger;
/**
 * Servlet implementation class UploadServlet
 */
@WebServlet("/upload")
public class UploadServlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;

	private Logger log = Logger.getLogger(this.getClass().getName());
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadServlet()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		log.info("request.getMethod()" + request.getMethod());
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
		try
		{
			
		        
		        BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
				String line = reader.readLine();
				
				for (int i=0; line != null; i++)
				{
					log.info(line);
					line = reader.readLine();
				}
			
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			//close all if any exceptions
		}
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
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
