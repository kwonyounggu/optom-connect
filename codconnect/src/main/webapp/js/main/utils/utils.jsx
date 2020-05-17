export function sleep(ms)
{
	//console.log("sleep starting ...");
	var currentTime=new Date().getTime();
	while((currentTime+ms) >= new Date().getTime());
}
//Parameter lang should be either kr or en
export function setLang(lang) 
{
	  if (lang) localStorage.setItem("lang", lang);
	  else localStorage.setItem("lang", "kr");
}
export function getLang() 
{
	  let lang = localStorage.getItem("lang");
	  return lang ? lang : "kr";
}
/***************************************************************************************/
//Note that g is purposely removed to prevent the false result of the 2nd testing.
/***************************************************************************************/
export var EngKorNameRegex = /^[a-zA-Z\u3131-\uD79D]{1,100}$/;
export var FullNameKoreanPlaceholder = "홍길동 or Abraham Lincoln";
//Got Recaptcha siteKey from webmonster.ca email
export const siteKey="6Lc--T0UAAAAAICcpz5L__QZoNxxnUoFhU1SbNar";

/***************************************************************************************/
//Alternatively either using local wildfly server or openshift server
/***************************************************************************************/
//export const serviceHost = "https://192.168.1.81:8443/";

//export const serviceHost = "http://" + location.hostname + "/";
