package com.utilities;

import java.security.Key;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.dbcp2.BasicDataSource;
import org.json.JSONObject;

import com.beans.AuthUserDetailsInternalBean;
import com.dao.AuthDao;

import java.util.Calendar;
import java.util.Date;
import java.util.logging.Logger;

//import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

/*
 * https://www.programcreek.com/java-api-examples/?class=io.jsonwebtoken.JwtBuilder&method=setExpiration
 */
public class TokenUtil
{
	private Logger log = Logger.getLogger(this.getClass().getName());
	
	public static final int expDays = 365;
	public static final int expMinutes = 15;
	private static final Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
	private static final byte[] secretBytes = secret.getEncoded();
	private static final String base64SecretBytes = java.util.Base64.getEncoder().encodeToString(secretBytes);
	
	/*
	 * Note if (ttlMillis == -1) then 'Keep me logged in' is false
	 * 		else if (ttlMillis >= 0 ) then 'Keep me logged in' is true
	 */
	public String getJWT(String id, String issuer, String subject, long ttlMillis)
	{
		long nowMills = System.currentTimeMillis();
		Date now = new Date(nowMills);
		
		JwtBuilder builder = Jwts.builder().setId(id)
										   .setIssuedAt(now)
										   .setSubject(subject)
										   .setIssuer(issuer)
										   .signWith(SignatureAlgorithm.HS256, base64SecretBytes);
		if(ttlMillis >= 0)
		{
			Calendar c = Calendar.getInstance();
			c.setTime(now);
			c.add(Calendar.DATE, expDays);
			//c.add(Calendar.MINUTE, 1);
			builder.setExpiration(c.getTime());
		}
		else if(ttlMillis == -1) //'keep me logged in' is off/false
		{
			Calendar c = Calendar.getInstance();
			c.setTime(now);
			//c.add(Calendar.DATE, expDays);
			c.add(Calendar.HOUR, 2);//set 2 hours of expiration from the current time
			builder.setExpiration(c.getTime());
		}
		return builder.compact();
	}
	
	/*
	 * The following function works well if the token is before expiratation, 
	 * otherwise will throw SignatureException. Don't use until there is a usage later.
	 */
	public Claims verifyToken(String token, String id) throws Exception
	{
		Claims claims = null;
		try
		{
			claims = Jwts.parser().setSigningKey(base64SecretBytes)
										 .parseClaimsJws(token)
										 .getBody();
			System.err.println("ID: " + claims.getId() + "\n" +
					"Subject: " + claims.getSubject() + "\n" +
					"Issuer: " + claims.getIssuer() + "\n" +
					"Expiration: " + claims.getExpiration());
		}
		catch(Exception e)
		{
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		
		return claims;
	}
	
	public JSONObject verifyToken(String token) throws Exception
	{
			//********** Decode JWT ***************
	        String[] splitToken = token.split("\\.");
	        String base64EncodedHeader = splitToken[0];
	        String base64EncodedBody = splitToken[1];
	        String base64EncodedSignature = splitToken[2];
	
	        //********** JWT Header ***************
	        Base64 base64Url = new Base64(true);
	        String header = new String(base64Url.decode(base64EncodedHeader));
	        System.out.println("JWT Header : " + header);
	
	
	        //********** JWT Body ***************
	        String body = new String(base64Url.decode(base64EncodedBody));
	        System.out.println("JWT Body : "+body);  
	        
	        JSONObject jsonObj = new JSONObject(body);
	        //JsonUtils.printJsonObject(jsonObj);
	        if (jsonObj.getString("sub").contains("Login"))
	        {
	        	//Check the expiration time
	        	//Check the login id and email
	        	//if token is expired then throw an exception saying 'Signature expired, logout and login
	        	//if login id and email not in db, throw an exception saying 'Signature faild, logout and login
	        	//else return true
	        	//in the upload servlet, put the mro file into db
	        	long currentTimeInMillis = (long)(Calendar.getInstance().getTimeInMillis()/1000);
	        	long expTimeInMillis = jsonObj.getLong("exp");
	        	System.err.println("exp: "+expTimeInMillis+", now: "+currentTimeInMillis+", exp<now: "+(expTimeInMillis<currentTimeInMillis));
	        	
	        	if (currentTimeInMillis > expTimeInMillis)
	        	{
	        		throw new Exception("Signature expired, please logout and login. -- Do it again!");
	        	}
	        	String emailId = jsonObj.getString("jti");
	        	String issuer = jsonObj.getString("iss");
	        	String subject = jsonObj.getString("sub");//internalLogin or externalLogin
	        	
	        	if (subject.equals("internalLogin"))
	        	{
					AuthDao aDao = new AuthDao(DatasourceUtil.getDataSource());

					//Commented on 2021-01-21
	        		//Object o = aDao.queryObject("select name from auth_user_details_internal where email='" + jsonObj.getString("jti") +"'");
	        	    //if (o==null || !jsonObj.getString("iss").equals(o))	
	        	    //	throw new Exception("Personal data not matching, please logout and login. -- Do it again!");

					//Added the below instead of the above three lines statement on 2021-01-21
					AuthUserDetailsInternalBean ab = aDao.getRecord(jsonObj.getString("jti"), "email");
					if (ab.getId() == -1) throw new Exception("Personal data not matching, please logout and login. -- Do it again!");
					else jsonObj.put("providerNumber", ab.getProviderNumber());
	        	}
	        	//The following else-if statement is not being used for this application, optom.connect
	        	else if (subject.equals("externalLogin"))
	        	{
	        		AuthDao aDao = new AuthDao(DatasourceUtil.getDataSource());
	        		Object o = aDao.queryObject("select name from auth_user_external_login where email='" + jsonObj.getString("jti") +"'");
	        	    if (o==null || !jsonObj.getString("iss").equals(o))	
	        	    	throw new Exception("SNS authorization data not matching, please logout and login. -- Do it again!");
	        	}
	        	else throw new Exception("Authorization subject not matching, please logout and login. -- Do it again!");
	        }
	        JsonUtils.printJsonObject(jsonObj);
	        return jsonObj;
	}
}
