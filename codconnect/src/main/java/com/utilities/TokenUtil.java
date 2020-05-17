package com.utilities;

import java.security.Key;
import java.util.Base64;
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
	private static final String base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);
	
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
			builder.setExpiration(c.getTime());
			
			
			/* The following are used to set expMinutes
			long expMillis = nowMills + ttlMillis;
			Date exp = new Date(expMillis);
			builder.setExpiration(exp);
			***********************************************/
		}
		
		return builder.compact();
	}
	
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
}
