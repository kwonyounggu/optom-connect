package com.utilities;

import java.util.*;
import java.util.logging.Logger;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;

import com.beans.AuthUserDetailsInternalBean;
import com.exceptions.EmailException;

public class AsynchroEmail extends Authenticator implements Runnable
{
	  private Logger log = Logger.getLogger(this.getClass().getName());
		
      private String fromEmail = "";
      private String fromName = "";
      private List<String> toEmail = null;
      private List<String> toName = null;
      private String subject = "";
      private String message = "";

      private String fileName = "";
      private AuthUserDetailsInternalBean ab = null;
         

      public AsynchroEmail(String fromEmail, String fromName, List<String> toEmail, List<String> toName, String subject, String message, AuthUserDetailsInternalBean ab) throws EmailException
      {
    	  	this.fromEmail = fromEmail;
    	  	this.fromName = fromName;
	        this.toEmail = toEmail;
	        this.toName = toName;
	        this.subject = subject;
	        this.message = message;
	        this.ab = ab;
	        	        
	        Thread t = new Thread(this);
	  		t.start();
      }
      public AsynchroEmail(String fromEmail, String fromName, List<String> toEmail, List<String> toName, String subject, String message, AuthUserDetailsInternalBean ab, String fileName) throws EmailException
      {
    	    this.fromEmail = fromEmail;
    	    this.fromName = fromName;
	        this.toEmail = toEmail;
	        this.toName = toName;
	        this.subject = subject;
	        this.message = message;
	        this.ab = ab;
	        this.fileName = fileName;
	        	        
	        Thread t = new Thread(this);
	  		t.start();
      }

      /*
       * Note that the following email properties are set to use google stmp access. 
       * If you want to use other server with a port 25, change accordingly.
       * Reference sendMail() in the old source code.
       */
      public void yahooSMTP()
      {
    	  try
    	  {
	          // sets SMTP server properties
	          Properties properties = new Properties();
	          properties.put("mail.smtp.host", Utils.SMTP_HOST);
	          properties.put("mail.smtp.port", "587");
	          properties.put("mail.smtp.auth", "true");
	          properties.put("mail.smtp.starttls.enable", "true");
	   
	          // creates a new session with an authenticator
	          Authenticator auth = new Authenticator() 
	          {
	              public PasswordAuthentication getPasswordAuthentication() 
	              {
	                  return new PasswordAuthentication(Utils.SMPT_USERNAME, Utils.SMPT_PASSCODE);
	              }
	          };
	   
	          Session session = Session.getInstance(properties, auth);
	   
	          session.setDebug(Utils.DEBUG_MODE); 
	          // creates a new e-mail message
	          Transport transport = session.getTransport();  
	    	  
	    	  Address addressFrom = new InternetAddress(fromEmail,fromName,"UTF-8");
	    	     
	    	  MimeMessage mimeMsg = new MimeMessage(session);    
	    	  mimeMsg.setFrom(addressFrom);
	    	  
	    	  Address[] to = new InternetAddress[toEmail.size()];
	          for(int i = 0; i < toEmail.size(); i++) to[i] = new InternetAddress((String) toEmail.get(i), toName.get(i), "UTF-8");
	          mimeMsg.addRecipients(Message.RecipientType.TO, to);//OK  
	          
	          //The following two lines for information to optom.connect administrator every time with every kind of email
	          //Address[] bcc = {new InternetAddress(Utils.SMPT_SENDER, "optom.connect-ADMIN BCC","UTF-8")};
        	  //mimeMsg.addRecipients(Message.RecipientType.BCC, bcc);
	          
	          
	          /*********** A Multipart Body BEGIN ************/
	          BodyPart bodyPart1 = new MimeBodyPart();
	          bodyPart1.setContent(message, "text/html;charset=utf-8");
	          
	          BodyPart bodyPart2 = null;
	          
	          if(fileName.length() > 0)
	          {
	        	  bodyPart2 = new MimeBodyPart();
	        	  bodyPart2.setDataHandler(new DataHandler(new FileDataSource(fileName)));
	        	  bodyPart2.setFileName(fileName.substring(fileName.lastIndexOf("/")+1));
	          }
	          
	          Multipart multipart = new MimeMultipart();
	          multipart.addBodyPart(bodyPart1);
	          if(bodyPart2 != null) multipart.addBodyPart(bodyPart2);
	          
	          /*
	          //temp: /home/younggu/git/codconnect/src/main/webapp/images/general/connect-png-2.png
	          String optomConnectLogoPath = MainContextListener.gContext.getRealPath("images/general/connect-png-2.png");
	          
	          if (optomConnectLogoPath != null)
	          {
	        	  BodyPart imagePart = new MimeBodyPart();
		          imagePart.setDataHandler(new DataHandler(new FileDataSource(optomConnectLogoPath)));
		          imagePart.setHeader("Content-ID", "<optom_connect_logo>");  
		          imagePart.setDisposition(MimeBodyPart.INLINE);
		          multipart.addBodyPart(imagePart);
	          }
	          */
	          /*********** A Multipart Body END ************/
	          
	          mimeMsg.setSubject(subject,"UTF-8");
	          mimeMsg.setContent(multipart);

	    	  transport.connect();  
	    	  Transport.send(mimeMsg);  
	    	  transport.close();  
	    	  log.info("EMail from " + fromEmail + " to " + toEmail + " was sent successfully.");

 	     }
    	 catch (SendFailedException se)
    	 {
    		 log.severe("(SendFailedException) Unable to email to "+toEmail+" in using Yahoo SMPT Server, AsynchroEmail.java");
 	    	 /*if(ab != null && ab.getId() > 0 && isSignUp)
 	    	 {
 	    		 //Delete records if not successful in email of Signup Confirmation
 	    		 new AuthDao(DatasourceUtil.getDataSource()).deleteRecords(ab);
 	    	 }*/
        	 throw new EmailException(se);
    	 }
 	     catch (Exception e) 
 	     {

 	    	log.severe("(Exception) Unable to email to "+toEmail+" in using Yahoo SMPT Server, AsynchroEmail.java");
 	    	 /*if(ab != null && ab.getId() > 0 && isSignUp)
 	    	 {
 	    		 //Delete records if not successful in email of Signup Confirmation
 	    		 new AuthDao(DatasourceUtil.getDataSource()).deleteRecords(ab);
 	    	 }
 	    	 */
 	    	 
        	 throw new EmailException(e);
 	     }
      }
      @Override
      public void run()
	  {
		  try
		  {	  
			  yahooSMTP();
			  
		  }
		  catch(Exception e)
		  {
			  log.severe("emailing to "+toEmail+" has been failed for subject:"+subject+".\nCause:"+e.getMessage());
		  }
		  
	  }
}
