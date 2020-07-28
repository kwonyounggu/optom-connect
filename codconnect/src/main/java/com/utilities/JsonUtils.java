package com.utilities;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.logging.Logger;

import java.util.stream.Collectors;

import org.apache.commons.validator.routines.EmailValidator;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import com.dao.AuthDao;

public class JsonUtils
{
	private  static Logger log = Logger.getAnonymousLogger();
	private static final String VALID_NAME_REGEX = "^[a-zA-Z\u3131-\uD79D]{1,100}$";

	public static String getString(JSONObject json, String name) 
	{
	    String value = json.optString(name);
	    // return empty string for "null"
	    //if (JSON_NULL_STR.equals(value)) return "";
	    return value;
	}
	public static void removeAll(JSONObject root)
	{
		Iterator<String> keys = root.keys();
		while (keys.hasNext()) 
		{
			System.err.println("key: " + keys.toString());
			root.remove((String)root.keys().next());
		}
	}
	public static Object getStringPropertyAsJSON(JSONObject jsonObject, String key, String nonJSONPropertyKey) throws JSONException 
	{
	    Object value = jsonObject.opt(key);
	    if (value != null && value instanceof String) 
	    {
	        JSONTokener tokener = new JSONTokener((String) value);
	        value = tokener.nextValue();
	    }

	    if (value != null && !(value instanceof JSONObject || value instanceof JSONArray)) 
	    {
	        if (nonJSONPropertyKey != null) 
	        {
	            // Facebook sometimes gives us back a non-JSON value such as
	            // literal "true" or "false" as a result.
	            // If we got something like that, we present it to the caller as
	            // a GraphObject with a single
	            // property. We only do this if the caller wants that behavior.
	            jsonObject = new JSONObject();
	            jsonObject.putOpt(nonJSONPropertyKey, value);
	            return jsonObject;
	        } 
	        else 
	        {
	            throw new JSONException("Got an unexpected non-JSON object.");
	        }
	    }

	    return value;

	}
	public static void printJsonObject(JSONObject jsonObj)
	{
		log.info(">>> Printing the given jsonObject ... <<<");
		for(Object key: jsonObj.keySet())
		{
			String keyStr = (String)key;
			Object keyVal = jsonObj.get(keyStr);
			
			log.info("key: " + keyStr + ", value: " + keyVal);
			
			if(keyVal instanceof JSONObject) printJsonObject((JSONObject) keyVal);
		}
	}
	
	public static boolean isBetweenMinMax(int value, int min, int max)
	{
		return (value>=min && value <=max);
	}
	public static boolean isBetweenMinMax(String s, int min, int max)
	{
		int len = s.length();
		return (len>=min && len <=max);
	}

