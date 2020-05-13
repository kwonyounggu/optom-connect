package org.openshift.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* INFO
 * see in detail about @WebServlet annotation, www.codejava.net/java-ee/servlet/webservlet-annotation-examples
 * @WebServlet(
 * 				urlPatterns={"/os_api/blogpost"}
 * 				name="ServletName"
 * 				initParams={@WebInitParam(name="name", value="value"}
 * 			  )
 */
@WebServlet("/os_api/blogpost")
public class BlogPost extends HttpServlet 
{
	private static final long serialVersionUID = 1L;
	private Logger log = Logger.getLogger(this.getClass().getName());
	
    public BlogPost() 
    {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		log.info("doGet() is called in BlogPost.java");

		
		/*Jan 08-2017: four lines commented in just for checking anychange
		request.setCharacterEncoding("UTF-8");//put this otherwise UNI-Code characters will be broken.		
		response.setContentType("text/html; charset=UTF-8");
		response.setHeader("Cache-Control","no-store,no-cache, must-revalidate, post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		*/
		
		try
		{	
			request.setCharacterEncoding("UTF-8");//put this otherwise UNI-Code characters will be broken.		
			response.setContentType("application/json; charset=UTF-8");
			
			PrintWriter out = response.getWriter();
			HashMap<String, String> theInsult = new HashMap<String, String>();
			theInsult.put("insult", "hello");
			
			out.print(theInsult);
		}
		catch(Exception e)
		{
			
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}
	
	public void forwardWarningPage(HttpServletRequest request,HttpServletResponse response,String msg)throws ServletException, IOException
	{
		
	}
	public void forwardErrorPage(HttpServletRequest request,HttpServletResponse response,String msg)throws ServletException, IOException
	{
	}

}

