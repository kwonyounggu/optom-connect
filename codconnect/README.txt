wildfly10.x to access, type admin/military-no
1. src/main/webapp/WEB-INF/jboss-web.xml required so that https:/a.a.a.a:8443/index.html which is in src/main/webapp/index.html
   In the file, jboss-web.xml will have <context>/<context>
2. To make https from http, you have to change ssl in standalone/configuration/standalone.xml
3. Multiple domains in one wildfly server setting, study more accordingly later
---LAST UPDATE: MAY 13 -2020
 if the user changes any personal information, then localStorage information needs to be updated by logout and login again.
 In converting MRO files, ComponentDidMount, axios.get("getHTML text") in json, then display below of 'Convert file' - May 22nd
 
To represent the user add the following to the server-identities definition <secret value="Mjc3MzEy" />
 After converting a file successfully, when you upload an anther file, there is an error 'containing all the previous data' with 404 as follows
 [INFO componentDidUpdate(...) of convertMROtoCSV.jsx] nextProps.rootReducer:  {lang: "kr", fetching: false, fetched: true, data: {…}, error: Error: Request failed with status code 404
    at createError (webpack:///./node_modules/axios/lib/…}
    
 Checking if the health care provider number is not being used by someone. -- It seems ok as long as it is used with another login person
 SignUp includes -- HEALTH CARE PROVIDER NUMBER -- LIKE IN DR.BILL, check the site
 Put the followings in the convert page:
			 A. Remittance Advice (RA) Report
			This report is a monthly statement of approved claims. It is normally delivered
			within the first week of the month. The RA is produced during a 3-4 day period at
			the end of the month and is delivered when month-end processing is completed.
			B. Group Split Remittance Advice Report
			This report is a monthly statement of approved claims. It is only available to
			physicians affiliated with a Family Health Network (FHN) or Family Health
			Organization (FHO).
			C. File Reject Report
			This report notifies you if the ministry has rejected an entire claims file. It is
			normally sent within a few hours of the claim file submission. This means the file
			has been transferred correctly but the file does not meet current ministry
			technical specifications.
			D. Batch Edit Report
			This report is normally sent within 24 hours of the claim file submission. This is
			your receipt that the ministry received your file; however, it does not guarantee
			payment of the submitted claims. If claims are uploaded on a weekend, holiday
			or at month-end, the Batch Edit Report is delivered on the next claims
			processing day. 
			Medical Claims Introduction
			Electronic Data Transfer Reference Manual
			Page 13 of 220
			E. Error Report
			This report provides a list of rejected claims and the appropriate error codes for
			each claim. It is normally sent within 48 hours of claim file submission. If claims
			are uploaded on a weekend, holiday or at month-end, the Error Report is
			delivered at the end of the next claims processing day.
			F. Group Split Error Report
			This report provides a list of rejected claims and the appropriate error codes for
			each claim. It is only available to physicians affiliated with a FHN or FHO.
			G. OBEC Response Report
			Overnight Batch Edit Checking (OBEC) files received by the ministry by 4:00pm
			are processed overnight and the OBEC Response Report is sent by 7:00am the
			following morning.
			H. Primary Care Reports
			These reports are delivered to registered primary care physicians and groups
			within the first week of the month. These reports include:
			 Enrolment & Consent Summary Report - a summary of patient enrolment
			activity to date.
			 Enrolment & Consent Outside Use Report (Patients with Signed Consent)
			- provides outside use details for each physician within a specific primary
			care group.
			I. Governance Reports
			The Academic Health Sciences Centre (AHSC) Governance Reports and the
			Northern Specialist Alternate Payment Plan (NSAPP) Governance Reports are
			generated monthly and sent to the user ID generated for the governance at time
			of registration.
			J. General Communication
			General Communication (GCM) files replace the former EDT Bulletin Board.
			General Communication files are communications that are specific to the MC
			EDT service (e.g. planned outage, claims information) or the eSubmit service
			(e.g. Remittance Advice inquiry responses, requests for additional information).
			It is important to review your downloaded files regularly to ensure you do not
			miss important ministry communications with the file type GCM. If you have
			automated software you may want to discuss this with your vendor.
			Files sent to you by the ministry will be available for download of up to 12
			months from the date of creation. Files can be downloaded multiple times during
			this period. 
			
			App passwords
Here is your app password for optom.connect

fuacxvrrtcpqwdxo
How to use this app password
Go to the settings section of your app
Find the screen where you enter your Yahoo account username and password
Copy the app password above and paste it into the password field


JAN 5 -
WEBPACK, BABEL LOADER CORE : incompatible so it create loader error

FEB 1 2021
1. in wepapp/index.html, comment <script src=root_index_bundle.js></script> section
2. in terminal>npm run build
3. in webapp/index.html, uncomment <script src=root_index_bundle.js></script> section
4. export to a war file
5. undeploy the existing war file
6. upload to deploy the new war file.