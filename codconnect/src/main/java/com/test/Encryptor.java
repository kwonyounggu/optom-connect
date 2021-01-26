package com.test;

import java.util.Base64;

public class Encryptor
{

	/*
	 * Note that the example comes from https://dzone.com/articles/base64-encoding-java-8
	 */
	public static void main(String[] args) throws Exception
	{
		String encoded = Base64.getEncoder().encodeToString("password you want to encode".getBytes());
		System.out.println(encoded);
		String decoded = new String(Base64.getDecoder().decode("==a29yZWFhbmRvbmc==="), "utf-8");
		System.out.println(decoded);
	}
}
