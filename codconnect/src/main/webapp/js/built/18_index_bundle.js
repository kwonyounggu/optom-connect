(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{300:function(e,t,n){"use strict";function r(e){e?localStorage.setItem("lang",e):localStorage.setItem("lang","kr")}n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var o="6Ld7JLYZAAAAAO_-4oa94JbgLHKBOIDeUZG3LYAI"},530:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(4),i=n.n(a),c=n(14),l=n(5),u=n(60),s=n(34),p=n.n(s),f=n(17);n(300);var d=n(30);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var o=v(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return E(this,n)}}function E(e,t){return!t||"object"!==h(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var R=o.a.lazy((function(){return Promise.all([n.e(3),n.e(11),n.e(16)]).then(n.bind(null,523))})),O=o.a.lazy((function(){return Promise.all([n.e(3),n.e(12),n.e(17)]).then(n.bind(null,529))})),C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(i,e);var t,n,r,a=b(i);function i(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),a.call(this,e)}return t=i,(n=[{key:"componentWillUnmount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return console.log("INFO: Accounting.render() is called, this.props: ",this.props),o.a.createElement("div",null,o.a.createElement(c.d,null,o.a.createElement(c.b,{exact:!0,path:"/accounting"},o.a.createElement("h3",null,"show avaliable links for accouting sections")),o.a.createElement(c.b,{exact:!0,path:"/accounting/ohip"},o.a.createElement("h3",null,"provide what ohip section is providing")),o.a.createElement(c.b,{path:"/accounting/ohip/billing",component:function(t){return o.a.createElement(O,m({},t,{auth:e.props.auth,rootReducer:e.props.rootReducer,getBillingCodes:e.props.getBillingCodes,addAlertMessage:e.props.addAlertMessage,getClaimFile:e.props.getClaimFile,resetClaimFileData:e.props.resetClaimFileData}))}}),o.a.createElement(c.b,{path:"/accounting/ohip/convert",component:function(t){return o.a.createElement(R,m({},t,{auth:e.props.auth,rootReducer:e.props.rootReducer,convertMroToCSV:e.props.convertMroToCSV,addAlertMessage:e.props.addAlertMessage,resetMROData:e.props.resetMROData}))}}),o.a.createElement(c.b,{path:"/accounting/ohip/myrecord"},o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))),o.a.createElement(c.b,{exact:!0,path:"/accounting/nonohip"},o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))),o.a.createElement(c.b,{path:"/accounting/non-ohip/billing"},o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))),o.a.createElement(c.b,{path:"/accounting/non-ohip/myrecord",component:function(e){return o.a.createElement("div",{style:{width:"100%",height:"100%",margin:"20% auto"}},o.a.createElement("h1",null,o.a.createElement("p",null,"This page is under construction. Please come back soon!")))}})))}}])&&g(t.prototype,n),r&&g(t,r),i}(o.a.Component);C.propTypes={classes:i.a.object.isRequired,convertMroToCSV:i.a.func.isRequired,resetMROData:i.a.func.isRequired,resetClaimFileData:i.a.func.isRequired,getBillingCodes:i.a.func.isRequired,getClaimFile:i.a.func.isRequired,addAlertMessage:i.a.func.isRequired};t.default=Object(u.b)((function(e){return{auth:e.authReducer,rootReducer:e.rootReducer}}),{convertMroToCSV:function(e){return{type:f.a.CONVERT_MRO_FILE,payload:p.a.post("upload",e)}},addAlertMessage:d.a,resetMROData:function(){return{type:f.a.RESET_MRO_DATA}},resetClaimFileData:function(){return{type:f.a.RESET_CLAIM_FILE_DATA}},getBillingCodes:function(){return{type:f.a.GET_BILLING_CODES,payload:p.a.post("jsp/api/ohip/getBillingCodes.jsp",{})}},getClaimFile:function(e){return{type:f.a.GET_CLAIM_FILE,payload:p.a.post("jsp/api/ohip/getClaimFile.jsp",e)}}})(Object(l.a)((function(e){return{root:{display:"flex",flexGrow:1,flexDirection:"row"},gridPanel:{padding:8,border:"0px solid red",borderRadius:"8px"},toolbar:e.mixins.toolbar}}))(C))}}]);