	public static boolean isFullNameValid(String fullName)
	{
		List<String> fullNameList = Arrays.stream(fullName.split("\\s+")).filter(w->w.trim().length()>0).collect(Collectors.toList());
		
		if(fullNameList.size() > 2 || fullNameList.size() < 1) return false;
		else if(fullNameList.size() > 1) //English Full Name
		{
			if(!(fullNameList.get(0).matches("\\p{Alpha}+") && 
				 fullNameList.get(1).matches("\\p{Alpha}+") && 
				 (fullNameList.get(0).length()+fullNameList.get(1).length())<=70)) return false;
			return true;
		}
		//Korean, Chinese, Japanese
		else if(!fullNameList.get(0).matches("^[\\p{IsHangul}\\p{IsHan}\\p{InHiragana}\\p{InKatakana}]{2,10}$")) return false;
		return true;
	}
	public static JSONObject validateFogotPassword(JSONObject jsonObj)
	{
		jsonObj.getJSONObject("errors").keySet().clear();//reset all errors if any
		for(Object key: jsonObj.keySet())
		{
			String keyStr = (String)key;

			switch(keyStr)
			{
				case "email":
					try
					{
						if(!EmailValidator.getInstance().isValid(jsonObj.getString(keyStr)))
						{
							 jsonObj.getJSONObject("errors").put(keyStr, "The email field is invalid.");
						}
					}
					catch(Exception e)
					{
						jsonObj.getJSONObject("errors").put(keyStr, e.getMessage());
					}
					break;
				default: break;
			}
		}
		jsonObj.put("invalid", jsonObj.getJSONObject("errors").length()>0 ? true : false);
		return jsonObj;
	}
	public static JSONObject validateLogin(JSONObject jsonObj)
	{
		jsonObj.getJSONObject("errors").keySet().clear();//reset all errors if any
		for(Object key: jsonObj.keySet())
		{
			String keyStr = (String)key;
			
			switch(keyStr)
			{
				case "email":
					try
					{
						if(!EmailValidator.getInstance().isValid(jsonObj.getString(keyStr)))
						{
							 jsonObj.getJSONObject("errors").put(keyStr, "The email field is invalid.");
						}
					}
					catch(Exception e)
					{
						jsonObj.getJSONObject("errors").put(keyStr, e.getMessage());
					}
					break;
				case "password":
					if(!isBetweenMinMax(jsonObj.getString(keyStr), 6, 30))
					{
						jsonObj.getJSONObject("errors").put(keyStr, "The field requires in size between 6 and 30.");
					}
					break;
				default: break;
			}
		}
		jsonObj.put("invalid", jsonObj.getJSONObject("errors").length()>0 ? true : false);
		return jsonObj;
	}
	public static JSONObject validateSignup(JSONObject jsonObj)
	{
		jsonObj.getJSONObject("errors").keySet().clear();//reset all errors if any
		for(Object key: jsonObj.keySet())
		{
			String keyStr = (String)key;
			
			switch(keyStr)
			{
				case "fullName":
					if(jsonObj.getString(keyStr).isEmpty())
					{
						jsonObj.getJSONObject("errors").put(keyStr, "The field is required.");
					}
					else if(!isFullNameValid(jsonObj.getString(keyStr)))
					{
						jsonObj.getJSONObject("errors").put(keyStr, "Full Name is invalid (use like " + KoreanLetters.fullNameValidExample + ").");
					}
					break;
				case "email":/*
					try
					{
						if(!EmailValidator.getInstance().isValid(jsonObj.getString(keyStr)))
						{
							 jsonObj.getJSONObject("errors").put(keyStr, "The email field is invalid.");
						}
						else if(new AuthDao(DatasourceUtil.getDataSource()).isUserExists(jsonObj.getString(keyStr)))
						{
							jsonObj.getJSONObject("errors").put(keyStr, "There already exists the same user email, reset password to login.");
						}
					}
					catch(Exception e)
					{
						//jsonObj.getJSONObject("errors").put(keyStr, e.getMessage());
						jsonObj.getJSONObject("errors").put(keyStr, "The system found a problem while processing DB.");
					}*/
					break;
				case "password":
					if(!isBetweenMinMax(jsonObj.getString(keyStr), 6, 30))
					{
						jsonObj.getJSONObject("errors").put(keyStr, "The field requires in size between 6 and 30.");
					}
					break;
				case "passwordConfirmation": 
					if(!jsonObj.getString(keyStr).equals(jsonObj.getString("password")))
					{
						jsonObj.getJSONObject("errors").put(keyStr, "Passwords must match.");
					}
					break;
				case "timezone": 
					if(jsonObj.getString(keyStr).isEmpty())
					{
						jsonObj.getJSONObject("errors").put(keyStr, "This field is reuqired.");
					}
					break;
				case "providerNumber": 
					jsonObj.getJSONObject("errors").put(keyStr, "The given provider/billing number is being used by someone else.");
					break;
				default: break;
			}
		}
		jsonObj.put("invalid", jsonObj.getJSONObject("errors").length()>0 ? true : false);
		return jsonObj;
	}
public static JSONObject validateResetPassword(JSONObject jsonObj)
{
	jsonObj.getJSONObject("errors").keySet().clear();//reset all errors if any
	for(Object key: jsonObj.keySet())
	{
		String keyStr = (String)key;
		
		switch(keyStr)
		{
			case "fullName":
				if(jsonObj.getString(keyStr).isEmpty())
				{
					jsonObj.getJSONObject("errors").put("serverAPI", "Oops! Something went wrong.:::Your name seems interrupted.");
				}
				else if(!isFullNameValid(jsonObj.getString(keyStr)))
				{
					jsonObj.getJSONObject("errors").put("serverAPI", "Oops! Something went wrong.:::Your name seems interrupted (ie: invalid name).");
				}
				break;
			case "token":
				if(jsonObj.getString(keyStr).isEmpty())
				{
					jsonObj.getJSONObject("errors").put("serverAPI", "Oops! Something went wrong.:::The token value seems interrupted.");
				}
				break;
			case "email":
				if(!EmailValidator.getInstance().isValid(jsonObj.getString(keyStr)))
				{
					 jsonObj.getJSONObject("errors").put("serverAPI", "Oops! Something went wrong.:::The email seems interrupted.");
				}
				break;
			case "password":
				if(!isBetweenMinMax(jsonObj.getString(keyStr), 2, 30))
				{
					jsonObj.getJSONObject("errors").put(keyStr, "The field requires in size between 2 and 30.");
				}
				break;
			case "passwordConfirmation": 
				if(!jsonObj.getString(keyStr).equals(jsonObj.getString("password")))
				{
					jsonObj.getJSONObject("errors").put(keyStr, "Passwords must match.");
				}
				break;
			default: break;
		}
	}
	jsonObj.put("invalid", jsonObj.getJSONObject("errors").length()>0 ? true : false);
	return jsonObj;
  }

