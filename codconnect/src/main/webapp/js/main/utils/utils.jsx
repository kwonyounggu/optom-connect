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

//Got Recaptcha siteKey for domain: webmonster.ca, email: kwon.younggu@gmail.com, label: Optom Connect
export const siteKey = "6LeFlGAaAAAAAA8dqccJIG-ocDuubz7ss3-kQKaK"; //V2

