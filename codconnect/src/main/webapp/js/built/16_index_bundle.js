(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{314:function(e,t,r){"use strict";function n(e){e?localStorage.setItem("lang",e):localStorage.setItem("lang","kr")}r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return o}));var o="6LeFlGAaAAAAAA8dqccJIG-ocDuubz7ss3-kQKaK"},337:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"e",(function(){return u})),r.d(t,"d",(function(){return l})),r.d(t,"b",(function(){return c})),r.d(t,"c",(function(){return f}));var n=r(37),o=r.n(n),a=r(19);r(314);function i(e){return{type:a.a.CONVERT_MRO_FILE,payload:o.a.post("upload",e)}}function u(){return{type:a.a.RESET_MRO_DATA}}function l(){return{type:a.a.RESET_CLAIM_FILE_DATA}}function c(){return{type:a.a.GET_BILLING_CODES,payload:o.a.post("jsp/api/ohip/getBillingCodes.jsp",{})}}function f(e){return{type:a.a.GET_CLAIM_FILE,payload:o.a.post("jsp/api/ohip/getClaimFile.jsp",e)}}},541:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),a=r(4),i=r.n(a),u=r(15),l=r(5),c=r(63),f=r(337),s=r(31);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=h(e);if(t){var o=h(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return m(this,r)}}function m(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(i,e);var t,r,n,a=y(i);function i(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),a.call(this,e)}return t=i,(r=[{key:"componentWillUnmount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return console.log("INFO: Referrals.render() is called, this.props: ",this.props),o.a.createElement("div",null,o.a.createElement(u.d,null,o.a.createElement(u.b,{exact:!0,path:"/referrals"},o.a.createElement("h3",null,"show avaliable links for referrals sections")),o.a.createElement(u.b,{exact:!0,path:"/referrals/patient_referral_form"},o.a.createElement("h3",null,"patient-refferals-form")),o.a.createElement(u.b,{exact:!0,path:"/referrals/ocular_exam_report"},o.a.createElement("h3",null,"ocular-exam-report")),o.a.createElement(u.b,{exact:!0,path:"/referrals/blind_low_vision_referral_form"},o.a.createElement("h3",null,"blind-low-vision-refferal-form")),o.a.createElement(u.b,{exact:!0,path:"/referrals/blind_low_vision_early_report"},o.a.createElement("h3",null,"blind-low-vision-early-report"))))}}])&&d(t.prototype,r),n&&d(t,n),i}(o.a.Component);_.propTypes={classes:i.a.object.isRequired,convertMroToCSV:i.a.func.isRequired,resetMROData:i.a.func.isRequired,resetClaimFileData:i.a.func.isRequired,getBillingCodes:i.a.func.isRequired,getClaimFile:i.a.func.isRequired,addAlertMessage:i.a.func.isRequired},t.default=Object(c.b)((function(e){return{auth:e.authReducer,rootReducer:e.rootReducer}}),{convertMroToCSV:f.a,addAlertMessage:s.a,resetMROData:f.e,resetClaimFileData:f.d,getBillingCodes:f.b,getClaimFile:f.c})(Object(l.a)((function(e){return{root:{display:"flex",flexGrow:1,flexDirection:"row"},gridPanel:{padding:8,border:"0px solid red",borderRadius:"8px"},toolbar:e.mixins.toolbar}}))(_))}}]);