	/*
	 * The followings are from https://www.programcreek.com/java-api-examples/?code=shawlaf/Banmanager/Banmanager-master/Core/src/me/shawlaf/banmanager/core/util/JSONUtils.java
	 */
	public static void putInJSON(JSONObject object, String key, Object value)
	{

		if (value instanceof String)
		{
			object.put(key, (String) value);
		}
		else if (value instanceof Collection<?>)
		{
			object.put(key, toJSONArray((Collection<?>) value));
		}
		else if (value instanceof Map<?, ?>)
		{
			object.put(key, toJSONObject((Map<?, ?>) value));
		}
		else if (value instanceof UUID)
		{
			object.put(key, value.toString());
		}
		else
		{
			object.put(key, value);
		}

	}

	public static void putInJSON(JSONArray array, Object value)
	{

		if (value instanceof String)
		{
			array.put((String) value);
		}
		else if (value instanceof Collection<?>)
		{
			array.put(toJSONArray((Collection<?>) value));
		}
		else if (value instanceof Map<?, ?>)
		{
			array.put(toJSONObject((Map<?, ?>) value));
		}
		else if (value instanceof UUID)
		{
			array.put(value.toString());
		}
		else
		{
			array.put(value);
		}
	}

	public static JSONObject toJSONObject(Map<?, ?> map)
	{
		JSONObject returnJSON = new JSONObject();

		for (Map.Entry<?, ?> entry : map.entrySet())
			putInJSON(returnJSON, entry.getKey().toString(), entry.getValue());

		return returnJSON;

	}

	public static JSONArray toJSONArray(Collection<?> collection)
	{

		JSONArray array = new JSONArray();

		for (Object object : collection)
		{
			putInJSON(array, object);
		}

		return array;

	}

	public static Collection<Object> toCollection(JSONArray array)
	{
		Collection<Object> collection = new ArrayList<>();

		for (int i = 0; i < array.length(); i++)
		{
			Object entry = array.get(i);

			if (entry instanceof JSONObject)
			{
				collection.add(toMap((JSONObject) entry));
			}
			else if (entry instanceof JSONArray)
			{
				collection.add(toCollection((JSONArray) entry));
			}
			else
			{
				collection.add(entry);
			}
		}

		return collection;
	}

	public static List<Object> toList(JSONArray array)
	{
		return new ArrayList<>(toCollection(array));
	}

	public static Set<Object> toSet(JSONArray array)
	{
		return new HashSet<>(toCollection(array));
	}

	public static Map<String, Object> toMap(JSONObject object)
	{
		Map<String, Object> map = new HashMap<>();

		String[] fields = JSONObject.getNames(object);

		for (String field : fields)
		{
			Object entry = object.get(field);

			if (entry instanceof JSONObject)
			{
				map.put(field, toMap((JSONObject) entry));
			}
			else if (entry instanceof JSONArray)
			{
				map.put(field, toCollection((JSONArray) entry));
			}
			else
			{
				map.put(field, entry);
			}
		}

		return map;
	}
}
