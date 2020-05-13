package com.utilities;

import java.security.Security;
import java.util.*;
import java.util.logging.Logger;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;

import com.beans.AuthUserDetailsInternalBean;
import com.dao.AuthDao;


public class Email extends Authenticator implements Runnable
{
	  private Logger log = Logger.getLogger(this.getClass().getName());
		
	  /*
	   * The following two static variables are assigned in MainContextListener.java by the data 
	   * retrieved from auth_user_details_internal table with id=2
	   */
	  public static String smtpAccessEmail="";
	  public static String smtpAccessPwd="";
	
      private String fromAddr;
      private List<String> toAddr;
      private List<String> name;
      private String subject;
      private String message;
      protected PasswordAuthentication authentication;
      private String _fileName="";
      private AuthUserDetailsInternalBean ab = null;
         
      /*
       * Instantiate the following constructor if you want to use 'Signup Confirmation'
       */
      public Email(List<String> to, List<String> name, String subject, String message, AuthUserDetailsInternalBean ab) 
      {
    	  	this.fromAddr = smtpAccessEmail;
	        this.toAddr = to;
	        this.name = name;
	        this.subject = subject;
	        this.message = message;
	        this.ab = ab;
	        	        
	        Thread t = new Thread(this);
	  		t.start();
      }
      /*
       * Instantiate the following constructor if you have multiple senders and a file attachment.
       */
      public Email(String from, List<String> to, List<String> name,  String subject, String message, String fileName) 
      {
    	  	this.fromAddr = from;
	        this.toAddr = to;
	        this.name = name;
	        this.subject = subject;
	        this.message = message;
	        this._fileName=fileName;
	        	        
	        Thread t = new Thread(this);
	  		t.start();
      }

      /*
       * Note that the following email properties are set to use google stmp access. 
       * If you want to use other server with a port 25, change accordingly.
       * Reference sendMail() in the old source code.
       */
      public void googleSSLSMTP()
      {
    	  try
    	  {
    		  log.info("Entry point before sending email");
	    	  
	    	  Properties props = new Properties();  
	    	  props.setProperty("mail.transport.protocol", "smtp");  
	    	     
	    	  props.setProperty("mail.host", "smtp.gmail.com");  
	    	  props.put("mail.smtp.auth", "true");  
	    	  props.put("mail.smtp.port", "465"); 
	    	  props.put("mail.debug", "true");  
	    	  props.put("mail.smtp.socketFactory.port", "465");  
	    	  props.put("mail.smtp.socketFactory.class",  "javax.net.ssl.SSLSocketFactory");  
	    	  props.put("mail.smtp.socketFactory.fallback", "false");
	    	    
	    	  /*
	    	   * Dec-6-2017
	    	   * Changed with a message, java.lang.SecurityException: Access to default session denied, by stackoverflow recommendation
	    	   */
	    	  Session session = Session.getInstance(props,  
		    	  new javax.mail.Authenticator() 
		    	  {  
		    		  protected PasswordAuthentication getPasswordAuthentication() 
			    	  {  
			    		  return new PasswordAuthentication(smtpAccessEmail, smtpAccessPwd);  //this will be return address for delivery failure
			    	  }  
		    	  }
		    	  );  
	    	     
	    	  session.setDebug(Utils.DEBUG_MODE);  
	    	     	    	    
	    	  Transport transport = session.getTransport();  
	    	  
	    	  Address addressFrom = new InternetAddress(fromAddr,"WEBMONSTER-ADMIN","UTF-8");
	    	     
	    	  MimeMessage mimeMsg = new MimeMessage(session);    
	    	  mimeMsg.setFrom(addressFrom);
	    	  
	    	  Address[] to = new InternetAddress[toAddr.size()];
	          for(int i = 0; i < toAddr.size(); i++) to[i] = new InternetAddress((String) toAddr.get(i),name.get(i)+"","UTF-8");
	          mimeMsg.addRecipients(Message.RecipientType.TO, to);//OK  
	          
	          //The following two lines for information to csr administrator every time with every kind of email: added April 18 2013
	          Address[] bcc = {new InternetAddress(smtpAccessEmail, "WEBMONSTER-ADMIN BCC","UTF-8")};
        	  mimeMsg.addRecipients(Message.RecipientType.BCC, bcc);
	          
	          
	          /*********** A Multipart Body BEGIN ************/
	          BodyPart bodyPart1=new MimeBodyPart();
	          bodyPart1.setContent(message, "text/html;charset=utf-8");
	          
	          BodyPart bodyPart2=null;
	          
	          if(_fileName.length()>0)
	          {
	        	  bodyPart2=new MimeBodyPart();
	        	  bodyPart2.setDataHandler(new DataHandler(new FileDataSource(_fileName)));
	        	  bodyPart2.setFileName(_fileName.substring(_fileName.lastIndexOf("/")+1));
	          }
	          
	          Multipart multipart=new MimeMultipart();
	          multipart.addBodyPart(bodyPart1);
	          if(bodyPart2!=null) multipart.addBodyPart(bodyPart2);
	          /*********** A Multipart Body END ************/
	          
	          mimeMsg.setSubject(subject,"UTF-8");
	          mimeMsg.setContent(multipart);

	    	  transport.connect();  
	    	  Transport.send(mimeMsg);  
	    	  transport.close();  
	    	  log.info("EMail from "+fromAddr+" to "+toAddr+" was sent successfully.");

 	     }
 	     catch (Exception e) 
 	     {
 	    	 log.severe("Unable to email to "+toAddr+" in googleSSLSMTP() of Email.java");
 	    	 if(ab != null && ab.getId() > 0)
 	    	 {
 	    		 //Delete records if not successful in email of Signup Confirmation
 	    		 new AuthDao(DatasourceUtil.getDataSource()).deleteRecords(ab);
 	    	 }
        	 throw new RuntimeException(e);
 	     }
      }
      @Override
      public void run()
	  {
		  try
		  {	  
			  googleSSLSMTP();
			  
		  }
		  catch(Exception e)
		  {
			  log.severe("emailing to "+toAddr+" has been failed for subject:"+subject+".\nCause:"+e.getMessage());
		  }
		  
	  }
      public PasswordAuthentication getPasswordAuthentication()
	  {		
    	  return authentication;
	  }
}
