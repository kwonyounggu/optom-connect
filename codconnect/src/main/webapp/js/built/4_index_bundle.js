(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{298:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var a=r(5),n=r(8),i=r(296),o=Object(a.a)((function(e){return{root:{backgroundColor:e.palette.grey[100],height:e.spacing(3),color:e.palette.grey[800],fontWeight:e.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:e.palette.grey[300]},"&:active":{boxShadow:e.shadows[1],backgroundColor:Object(n.b)(e.palette.grey[300],.12)}}}}))(i.a)},300:function(e,t,r){"use strict";function a(e){e?localStorage.setItem("lang",e):localStorage.setItem("lang","kr")}r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return n}));var n="6Ld7JLYZAAAAAO_-4oa94JbgLHKBOIDeUZG3LYAI"},301:function(e,t,r){"use strict";var a=r(304),n=r(54);function i(e,t){return t.encode?t.strict?a(e):encodeURIComponent(e):e}t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){var r=function(e){var t;switch(e.arrayFormat){case"index":return function(e,r,a){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===a[e]&&(a[e]={}),a[e][t[1]]=r):a[e]=r};case"bracket":return function(e,r,a){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==a[e]?a[e]=[].concat(a[e],r):a[e]=[r]:a[e]=r};default:return function(e,t,r){void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}(t=n({arrayFormat:"none"},t)),a=Object.create(null);return"string"!=typeof e?a:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach((function(e){var t=e.replace(/\+/g," ").split("="),n=t.shift(),i=t.length>0?t.join("="):void 0;i=void 0===i?null:decodeURIComponent(i),r(decodeURIComponent(n),i,a)})),Object.keys(a).sort().reduce((function(e,t){var r=a[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((function(e,t){return Number(e)-Number(t)})).map((function(e){return t[e]})):t}(r):e[t]=r,e}),Object.create(null))):a},t.stringify=function(e,t){var r=function(e){switch(e.arrayFormat){case"index":return function(t,r,a){return null===r?[i(t,e),"[",a,"]"].join(""):[i(t,e),"[",i(a,e),"]=",i(r,e)].join("")};case"bracket":return function(t,r){return null===r?i(t,e):[i(t,e),"[]=",i(r,e)].join("")};default:return function(t,r){return null===r?i(t,e):[i(t,e),"=",i(r,e)].join("")}}}(t=n({encode:!0,strict:!0,arrayFormat:"none"},t));return e?Object.keys(e).sort().map((function(a){var n=e[a];if(void 0===n)return"";if(null===n)return i(a,t);if(Array.isArray(n)){var o=[];return n.slice().forEach((function(e){void 0!==e&&o.push(r(a,e,o.length))})),o.join("&")}return i(a,t)+"="+i(n,t)})).filter((function(e){return e.length>0})).join("&"):""}},304:function(e,t,r){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}},305:function(e,t,r){"use strict";r.d(t,"a",(function(){return Q}));var a=r(0),n=r.n(a),i=r(20),o=r(280),s=r(5),l=r(4),c=r(303),u=r.n(c),m=r(101),p=r.n(m);var d=r(300),f=(r(103),r(307)),h=r.n(f),y=r(295),b=r(293),g=r(291),v=r(284),E=r(292),x=r(524),w=r(286),C=r(361),k=r(285),O=r(73),S=r(102),P=r.n(S),j=r(40),R=r.n(j),T=r(39),A=r.n(T),N=r(499),q=r(298),B=r(104),L=r.n(B),_=r(533),I=r(510),H=r(525),D=r(100);function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function U(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function M(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function V(e,t){return(V=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,a=$(e);if(t){var n=$(this).constructor;r=Reflect.construct(a,arguments,n)}else r=a.apply(this,arguments);return J(this,r)}}function J(e,t){return!t||"object"!==F(t)&&"function"!=typeof t?Y(e):t}function Y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function $(e){return($=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var G=Object(o.a)((function(e){return{stepper:{backgroundColor:"inherit"}}})),W=function(e){var t=e.location.pathname.split("/");return n.a.createElement(N.a,{"aria-label":"breadcrumb",maxItems:2},t.map((function(t,r){return 0==r?n.a.createElement(q.a,{key:r,component:"a",href:"/",label:"Home",icon:n.a.createElement(P.a,{fontSize:"small"})}):n.a.createElement(q.a,{key:r,component:"a",href:e.location.pathname.substring(0,e.location.pathname.indexOf(t)+t.length),label:t})})))},Z=[{value:"BC",label:"British Columbia",providerDesc:"MSP Practitioner/Billing Number",placeholder:"Five digits required"},{value:"ON",label:"Ontario",providerDesc:"OHIP Provider/Billing Number",placeholder:"Six digits required"}],K=["SignUp","Confirm Link In Email","Login"],Q=function(e){var t=G();return n.a.createElement(_.a,{alternativeLabel:!0,nonLinear:!0,activeStep:e.activeStep,className:t.stepper},e.steps.map((function(e){return n.a.createElement(I.a,{key:e},n.a.createElement(H.a,null,e))})))},X=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&V(e,t)}(s,e);var t,r,a,o=z(s);function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=o.call(this,e)).state={province:"ON",providerNumber:"",careProviderNumberLabel:Z[1].providerDesc,careProviderNumberPlaceholder:Z[1].placeholder,email:"",password:"",passwordConfirmation:"",errors:{},isLoading:!1,invalid:!1,isHuman:!1,showTermsCondition:!1,agreeTermsCondition:!1},t.onChange=t.onChange.bind(Y(t)),t.onSubmit=t.onSubmit.bind(Y(t)),t.isValid=t.isValid.bind(Y(t)),t.callbackBot=t.callbackBot.bind(Y(t)),t.verifyCallbackBot=t.verifyCallbackBot.bind(Y(t)),t.expiredCallbackBot=t.expiredCallbackBot.bind(Y(t)),t}return t=s,(r=[{key:"callbackBot",value:function(){this.setState({isHuman:!1})}},{key:"verifyCallbackBot",value:function(e){this.setState({isHuman:!0})}},{key:"expiredCallbackBot",value:function(){this.setState({isHuman:!1})}},{key:"onChange",value:function(e){var t;"province"===e.target.name?this.setState((U(t={},e.target.name,e.target.value),U(t,"careProviderNumberLabel",e.target.options[e.target.selectedIndex].getAttribute("providerdesc")),U(t,"careProviderNumberPlaceholder",e.target.options[e.target.selectedIndex].getAttribute("placeholder")),t)):this.setState(U({},e.target.name,e.target.value))}},{key:"isValid",value:function(){var e=function(e){var t={};return u.a.isEmpty(e.email)?t.email="This field is required":u.a.isEmail(e.email)||(t.email="Email is invalid"),u.a.isEmpty(e.password)?t.password="This field is required":u.a.isByteLength(e.password,{min:6,max:30})||(t.password="This password length requires between 6 and 30"),u.a.isEmpty(e.passwordConfirmation)?t.passwordConfirmation="This field is required":u.a.equals(e.password,e.passwordConfirmation)||(t.passwordConfirmation="Passwords must match"),u.a.isEmpty(e.providerNumber)?t.providerNumber="This field is required":u.a.equals(e.province,"BC")?5!=e.providerNumber.length?t.providerNumber="Five digits required":u.a.isNumeric(e.providerNumber)||(t.providerNumber="Only numbers are valid"):u.a.equals(e.province,"ON")&&(6!=e.providerNumber.length?t.providerNumber="Six digits required":u.a.isNumeric(e.providerNumber)||(t.providerNumber="Only numbers are valid")),e.agreeTermsCondition||(t.agreeTermsCondition="You have to agree to the Terms and Conditions"),e.isHuman||(t.isHuman="This field is required"),{errors:t,isValid:p()(t)}}(this.state),t=e.errors,r=e.isValid;return r||this.setState({errors:t}),console.log(t),r}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),console.log("---INFO (onSubmit() of signupForm.jsx) is called---, ",this.state),this.state.showTermsCondition&&this.setState({showTermsCondition:!1}),this.isValid()&&(window.scrollTo(0,0),this.setState({errors:{},isLoading:!0}),Object(D.trackPromise)(this.props.userSignupRequest({email:this.state.email,password:this.state.password,providerNumber:this.state.providerNumber,province:this.state.province,errors:{}}).then((function(e){t.setState({isLoading:!1}),e.data.invalid?t.setState({errors:e.data.errors}):(t.props.addAlertMessage({turnOn:!0,type:"success",level:2,text:"Thanks for sining up. Please check your email for confirmation!!"}),t.props.history.push("/myAccount/login"))})).catch((function(e){console.log("[INFO in catch error of Submit() in signupForm.jsx]: ",e),t.setState({isLoading:!1,errors:{overall:e}})}))))}},{key:"render",value:function(){var e=this;console.log("[render() of signupForm.jsx] this.props: ",this.props);var t=this.props.classes;return n.a.createElement(g.a,{container:!0,spacing:1},n.a.createElement(g.a,{item:!0,xs:12},n.a.createElement(v.a,{variant:"h6"},"SIGNUP")),n.a.createElement(g.a,{item:!0,xs:10},n.a.createElement(W,this.props)),n.a.createElement(g.a,{item:!0,xs:12},n.a.createElement("hr",null)),n.a.createElement(g.a,{item:!0,xs:12},n.a.createElement(w.a,{variant:"outlined",className:t.paper},n.a.createElement(g.a,{container:!0},n.a.createElement(g.a,{item:!0,xs:12}," "),n.a.createElement(g.a,{item:!0,xs:12,style:{textAlign:"center"}},n.a.createElement(v.a,{variant:"h6"},"Create your account using your email and provider/billing number given from your province"),n.a.createElement(v.a,{variant:"subtitle2",align:"center",color:"primary"},"This is only allowed for the Doctors of Ophometry (OD) in Canada."),n.a.createElement("br",null),n.a.createElement(v.a,{variant:"subtitle2",align:"center",color:"textSecondary"},n.a.createElement("span",{style:{color:"red"}},"*")," This field is required")),n.a.createElement(g.a,{item:!0,xs:12},n.a.createElement(Q,{activeStep:0,steps:K})),n.a.createElement(g.a,{item:!0,xs:12,style:{paddingLeft:"10%",paddingRight:"10%"}},n.a.createElement(k.a,{in:this.state.errors.hasOwnProperty("overall")},n.a.createElement(C.a,{severity:"error"},this.state.errors.overall," — check it out!"))),n.a.createElement(g.a,{item:!0,xs:12}," "),n.a.createElement(g.a,{item:!0,xs:3,style:{textAlign:"right"}},n.a.createElement("strong",null,"Email")," ",n.a.createElement("span",{style:{color:"red"}},"*")," : "),n.a.createElement(g.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement("input",{name:"email",type:"email",value:this.state.email,onChange:this.onChange,placeholder:"email@example.com",style:{padding:"5px",width:"70%"}})),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement(k.a,{in:this.state.errors.hasOwnProperty("email")},n.a.createElement(C.a,{severity:"error",style:{width:"70%"}},this.state.errors.email," — check it out!"))),n.a.createElement(g.a,{item:!0,xs:3,style:{textAlign:"right"}},n.a.createElement("strong",null,"Password")," ",n.a.createElement("span",{style:{color:"red"}},"*")," : "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement("input",{name:"password",type:"password",value:this.state.password,onChange:this.onChange,placeholder:"Requires at least six in length",style:{padding:"5px",width:"70%"}})),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement(k.a,{in:this.state.errors.hasOwnProperty("password")},n.a.createElement(C.a,{severity:"error",style:{width:"70%"}},this.state.errors.password," — check it out!"))),n.a.createElement(g.a,{item:!0,xs:3,style:{textAlign:"right"}},n.a.createElement("strong",null,"Confirm Password")," ",n.a.createElement("span",{style:{color:"red"}},"*")," : "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement("input",{name:"passwordConfirmation",type:"password",value:this.state.passwordConfirmation,onChange:this.onChange,placeholder:"Requires the same password as above",style:{padding:"5px",width:"70%"}})),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement(k.a,{in:this.state.errors.hasOwnProperty("passwordConfirmation")},n.a.createElement(C.a,{severity:"error",style:{width:"70%"}},this.state.errors.passwordConfirmation," — check it out!"))),n.a.createElement(g.a,{item:!0,xs:12}," "),n.a.createElement(g.a,{item:!0,xs:3,style:{textAlign:"right"}},n.a.createElement("strong",null,"Province")," ",n.a.createElement("span",{style:{color:"red"}},"*")," : "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement(b.a,{name:"province",value:this.state.province||"",onChange:this.onChange,native:!0,className:t.select,variant:"outlined",input:n.a.createElement(y.a,{classes:{input:t.selectInput}})},Z.map((function(e,t){return n.a.createElement("option",{key:t,value:e.value,providerdesc:e.providerDesc,placeholder:e.placeholder},e.label)})))),n.a.createElement(g.a,{item:!0,xs:12}," "),n.a.createElement(g.a,{item:!0,xs:3,style:{textAlign:"right"}},n.a.createElement("strong",null,this.state.careProviderNumberLabel)," ",n.a.createElement("span",{style:{color:"red"}},"*")," : "),n.a.createElement(g.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement("input",{name:"providerNumber",type:"text",value:this.state.providerNumber,onChange:this.onChange,placeholder:this.state.careProviderNumberPlaceholder,style:{padding:"5px",width:"70%"}})),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement(k.a,{in:this.state.errors.hasOwnProperty("providerNumber")},n.a.createElement(C.a,{severity:"error",style:{width:"70%"}},this.state.errors.providerNumber," — check it out!"))),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement(x.a,{color:"primary",checked:this.state.agreeTermsCondition,onChange:function(){return e.setState((function(e){return{agreeTermsCondition:!e.agreeTermsCondition}}))}})," ",n.a.createElement("span",null,"I agree to the"),n.a.createElement(E.a,{color:"primary",onClick:function(){return e.setState((function(e){return{showTermsCondition:!e.showTermsCondition}}))},endIcon:this.state.showTermsCondition?n.a.createElement(A.a,null):n.a.createElement(R.a,null)},"Terms and Conditions")),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement(k.a,{in:this.state.errors.hasOwnProperty("agreeTermsCondition")},n.a.createElement(C.a,{severity:"error",style:{width:"70%"}},this.state.errors.agreeTermsCondition," — check it out!"))),n.a.createElement(g.a,{item:!0,xs:12,style:{paddingLeft:"5%",paddingRight:"5%"}},n.a.createElement(k.a,{in:this.state.showTermsCondition},n.a.createElement("div",{dangerouslySetInnerHTML:{__html:L.a},style:{padding:"10px",borderRadius:"3px",border:"1px solid #DCDCDC"}}))),n.a.createElement(g.a,{item:!0,xs:12}," "),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement(h.a,{sitekey:d.b,render:"explicit",verifyCallback:this.verifyCallbackBot,onloadCallback:this.callbackBot,expiredCallback:this.expiredCallbackBot,size:"compact"})),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9},n.a.createElement(k.a,{in:this.state.errors.hasOwnProperty("isHuman")},n.a.createElement(C.a,{severity:"error",style:{width:"70%"}},this.state.errors.isHuman," — check it out!"))),n.a.createElement(g.a,{item:!0,xs:12}," "),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement(E.a,{variant:"outlined",color:"primary",disabled:this.state.isLoading,onClick:this.onSubmit},"Sign Up")),n.a.createElement(g.a,{item:!0,xs:12}," "),n.a.createElement(g.a,{item:!0,xs:3}," "),n.a.createElement(g.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement(E.a,{size:"small",color:"primary",component:i.b,to:"/myAccount/login"},"Already have an account? Login here"))))))}}])&&M(t.prototype,r),a&&M(t,a),s}(n.a.Component);X.propTypes={classes:l.PropTypes.object.isRequired,userSignupRequest:l.PropTypes.func.isRequired,addAlertMessage:l.PropTypes.func.isRequired,isUserExists:l.PropTypes.func.isRequired,setCurrentUser:l.PropTypes.func.isRequired};t.b=Object(s.a)((function(e){return{paper:{backgroundColor:"#fcfaf5",padding:"10px 25px 10px 25px"},buttonProgress:{color:O.a[500],position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},select:{borderRadius:"0px",paddingTop:"3px",paddingBottom:"3px",width:"40%",fontSize:"13px"},selectInput:{padding:"2px 5px"}}}))(X)},528:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),i=r(291),o=r(361),s=r(418),l=r(20),c=r(5),u=r(284),m=r(292),p=r(286),d=r(285),f=r(100),h=r(4),y=(r(301),r(303)),b=r.n(y),g=r(101),v=r.n(g),E=r(300),x=r(307),w=r.n(x),C=r(102),k=r.n(C),O=r(499),S=r(298),P=r(305);function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function R(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,a=B(e);if(t){var n=B(this).constructor;r=Reflect.construct(a,arguments,n)}else r=a.apply(this,arguments);return N(this,r)}}function N(e,t){return!t||"object"!==j(t)&&"function"!=typeof t?q(e):t}function q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var L=function(e){var t=e.location.pathname.split("/");return n.a.createElement(O.a,{"aria-label":"breadcrumb",maxItems:2},t.map((function(t,r){return 0==r?n.a.createElement(S.a,{key:r,component:"a",href:"/",label:"Home",icon:n.a.createElement(k.a,{fontSize:"small"})}):n.a.createElement(S.a,{key:r,component:"a",href:e.location.pathname.substring(0,e.location.pathname.indexOf(t)+t.length),label:t})})))},_=["Submit ForgotPassword","Activate Link In Email","Reset"],I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(c,e);var t,r,a,s=A(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=s.call(this,e)).state={email:"",errors:{},isLoading:!1,invalid:!1,isHuman:!1},t.onChange=t.onChange.bind(q(t)),t.onSubmit=t.onSubmit.bind(q(t)),t.isValid=t.isValid.bind(q(t)),t.callbackBot=t.callbackBot.bind(q(t)),t.verifyCallbackBot=t.verifyCallbackBot.bind(q(t)),t.expiredCallbackBot=t.expiredCallbackBot.bind(q(t)),t}return t=c,(r=[{key:"callbackBot",value:function(){this.setState({isHuman:!1})}},{key:"verifyCallbackBot",value:function(e){this.setState({isHuman:!0})}},{key:"expiredCallbackBot",value:function(){this.setState({isHuman:!1})}},{key:"onChange",value:function(e){var t,r,a;this.setState((t={},r=e.target.name,a=e.target.value,r in t?Object.defineProperty(t,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[r]=a,t))}},{key:"isValid",value:function(){var e={};b.a.isEmpty(this.state.email)?e.email="This field is required.":b.a.isEmail(this.state.email)||(e.email="Email is invalid."),this.state.isHuman||(e.isHuman="This field is required.");var t=v()(e);return t||this.setState({errors:e}),t}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),console.log("---INFO (onSubmit() of forgotPasswordForm.jsx) is called---, ",this.state),this.isValid()&&(this.setState({errors:{},isLoading:!0}),Object(f.trackPromise)(this.props.forgotPasswordRequest({email:this.state.email,errors:{}}).then((function(e){console.log("successful, the response object=",e),t.setState({isLoading:!1}),e.data.invalid?t.setState({errors:e.data.errors}):(t.props.addAlertMessage({turnOn:!0,type:"success",level:2,text:"Please check your email for the password reset link!!"}),t.props.history.push("/myAccount/login"))})).catch((function(e){console.log("[INFO in catch error of Submit() in forgotpaswordForm.jsx]: ",e),t.setState({isLoading:!1,errors:{overall:e}})}))))}},{key:"render",value:function(){var e=this.props.classes;return n.a.createElement(i.a,{container:!0,spacing:1},n.a.createElement(i.a,{item:!0,xs:12},n.a.createElement(u.a,{variant:"h6"},"FORGOT PASSWORD")),n.a.createElement(i.a,{item:!0,xs:10},n.a.createElement(L,this.props)),n.a.createElement(i.a,{item:!0,xs:12},n.a.createElement("hr",null)),n.a.createElement(i.a,{item:!0,xs:12},n.a.createElement(p.a,{variant:"outlined",className:e.paper},n.a.createElement(i.a,{container:!0},n.a.createElement(i.a,{item:!0,xs:12}," "),n.a.createElement(i.a,{item:!0,xs:12,style:{textAlign:"center"}},n.a.createElement(u.a,{variant:"h6"},"Enter your email, then we'll email you a password reset link.")),n.a.createElement(i.a,{item:!0,xs:12},n.a.createElement(P.a,{activeStep:0,steps:_})),n.a.createElement(i.a,{item:!0,xs:12,style:{paddingLeft:"10%",paddingRight:"10%"}},n.a.createElement(d.a,{in:this.state.errors.hasOwnProperty("overall")},n.a.createElement(o.a,{severity:"error"},this.state.errors.overall," — check it out!"))),n.a.createElement(i.a,{item:!0,xs:12}," "),n.a.createElement(i.a,{item:!0,xs:3,style:{textAlign:"right"}},n.a.createElement("strong",null,"Email")," : "),n.a.createElement(i.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement("input",{name:"email",type:"email",value:this.state.email,onChange:this.onChange,placeholder:"email@example.com",style:{padding:"5px",width:"70%"}})),n.a.createElement(i.a,{item:!0,xs:3}," "),n.a.createElement(i.a,{item:!0,xs:9},n.a.createElement(d.a,{in:this.state.errors.hasOwnProperty("email")},n.a.createElement(o.a,{severity:"error",style:{width:"70%"}},this.state.errors.email," — check it out!"))),n.a.createElement(i.a,{item:!0,xs:12}," "),n.a.createElement(i.a,{item:!0,xs:3}," "),n.a.createElement(i.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement(w.a,{sitekey:E.b,render:"explicit",verifyCallback:this.verifyCallbackBot,onloadCallback:this.callbackBot,expiredCallback:this.expiredCallbackBot,size:"compact"})),n.a.createElement(i.a,{item:!0,xs:3}," "),n.a.createElement(i.a,{item:!0,xs:9},n.a.createElement(d.a,{in:this.state.errors.hasOwnProperty("isHuman")},n.a.createElement(o.a,{severity:"error",style:{width:"70%"}},this.state.errors.isHuman," — check it out!"))),n.a.createElement(i.a,{item:!0,xs:12}," "),n.a.createElement(i.a,{item:!0,xs:3}," "),n.a.createElement(i.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement(m.a,{variant:"outlined",color:"primary",disabled:this.state.isLoading,onClick:this.onSubmit},"Submit")),n.a.createElement(i.a,{item:!0,xs:12}," "),n.a.createElement(i.a,{item:!0,xs:3}," "),n.a.createElement(i.a,{item:!0,xs:9,style:{textAlign:"left"}},n.a.createElement(m.a,{size:"small",color:"primary",component:l.b,to:"/myAccount/login"}," Back to Login? "))))))}}])&&R(t.prototype,r),a&&R(t,a),c}(n.a.Component);I.propTypes={forgotPasswordRequest:h.PropTypes.func.isRequired,addAlertMessage:h.PropTypes.func.isRequired};var H=Object(c.a)((function(e){return{paper:{backgroundColor:"#fcfaf5",padding:"10px 25px 10px 25px"}}}))(I),D=r(60),F=r(34),U=r.n(F);var M=r(30);function V(e){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function z(){return(z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function J(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function Y(e,t){return(Y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,a=W(e);if(t){var n=W(this).constructor;r=Reflect.construct(a,arguments,n)}else r=a.apply(this,arguments);return G(this,r)}}function G(e,t){return!t||"object"!==V(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function W(e){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var Z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Y(e,t)}(c,e);var t,r,a,l=$(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),t=l.call(this,e),console.log("INFO (constructor() of forgotPassword.jsx"),t}return t=c,(r=[{key:"render",value:function(){return n.a.createElement(i.a,{container:!0},n.a.createElement(i.a,{item:!0,xs:12},this.props.auth.isAuthenticated?n.a.createElement(o.a,{severity:"warning"},n.a.createElement(s.a,null,"Ooops! You forgot to logout first, please try again after.")):n.a.createElement(H,z({forgotPasswordRequest:this.props.forgotPasswordRequest,addAlertMessage:this.props.addAlertMessage},this.props))))}}])&&J(t.prototype,r),a&&J(t,a),c}(n.a.Component);Z.propTypes={forgotPasswordRequest:h.PropTypes.func.isRequired,addAlertMessage:h.PropTypes.func.isRequired,auth:h.PropTypes.object.isRequired};t.default=Object(D.b)((function(e){return{auth:e.authReducer}}),{forgotPasswordRequest:function(e){return function(t){return U.a.post("jsp/api/users/forgotPassword.jsp",e)}},addAlertMessage:M.a})(Z)}}]);