wildfly10.x to access, type admin/277312
1. src/main/webapp/WEB-INF/jboss-web.xml required so that https:/a.a.a.a:8443/index.html which is in src/main/webapp/index.html
   In the file, jboss-web.xml will have <context>/<context>
2. To make https from http, you have to change ssl in standalone/configuration/standalone.xml
3. Multiple domains in one wildfly server setting, study more accordingly later
---LAST UPDATE: MAY 13 -2020
 if the user changes any personal information, then localStorage information needs to be updated by logout and login again.
 In converting MRO files, ComponentDidMount, axios.get("getHTML text") in json, then display below of 'Convert file' - May 22nd
 

 After converting a file successfully, when you upload an anther file, there is an error 'containing all the previous data' with 404 as follows
 [INFO componentDidUpdate(...) of convertMROtoCSV.jsx] nextProps.rootReducer:  {lang: "kr", fetching: false, fetched: true, data: {…}, error: Error: Request failed with status code 404
    at createError (webpack:///./node_modules/axios/lib/…}
    
 Checking if the health care provider number is not being used by someone. -- It seems ok as long as it is used with another login person
 SignUp includes -- HEALTH CARE PROVIDER NUMBER -- LIKE IN DR.BILL, check the site