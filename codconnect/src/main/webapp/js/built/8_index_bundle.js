(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{545:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),u=n(15),a=n(63),s=n(4),c=n(316),i=n.n(c),p=(n(318),n(365),n(104),n(31));function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=b(t);if(e){var o=b(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return h(this,n)}}function h(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(s,t);var e,n,r,a=d(s);function s(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,s),a.call(this,t)}return e=s,(n=[{key:"render",value:function(){var t=i.a.parse(this.props.location.search);if(null!=t.status){if(3==parseInt(t.status))return this.props.addAlertMessage({turnOn:!0,type:"error",level:2,text:"Oops there is no record with the given! please signup again."}),o.a.createElement("div",null,o.a.createElement(u.a,{to:"/myAccount/signup"}));2==parseInt(t.status)?this.props.addAlertMessage({turnOn:!0,type:"success",level:2,text:"You have successfully activated your account on the system!"}):1==parseInt(t.status)?this.props.addAlertMessage({turnOn:!0,type:"success",level:2,text:"You have already activated your account on the system!"}):this.props.addAlertMessage({turnOn:!0,type:"error",level:2,text:"Unkwown activation request attempted!!!"})}else this.props.addAlertMessage({turnOn:!0,type:"error",level:2,text:"Unkwown activation request attempted!!!"});return o.a.createElement("div",null,this.props.auth.isAuthenticated?o.a.createElement(u.a,{to:"/"}):o.a.createElement(u.a,{to:"/myAccount/login"}))}}])&&f(e.prototype,n),r&&f(e,r),s}(o.a.Component);v.propTypes={addAlertMessage:s.PropTypes.func.isRequired,auth:s.PropTypes.object.isRequired},e.default=Object(a.b)((function(t){return{auth:t.authReducer}}),{addAlertMessage:p.a})(v)}}]);