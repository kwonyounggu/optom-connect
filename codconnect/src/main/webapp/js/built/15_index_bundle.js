(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{302:function(e,t,n){"use strict";function r(e){e?localStorage.setItem("lang",e):localStorage.setItem("lang","kr")}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var o="6LeFlGAaAAAAAA8dqccJIG-ocDuubz7ss3-kQKaK"},326:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"e",(function(){return c})),n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return s}));var r=n(36),o=n.n(r),a=n(19);n(302);function i(e){return{type:a.a.CONVERT_MRO_FILE,payload:o.a.post("upload",e)}}function c(){return{type:a.a.RESET_MRO_DATA}}function u(){return{type:a.a.RESET_CLAIM_FILE_DATA}}function l(){return{type:a.a.GET_BILLING_CODES,payload:o.a.post("jsp/api/ohip/getBillingCodes.jsp",{})}}function s(e){return{type:a.a.GET_CLAIM_FILE,payload:o.a.post("jsp/api/ohip/getClaimFile.jsp",e)}}},513:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(4),i=n.n(a),c=n(15),u=n(5),l=n(61),s=n(326),p=n(30);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return b(this,n)}}function b(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var E=o.a.lazy((function(){return Promise.all([n.e(3),n.e(11),n.e(18)]).then(n.bind(null,503))})),v=o.a.lazy((function(){return Promise.all([n.e(3),n.e(12),n.e(19)]).then(n.bind(null,504))})),R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(i,e);var t,n,r,a=g(i);function i(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),a.call(this,e)}return t=i,(n=[{key:"componentWillUnmount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return console.log("INFO: Accounting.render() is called, this.props: ",this.props),o.a.createElement("div",null,o.a.createElement(c.d,null,o.a.createElement(c.b,{exact:!0,path:"/accounting"},o.a.createElement("h3",null,"show avaliable links for accouting sections")),o.a.createElement(c.b,{exact:!0,path:"/accounting/ohip"},o.a.createElement("h3",null,"provide what ohip section is providing")),o.a.createElement(c.b,{path:"/accounting/ohip/billing",component:function(t){return o.a.createElement(v,d({},t,{auth:e.props.auth,rootReducer:e.props.rootReducer,getBillingCodes:e.props.getBillingCodes,addAlertMessage:e.props.addAlertMessage,getClaimFile:e.props.getClaimFile,resetClaimFileData:e.props.resetClaimFileData}))}}),o.a.createElement(c.b,{path:"/accounting/ohip/convert",component:function(t){return o.a.createElement(E,d({},t,{auth:e.props.auth,rootReducer:e.props.rootReducer,convertMroToCSV:e.props.convertMroToCSV,addAlertMessage:e.props.addAlertMessage,resetMROData:e.props.resetMROData}))}}),o.a.createElement(c.b,{path:"/accounting/ohip/myrecord"},o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))),o.a.createElement(c.b,{exact:!0,path:"/accounting/nonohip"},o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))),o.a.createElement(c.b,{path:"/accounting/non-ohip/billing"},o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))),o.a.createElement(c.b,{path:"/accounting/non-ohip/myrecord",component:function(e){return o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))}})))}}])&&h(t.prototype,n),r&&h(t,r),i}(o.a.Component);R.propTypes={classes:i.a.object.isRequired,convertMroToCSV:i.a.func.isRequired,resetMROData:i.a.func.isRequired,resetClaimFileData:i.a.func.isRequired,getBillingCodes:i.a.func.isRequired,getClaimFile:i.a.func.isRequired,addAlertMessage:i.a.func.isRequired},t.default=Object(l.b)((function(e){return{auth:e.authReducer,rootReducer:e.rootReducer}}),{convertMroToCSV:s.a,addAlertMessage:p.a,resetMROData:s.e,resetClaimFileData:s.d,getBillingCodes:s.b,getClaimFile:s.c})(Object(u.a)((function(e){return{root:{display:"flex",flexGrow:1,flexDirection:"row"},gridPanel:{padding:8,border:"0px solid red",borderRadius:"8px"},toolbar:e.mixins.toolbar}}))(R))}}]);