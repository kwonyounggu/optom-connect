wildfly10.x to access, type admin/277312
1. src/main/webapp/WEB-INF/jboss-web.xml required so that https:/a.a.a.a:8443/index.html which is in src/main/webapp/index.html
   In the file, jboss-web.xml will have <context>/<context>
2. To make https from http, you have to change ssl in standalone/configuration/standalone.xml
3. Multiple domains in one wildfly server setting, study more accordingly later
---LAST UPDATE: MAY 13 -2020
 if the user changes any personal information, then localStorage information needs to be updated by logout and login again.