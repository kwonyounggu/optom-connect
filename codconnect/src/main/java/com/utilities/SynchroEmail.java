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
import com.exceptions.EmailException;
import com.service.MainContextListener;

/*
 * Note the following class is used for a synchronized email using yahoo smtp server.
 */

public class SynchroEmail extends Authenticator
{
	  private Logger log = Logger.getLogger(this.getClass().getName());
		
      private String _fileName="";
      private AuthUserDetailsInternalBean ab = null;
         
      /*
       * Instantiate the following constructor if you want to use 'Signup Confirmation'
       */
      public SynchroEmail(List<String> toAddr, List<String> name, String subject, String message, AuthUserDetailsInternalBean ab, boolean isSignUp) throws EmailException
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
	    	  
	    	  Address addressFrom = new InternetAddress(Utils.SMPT_SENDER,"Optom.Connect-ADMIN","UTF-8");
	    	     
	    	  MimeMessage mimeMsg = new MimeMessage(session);    
	    	  mimeMsg.setFrom(addressFrom);
	    	  
	    	  Address[] to = new InternetAddress[toAddr.size()];
	          for(int i = 0; i < toAddr.size(); i++) to[i] = new InternetAddress((String) toAddr.get(i),name.get(i)+"","UTF-8");
	          mimeMsg.addRecipients(Message.RecipientType.TO, to);//OK  
	          
	          //The following two lines for information to optom.connect administrator every time with every kind of email
	          Address[] bcc = {new InternetAddress(Utils.SMPT_SENDER, "optom.connect-ADMIN BCC","UTF-8")};
        	  mimeMsg.addRecipients(Message.RecipientType.BCC, bcc);
	          
	          
	          /*********** A Multipart Body BEGIN ************/
	          BodyPart bodyPart1 = new MimeBodyPart();
	          bodyPart1.setContent(message, "text/html;charset=utf-8");
	          
	          BodyPart bodyPart2 = null;
	          
	          if(_fileName.length() > 0)
	          {
	        	  bodyPart2 = new MimeBodyPart();
	        	  bodyPart2.setDataHandler(new DataHandler(new FileDataSource(_fileName)));
	        	  bodyPart2.setFileName(_fileName.substring(_fileName.lastIndexOf("/")+1));
	          }
	          
	          Multipart multipart = new MimeMultipart();
	          multipart.addBodyPart(bodyPart1);
	          if(bodyPart2 != null) multipart.addBodyPart(bodyPart2);
	          
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
	         
	          /*********** A Multipart Body END ************/
	          
	          mimeMsg.setSubject(subject,"UTF-8");
	          mimeMsg.setContent(multipart);

	    	  transport.connect();  
	    	  Transport.send(mimeMsg);  
	    	  transport.close();  
	    	  log.info("EMail from "+Utils.SMPT_SENDER+" to "+toAddr+" was sent successfully.");

 	     }
    	 catch (SendFailedException se)
    	 {
    		 log.severe("(SendFailedException) Unable to email to "+toAddr+" in using Yahoo SMPT Server, SynchroEmail.java");
 	    	 if(ab != null && ab.getId() > 0 && isSignUp)
 	    	 {
 	    		 //Delete records if not successful in email of Signup Confirmation
 	    		 new AuthDao(DatasourceUtil.getDataSource()).deleteRecords(ab);
 	    	 }
        	 throw new EmailException(se);
    	 }
 	     catch (Exception e) 
 	     {

 	    	 log.severe("Unable to email to "+toAddr+" in using Yahoo SMPT Server, SynchroEmail.java");
 	    	 if(ab != null && ab.getId() > 0 && isSignUp)
 	    	 {
 	    		 //Delete records if not successful in email of Signup Confirmation
 	    		 new AuthDao(DatasourceUtil.getDataSource()).deleteRecords(ab);
 	    	 }
        	 throw new EmailException(e);
 	     }
      }
}
