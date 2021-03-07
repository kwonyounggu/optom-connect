(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{313:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(5),r=a(9),o=a(311),l=Object(n.a)((function(e){return{root:{backgroundColor:e.palette.grey[100],height:e.spacing(3),color:e.palette.grey[800],fontWeight:e.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:e.palette.grey[300]},"&:active":{boxShadow:e.shadows[1],backgroundColor:Object(r.c)(e.palette.grey[300],.12)}}}}))(o.a)},341:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(309),l=a(260),c=a(305),i=a(307),s=a(170),m=a(13),u=a(4);function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done)&&(a.push(l.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var f=Object(l.a)((function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}})),d=function(e){console.log("MyModal props: ",e);var t=f(),a=E(r.a.useState(!0),2),n=a[0],l=a[1];return r.a.createElement(o.a,{"aria-labelledby":"modal-title","aria-describedby":"modal-description",className:t.modal,open:n,onClose:function(){return l(!0)},closeAfterTransition:!0,BackdropComponent:c.a,BackdropProps:{timeout:500}},r.a.createElement(s.a,{in:n},r.a.createElement("div",{className:t.paper}," ",r.a.createElement("h2",{id:"modal-title"},"Sorry, the login is required."),r.a.createElement("div",null,r.a.createElement(i.a,{href:"/",color:"primary"},"Home"),r.a.createElement(i.a,{component:m.b,to:e.to,color:"primary"},r.a.createElement("b",null,"Login"))))))};d.propTypes={to:u.PropTypes.object.isRequired},t.a=d},527:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(5),l=a(300),c=a(529),i=a(105),s=a.n(i),m=a(306),u=a(304),E=a(301),p=a(379),f=a(266),d=a(307),h=a(76),g=a(446),y=a.n(g),b=a(519),R=a.n(b),x=a(520),C=a.n(x),O=a(261),v=a(341),N=a(313),A=a(551),D=a(553),T=a(548),S=a(550),P=a(552),w=a(549),M=a(567),I=a(311),j=a(447),F=a.n(j),B=a(346);function k(e,t){var a=[["PAYEE NAME:",e.hr1.title+". "+e.hr1.initials+" "+e.hr1.lastName,"HEALTH CARE PROVIDER:",e.hr1.healthCareProvider],["GROUP NUMBER:","0000"===e.hr1.groupNumber?" N/A":e.hr1.groupNumber,"PAYMENT DATE: ",e.hr1.paymentDate],["PAYMENT METHOD:","99999999"===e.hr1.chequeNumber?"Direcct Deposit":0==e.hr1.chequeNumber.length?"Pay Patient":e.hr1.chequeNumber,"TOTAL AMOUNT:",t.format(e.hr1.totalAmountPayable)],["RA SEQUENCE:",e.hr1.remittanceAdviceSequence,"SPECIALITY:",e.hr1.speciality],["BILLING AGENT:",e.hr2.addressLineOne,e.hr3.addressLineTwo,e.hr3.addressLineThree],[" "," "," "," "],["ACCOUNTING NUMBER","CLAIM NUMBER","REGISTRATION NUMBER","HEALTH CARE PROVIDER","PAYMENT RPOGRAM","PROVICE CODE","SPECIALITY","TX TYPE","VSN CODE","EXP CODE","SVC DATE","NO.OF SVC","SVC CODE","AMT SUBMITTED","AMT PAID"]];return e.hr45.forEach((function(e){var n=[e.accountingNumber,e.claimNumber,e.healthRegistrationNumber,e.healthcareProvider,e.paymentProgram,e.provinceCode,e.speciality,e.transactionType,e.versionCode,e.explanatoryCode,e.serviceDate,e.numberOfServices,e.serviceCode,t.format(e.amountSubmitted),t.format(e.amountPaid)];a.push(n)})),e.hr6&&(a.push([" "]),a.push(["Balance Forward Record"]),a.push(["Amount Brought Forward – Claims Adjustment: ",t.format(e.hr6.amtBrtFwdClaimsAdjustment)]),a.push(["Amount Brought Forward – Advances: ",t.format(e.hr6.amtBrtFwdClaimsAdvances)]),a.push(["Amount Brought Forward – Reductions: ",t.format(e.hr6.amtBrtFwdReductions)]),a.push(["Amount Brought Forward – Other Deductions: ",t.format(e.hr6.amtBrtFwdOtherDeductions)])),e.hr7&&(a.push([" "]),a.push(["Accounting Transaction Record"]),a.push(["Transaction Code["+e.hr7.txCodeOrg+"]: ",e.hr7.transactionCode]),a.push(["Transaction Date: ",e.hr7.transactionDate]),a.push(["Transaction Amount: ",t.format(e.hr7.transactionAmount)]),a.push(["Transaction Message: ",e.hr7.transactionMessage])),a}var U=a(6);function H(e){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function L(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function V(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=X(e);if(t){var r=X(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return G(this,a)}}function G(e,t){return!t||"object"!==H(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function X(e){return(X=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var Y=Object(o.a)((function(e){return{tooltip:{backgroundColor:"#f5f5f9",color:"rgba(0, 0, 0, 0.87)",maxWidth:350,fontSize:e.typography.pxToRem(12),border:"1px solid #dadde9"}}}))(u.a),z=Object(o.a)((function(e){return{head:{fontWeight:"bold"},body:{}}}))(T.a),W=Object(o.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(w.a),q=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),J=[{id:"serviceDate",label:"SVC DATE",labelDesc:"Service Date"},{id:"accountingNumber",label:"ACCOUNT NUM",labelDesc:"Accounting Number"},{id:"claimNumber",label:"CLAIM NUM",labelDesc:"Claim Number"},{id:"healthRegistrationNumber",label:"REGSTN NUM",labelDesc:"Health Registration Number"},{id:"serviceCode",label:"SVC CODE",labelDesc:"Service Code"},{id:"serviceNumber",label:"SVC NUM",labelDesc:"Service Number"},{id:"amountSubmitted",label:"AMOUNT SUBMITTED",labelDesc:"Amount Submitted by You"},{id:"amountPaid",label:"AMOUNT PAID",labelDesc:"Amount Paid for You"}],Q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(c,e);var t,a,n,o=V(c);function c(e){var t,a,n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=o.call(this,e)).handleSorting=function(e){t.setState((function(t){return{hr45:F()(t.hr45,[e],["asc"===t.order?"desc":"asc"]),orderby:e,order:"asc"===t.order?"desc":"asc"}}))},t.onSortClick=function(e){return function(a){t.handleSorting(e)}},t.tableBody=function(e){var t=e.transactionType,a=e.explanatoryCode.length>0,n=null,o=1==t?"Transaction Type: Original Claim":"Transaction Type: Adjustment to Original Claim",c="Explantory Code: "+(a?e.explanatoryCode+", "+e.explanatoryCodeDesc:"N/A");n=2==t&&a?{color:"#a84a32"}:2==t?{color:"#32a860"}:a?{color:"#ad5834"}:{color:"inherit"};var i=r.a.createElement(Y,{title:r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,{color:"inherit",align:"center"},"More Information about the record"),r.a.createElement("ul",null,r.a.createElement("li",null,c),r.a.createElement("li",null,o),r.a.createElement("li",null,"Payment Program: "+e.paymentProgram),r.a.createElement("li",null,"Province Code: "+e.provinceCode),r.a.createElement("li",null,"Version Code: "+e.versionCode)))},r.a.createElement(I.a,{label:q.format(e.amountPaid),style:n,variant:"outlined"}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(z,{component:"th",scope:"row"},r.a.createElement("span",{style:n},e.serviceDate)),r.a.createElement(z,null,r.a.createElement("span",{style:n},e.accountingNumber)),r.a.createElement(z,null,r.a.createElement("span",{style:n},e.claimNumber)),r.a.createElement(z,null,r.a.createElement("span",{style:n},e.healthRegistrationNumber)),r.a.createElement(z,{align:"right"},r.a.createElement("span",{style:n},e.serviceCode)),r.a.createElement(z,null,r.a.createElement("span",{style:n},e.numberOfServices)),r.a.createElement(z,null,r.a.createElement("span",{style:n},q.format(e.amountSubmitted))),r.a.createElement(z,null,i))},console.log("INFO constructor() of raReport.jsx: ",e),t.state={hr45:e.data.report.hr45,order:"asc",orderby:"accountingNumber",csvData_1:k(e.data.report,q),csvData_2:(a=e.data.report,n=[],a.hr8&&(n.push(["Message Facility Record"]),a.hr8.forEach((function(e){e.messageText.startsWith("*")?n.push([" "]):n.push([e.messageText])}))),n)},t}return t=c,(a=[{key:"componentDidMount",value:function(){console.log("[INFO in componentDidMount() of jaReport.jsx is called.]")}},{key:"componentDidUpdate",value:function(e,t){this.props!==e&&console.log("[INFO componentDidUpdate() of raReport.jsx] is called with difference between this.props and prevProps")}},{key:"componentWillUnmount",value:function(){console.log("[INFO: accounting.jsx -> convertMROtoCSV.jsx -> raReport.jsx -> componentWillUnmount() window.location changed to] :",window.location," [from]: ",U.a[3]),window.location.pathname!=U.a[3]&&this.props.resetMROData()}},{key:"render",value:function(){var e=this,t=this.props.data,a=t.report,n=t.fileInfo,o=(this.props.classes,this.state),l=o.hr45,c=o.order,i=o.orderby;return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(m.a,{container:!0,space:1,style:{padding:"20px"}},r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PAYEE NAME:")," ",a.hr1.title,". ",a.hr1.initials," ",a.hr1.lastName)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"HEALTH CARE PROVIDER:")," ",a.hr1.healthCareProvider)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"GROUP NUMBER:")," ","0000"===a.hr1.groupNumber?"N/A":a.hr1.groupNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PAYMENT DATE:")," ",a.hr1.paymentDate)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PAYMENT METHOD:")," ","99999999"===a.hr1.chequeNumber?"Direct Deposit":0==a.hr1.chequeNumber.length?"Pay Patient":a.hr1.chequeNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"TOTAL AMOUNT:")," ",q.format(a.hr1.totalAmountPayable))),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"BILLING AGENT:")," ",a.hr2.addressLineOne)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"SOURCE FILE:")," ",n.fileName)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,a.hr3.addressLineTwo," ",a.hr3.addressLineThree)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement(B.CSVLink,{data:this.state.csvData_1,filename:n.fileName+"_1.csv"},"Download ",n.fileName+"_1.csv")," & ",r.a.createElement(B.CSVLink,{data:this.state.csvData_2,filename:n.fileName+"_2.csv"},n.fileName+"_2.csv")))),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(S.a,null,r.a.createElement(A.a,{size:"small","aria-label":"HR45"},r.a.createElement(P.a,null,r.a.createElement(w.a,null,J.map((function(t,a){return r.a.createElement(z,{title:t.labelDesc,key:a,sortDirection:i===t.id&&c},r.a.createElement(M.a,{onClick:e.onSortClick(t.id),active:i===t.id,direction:i===t.id?c:"asc"},t.label))})))),r.a.createElement(D.a,null,l.map((function(t,a){return r.a.createElement(W,{key:a},e.tableBody(t))})),r.a.createElement(W,null,r.a.createElement(z,{align:"right",colSpan:5},r.a.createElement("span",null,r.a.createElement("strong",null,"TOTAL"))),r.a.createElement(z,null,a.total.numberOfServices),r.a.createElement(z,null,q.format(a.total.amountSubmitted)),r.a.createElement(z,null,q.format(a.total.amountPaid))))))),a.hr6&&r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:12},a.hr6&&r.a.createElement(m.a,{container:!0,space:1,style:{padding:"20px"}},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,r.a.createElement("strong",null,"Balance Forward Record"))),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Amount Brought Forward  – Claims Adjustment: ",q.format(a.hr6.amtBrtFwdClaimsAdjustment))),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Amount Brought Forward  – Advances: ",q.format(a.hr6.amtBrtFwdClaimsAdvances))),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Amount Brought Forward  – Reductions: ",q.format(a.hr6.amtBrtFwdReductions))),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Amount Brought Forward  – Other Deductions: ",q.format(a.hr6.amtBrtFwdOtherDeductions))))),a.hr7&&r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:12},a.hr7&&r.a.createElement(m.a,{container:!0,space:1,style:{padding:"20px"}},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,r.a.createElement("strong",null,"Accounting Transaction Record"))),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Transaction Code[",a.hr7.txCodeOrg,"]: ",a.hr7.transactionCode)),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Transaction Date: ",a.hr7.transactionDate)),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Transaction Amount: ",q.format(a.hr7.transactionAmount))),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,"Transaction Message: ",a.hr7.transactionMessage)))),a.hr8&&r.a.createElement(m.a,{item:!0,xs:12}," "),a.hr8&&r.a.createElement(m.a,{item:!0,xs:12,style:{paddingLeft:"20px"}},r.a.createElement("span",null,r.a.createElement("strong",null,"Message Facility Record"))),r.a.createElement(m.a,{item:!0,xs:12},a.hr8&&r.a.createElement(m.a,{container:!0,space:1,style:{paddingLeft:"20px"}},a.hr8.map((function(e,t){return r.a.createElement(m.a,{item:!0,xs:12,key:t},r.a.createElement("span",null,e.messageText.startsWith("*")?r.a.createElement("br",null):e.messageText))})))))}}])&&L(t.prototype,a),n&&L(t,n),c}(r.a.Component),$=Object(o.a)((function(e){return{root:{textAlign:"left",padding:"10px"}}}))(Q);function K(e){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Z(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function ee(e,t){return(ee=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function te(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=ne(e);if(t){var r=ne(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return ae(this,a)}}function ae(e,t){return!t||"object"!==K(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ne(e){return(ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}Object(o.a)((function(e){return{tooltip:{backgroundColor:"#f5f5f9",color:"rgba(0, 0, 0, 0.87)",maxWidth:350,fontSize:e.typography.pxToRem(12),border:"1px solid #dadde9"}}}))(u.a);var re=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),oe=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ee(e,t)}(c,e);var t,a,n,o=te(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=o.call(this,e)).hx1Record=function(e){return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},"Group/Provider Header Record  (HX1)")),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"OPERATOR NUMBER:")," ","000000"==e.operatorNumber?"":e.operatorNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PROVIDER NUMBER:")," ",e.providerNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"STATION NUMBER:")," ","000000"==e.stationNumber?"":e.stationNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"GROUP NUMBER:")," ","0000"==e.groupNumber?"":e.groupNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"SPCIALITY CODE:")," ",e.speciality)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"CLAIM PROCESS DATE:")," ",e.claimProcessDate)))},t.hxhRecord=function(e){return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},"Claim Error Header 1 Record (HXH)")),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"HEALTH NUMBER:")," ",e.healthNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"VERSION CODE:")," ",e.versionCode)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PATIENT BIRTHDATE:")," ","1111/11/11"==e.patientBirthdate?"":e.patientBirthdate)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ACCOUNTING NUMBER:")," ",e.accountingNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PAYMENT PROGRAM:")," ",e.paymentProgram)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PAYEE:")," ",e.payee)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"REFERRING PROVIDER NUMBER:")," ",e.referringProviderNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"MASTER NUMBER:")," ",e.masterNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PAYTIENT ADMISSION DATE:")," ","1111/11/11"==e.patientAdmissionDate?"":e.patientAdmissionDate)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"REFERRING LAB LICENCE:")," ",e.referringLabLicence)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"SERVICE LOCATION INDICATOR:")," ",e.serviceLocationIndicator)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 1:")," ",e.errorCode1)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 2:")," ",e.errorCode2)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 3:")," ",e.errorCode3)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 4:")," ",e.errorCode4)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 5:")," ",e.errorCode5)))},t.hxtRecord=function(e){return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},"Claim Error Item Record (HXT)")),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"SERVICE CODE:")," ",e.serviceCode)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"FEE SUBMITTED:")," ",re.format(e.feeSubmitted))),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"NUMBER OF SERVICES:")," ",e.numberOfServices)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"SERVICE DATE:")," ",e.serviceDate)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"DIAGNOSTIC CODE:")," ",e.diagnosticCode)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"EXPLANATORY CODE:")," ",e.explanatoryCode)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 1:")," ",e.errorCode1)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 2:")," ",e.errorCode2)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 3:")," ",e.errorCode3)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 4:")," ",e.errorCode4)),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 5:")," ",e.errorCode5)))},t.hxrRecord=function(e){return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},"Claim Error Header 2 Record (HXR - RMB Claim)")),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"REGISTRATION NUMBER:")," ",e.registrationNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PATIENT LAST NAME:")," ",e.patientLastName)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PATIENT FIRST NAME:")," ",e.patientFirstName)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PATIENT SEX:")," ",e.patientSex)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PROVINCE CODE:")," ",e.provinceCode)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 1:")," ",e.errorCode1)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 2:")," ",e.errorCode2)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 3:")," ",e.errorCode3)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 4:")," ",e.errorCode4)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"ERROR CODE 5:")," ",e.errorCode5)))},t.hx8Record=function(e){return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},"Claim Error Explanation Code Message Record (HX8)")),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,r.a.createElement("strong",null,"CODE:")," ",e.explanatoryCode,", ",e.explanatoryDescription)))},t.hx9Record=function(e){return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},"Claim Error Trailer Record (HX9)")),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"Count of HXH Records:")," ",e.hxhCount)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"Count of HXR Records:")," ",e.hxrCount)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"Count of HXT Records:")," ",e.hxtCount)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"Count of HX8 Records:")," ",e.hx8Count)))},t.manifolder=function(e){switch(e.transactionIdentifier){case"HX1":return r.a.createElement(E.a,{style:{padding:"20px"}},t.hx1Record(e));case"HXH":return r.a.createElement(E.a,{style:{padding:"20px"}},t.hxhRecord(e));case"HXR":return r.a.createElement(E.a,{style:{padding:"20px"}},t.hxrRecord(e));case"HXT":return r.a.createElement(E.a,{style:{padding:"20px"}},t.hxtRecord(e));case"HX8":return r.a.createElement(E.a,{style:{padding:"20px"}},t.hx8Record(e));case"HX9":return r.a.createElement(E.a,{style:{padding:"20px"}},t.hx9Record(e));default:return}},console.log("INFO constructor() of claimErrorReport.jsx: ",e),t.state={},t}return t=c,(a=[{key:"componentDidMount",value:function(){console.log("[INFO in componentDidMount() of claimErrorReport.jsx is called.]")}},{key:"componentDidUpdate",value:function(e,t){this.props!==e&&console.log("[INFO componentDidUpdate() of claimErrorReport.jsx] is called with difference between this.props and prevProps")}},{key:"componentWillUnmount",value:function(){console.log("[INFO: accounting.jsx -> convertMROtoCSV.jsx -> claimErrorReport.jsx -> componentWillUnmount() window.location changed to] :",window.location," [from]: ",U.a[3]),window.location.pathname!=U.a[3]&&this.props.resetMROData()}},{key:"render",value:function(){var e=this,t=this.props.data,a=t.claimError;return t.fileInfo,this.props.classes,r.a.createElement(m.a,{container:!0,space:1},a.map((function(t,a){return r.a.createElement(r.a.Fragment,{key:a},r.a.createElement(m.a,{item:!0,xs:12},e.manifolder(t)),r.a.createElement(m.a,{item:!0,xs:12}," "))})),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",{style:{paddingLeft:"20px",fontSize:"12px",color:"grey"}},"The report is generated from ",this.props.data.fileInfo.fileName,".")))}}])&&Z(t.prototype,a),n&&Z(t,n),c}(r.a.Component),le=Object(o.a)((function(e){return{root:{textAlign:"left",padding:"10px"}}}))(oe);function ce(e){return(ce="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ie(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function se(e,t){return(se=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function me(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Ee(e);if(t){var r=Ee(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return ue(this,a)}}function ue(e,t){return!t||"object"!==ce(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function Ee(e){return(Ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}Object(o.a)((function(e){return{tooltip:{backgroundColor:"#f5f5f9",color:"rgba(0, 0, 0, 0.87)",maxWidth:350,fontSize:e.typography.pxToRem(12),border:"1px solid #dadde9"}}}))(u.a),new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"});var pe=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&se(e,t)}(c,e);var t,a,n,o=me(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=o.call(this,e)).hb1Record=function(e){return r.a.createElement(m.a,{container:!0,space:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},"Batch Edit Report Record")),r.a.createElement(m.a,{item:!0,xs:12}," "),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"BATCH NUMBER:")," ",e.batchNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"OPERATOR NUMBER:")," ","000000"==e.operatorNumber?"":e.operatorNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"BATCH CREATE DATE:")," ","1111/11/11"==e.batchCreateDate?"":e.batchCreateDate)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"BATCH PROCESS DATE:")," ","1111/11/11"==e.batchProcessDate?"":e.batchProcessDate)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"MICRO START:")," ",e.microStart)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"MICRO END:")," ",e.microEnd)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"MICRO TYPE:")," ",e.microType)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"GROUP NUMBER:")," ","0000"==e.groupNumber?"":e.groupNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"PROVIDER NUMBER:")," ","000000"==e.providerNumber?"":e.providerNumber)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"NUMBER OF CLAIMS:")," ",e.numberOfClaims)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"NUMBER OF RECORDS:")," ",e.numberOfRecords)),r.a.createElement(m.a,{item:!0,xs:6},r.a.createElement("span",null,r.a.createElement("strong",null,"BATCH SEQUENCE NUMBER:")," ","0000"==e.batchSequenceNumber?"":e.batchSequenceNumber)),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",null,r.a.createElement("strong",null,"EDIT MESSAGE:")," ",e.editMessage)))},console.log("INFO constructor() of batchEditReport.jsx: ",e),t.state={},t}return t=c,(a=[{key:"componentDidMount",value:function(){console.log("[INFO in componentDidMount() of claimErrorReport.jsx is called.]")}},{key:"componentDidUpdate",value:function(e,t){this.props!==e&&console.log("[INFO componentDidUpdate() of claimErrorReport.jsx] is called with difference between this.props and prevProps")}},{key:"componentWillUnmount",value:function(){console.log("[INFO: accounting.jsx -> convertMROtoCSV.jsx -> batchEditReport.jsx -> componentWillUnmount() window.location changed to] :",window.location," [from]: ",U.a[3]),window.location.pathname!=U.a[3]&&this.props.resetMROData()}},{key:"render",value:function(){var e=this,t=this.props.data,a=t.batchEdit;return t.fileInfo,this.props.classes,r.a.createElement(m.a,{container:!0,space:1},a.map((function(t,a){return r.a.createElement(r.a.Fragment,{key:a},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(E.a,{style:{padding:"20px"}},e.hb1Record(t))),r.a.createElement(m.a,{item:!0,xs:12}," "))})),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("span",{style:{paddingLeft:"20px",fontSize:"12px",color:"grey"}},"The report is generated from ",this.props.data.fileInfo.fileName,".")))}}])&&ie(t.prototype,a),n&&ie(t,n),c}(r.a.Component),fe=Object(o.a)((function(e){return{root:{textAlign:"left",padding:"10px"}}}))(pe),de=a(103);function he(e){return(he="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ge(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function ye(e,t){return(ye=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function be(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=xe(e);if(t){var r=xe(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Re(this,a)}}function Re(e,t){return!t||"object"!==he(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function xe(e){return(xe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var Ce=function(e){var t=e.location.pathname.split("/");return r.a.createElement(c.a,{"aria-label":"breadcrumb",maxItems:2},t.map((function(t,a){return 0==a?r.a.createElement(N.a,{key:a,component:"a",href:"/",label:"Home",icon:r.a.createElement(s.a,{fontSize:"small"})}):r.a.createElement(N.a,{key:a,component:"a",href:e.location.pathname.substring(0,e.location.pathname.indexOf(t)+t.length),label:t})})))},Oe=/(^[BEFPX]{1})+([ABCDEFGHIJKL]{1})+([0-9]{4,6})+(.\d{3})$/,ve=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ye(e,t)}(c,e);var t,a,n,o=be(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=o.call(this,e)).onChangeHandler=function(e){if(e.target.files[0]){var a=e.target.files[0].name;t.setState({isFileNameValid:Oe.test(a),isFileChosen:!0,isFileSizeValid:e.target.files[0].size<1e6,mroFile:e.target.files[0],returnStatus:0,returnMessage:""})}},t.onConvertButtonClick=function(){t.setState({converting:!0,returnStatus:0,returnMessage:""});var e=new FormData;e.append("mroFile",t.state.mroFile),Object(de.trackPromise)(t.props.convertMroToCSV(e))},t.state={isFileNameValid:!0,isFileSizeValid:!1,isFileChosen:!1,converting:!1,mroFile:null},t}return t=c,(a=[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,t){}},{key:"render",value:function(){var e=this;console.log("INFO: ConvertMROtoCSX.jsx.render() is called, this.props: ",this.props);var t=this.props,a=t.classes,n=t.rootReducer,o=null,c=null;if(n.convertFetched&&n.data.isItValid)switch(n.data.fileInfo.reportType){case"P":o=r.a.createElement($,{ref:function(t){return e.reportRef=t},data:n.data,resetMROData:this.props.resetMROData}),c="Remittance Advice Report";break;case"E":case"F":o=r.a.createElement(le,{ref:function(t){return e.reportRef=t},data:n.data,resetMROData:this.props.resetMROData}),c="Claim Error Report";break;case"B":o=r.a.createElement(fe,{ref:function(t){return e.reportRef=t},data:n.data,resetMROData:this.props.resetMROData}),c="Batch Edit Report"}return r.a.createElement("div",{className:a.root},r.a.createElement(m.a,{container:!0,spacing:1},r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(l.a,{variant:"h6"},null!=c?c:"Start converting OHIP Remittance Advice, Claim Error MRO files to Excel CSV!")),r.a.createElement(m.a,{item:!0,xs:10},r.a.createElement(Ce,this.props)),r.a.createElement(m.a,{item:!0,xs:2},c&&r.a.createElement(y.a,{documentTitle:n.data.fileInfo.fileName,trigger:function(){return r.a.createElement(u.a,{title:r.a.createElement("span",{style:{fontSize:"14px"}},"Click to print the current page")},r.a.createElement(O.a,{color:"primary","aria-label":"Print the report page",component:"span"},r.a.createElement(R.a,null)))},content:function(){return e.reportRef}}),c&&r.a.createElement(u.a,{title:r.a.createElement("span",{style:{fontSize:"14px"}},"Click to convert another file")},r.a.createElement(O.a,{color:"primary","aria-label":"Another MRO file conversion",component:"span",onClick:function(){e.props.resetMROData()}},r.a.createElement(C.a,null)))),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement("hr",null)),r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(f.a,{in:2==this.state.returnStatus},r.a.createElement(p.a,{severity:"error"},this.state.returnMessage," — check it out!"))),r.a.createElement(m.a,{item:!0,xs:12}," ",o," "),null==o&&r.a.createElement(m.a,{item:!0,xs:12},r.a.createElement(E.a,{variant:"outlined",className:a.paper},r.a.createElement(m.a,{container:!0,direction:"column",justify:"center",alignItems:"center",spacing:2},r.a.createElement(m.a,{item:!0},r.a.createElement(l.a,{style:{fontSize:"14px",fontWeight:"bold"},color:"primary",gutterBottom:!0},"Please choose a valid MRO file having a three digit extension.")),r.a.createElement(m.a,{item:!0},r.a.createElement("input",{type:"file",name:"file",pattern:".^[0-9]{3}",onChange:this.onChangeHandler,disabled:this.state.converting})),r.a.createElement(m.a,{item:!0},r.a.createElement(f.a,{in:!this.state.isFileNameValid&&this.state.isFileChosen},r.a.createElement(p.a,{severity:"error"},"The file name is not one expected — check it out!")),r.a.createElement(f.a,{in:!this.state.isFileSizeValid&&this.state.isFileChosen},r.a.createElement(p.a,{severity:"error"},"The file size is not supported — check it out!"))),r.a.createElement(m.a,{item:!0},r.a.createElement(d.a,{variant:"contained",color:"primary",disabled:this.state.converting||!(this.state.isFileChosen&&this.state.isFileNameValid&&this.state.isFileSizeValid),onClick:this.onConvertButtonClick},"Convert to Excel CSV")))))),!this.props.auth.isAuthenticated&&r.a.createElement(v.a,{to:{pathname:"/myAccount/login",search:"?prevPath="+this.props.location.pathname,state:{fromDashboard:!0}}}))}}])&&ge(t.prototype,a),n&&ge(t,n),c}(r.a.Component);t.default=Object(o.a)((function(e){return{rootOrg:{display:"flex",flexGrow:1,flexDirection:"row"},root:{textAlign:"left",padding:"10px"},link:{display:"flex"},breadcurmbIcon:{marginRight:e.spacing(.5),width:20,height:20},paper:{backgroundColor:"#fcfaf5",padding:"10px 25px 10px 25px"},buttonProgress:{color:h.a[500],position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}))(ve)}}]);