/**
 * This is the file, entry point, defined in webpack.config.js
 */
import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import store from "./main/store.jsx";
import {BrowserRouter, Route, Switch, MemoryRouter} from "react-router-dom";

import {throttle} from "lodash";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

import {addAlertMessage} from "./main/actions/alertMessageActions.jsx";

/*
import Home from "./main/components/home.jsx";
import Accounting from "./main/containers/accounting.jsx";
import Referrals from "./main/components/referrals.jsx";
import About from "./main/components/about.jsx";
import NotFound from "./main/components/notFound.jsx";

import NavRoot from "./main/components/navRoot.jsx";
import NavRootFooter from "./main/components/navRootFooter.jsx";
import {DRAWER_WIDTH} from "./main/components/navRoot.jsx";

import MyAccount from "./main/auth/containers/myAccount.jsx";
import Signup from "./main/auth/components/signup/signup.jsx";
import Activation from "./main/auth/components/signup/activation.jsx";
import Login from "./main/auth/components/login/login.jsx";
import ResetPassword from "./main/auth/components/resetPassword/resetPassword.jsx";
import ForgotPassword from "./main/auth/components/forgotPassword/forgotPassword.jsx";

import Error from "./main/components/common/error.jsx";
import GlobalAlert from "./main/components/common/globalAlert.jsx";
*/

const Home = React.lazy( () => import("./main/components/home.jsx") );
const Accounting = React.lazy( () => import("./main/containers/accounting.jsx") );
const Referrals = React.lazy( () => import("./main/components/referrals.jsx") );
const About = React.lazy( () => import("./main/components/about.jsx") );
const NotFound = React.lazy( () => import("./main/components/notFound.jsx") );

import NavRoot from "./main/components/navRoot.jsx";
import NavRootFooter from "./main/components/navRootFooter.jsx";
import {DRAWER_WIDTH} from "./main/components/navRoot.jsx";

const MyAccount = React.lazy( () => import("./main/auth/containers/myAccount.jsx") );
const Signup = React.lazy( () => import("./main/auth/components/signup/signup.jsx") );
const Activation = React.lazy( () => import("./main/auth/components/signup/activation.jsx") );
const Login = React.lazy( () => import("./main/auth/components/login/login.jsx") );
const ResetPassword = React.lazy( () => import("./main/auth/components/resetPassword/resetPassword.jsx") );
const ForgotPassword = React.lazy( () => import("./main/auth/components/forgotPassword/forgotPassword.jsx") );

const Error = React.lazy( () => import("./main/components/common/error.jsx") );
const GlobalAlert = React.lazy( () => import("./main/components/common/globalAlert.jsx") );



//import "./main/css/root.css";
//import "./main/css/footer.css";
/**
export const breakpoints = {
  desktopLg: 1400,
  desktopMd: 1300,
  desktopSm: 1200,
  tabletLg: 1040,
  tabletMd: 991,
  tabletSm: 840,
  mobileLg: 767,
  mobileMd: 540,
  mobileSm: 400
};
 */
const styles = 
{
  	root:	
	{
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row'
	},
	gridPanel: 
	{
		padding: 8,
		border: '0px solid red',
		borderRadius: '8px',
		backgroundColor: 'inherit'
	},
	loadingIndicator:
	{
		position: "absolute",
		width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
		margin: 0
	}
};
window.mobileAndTabletCheck = function() 
{
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
const LoadingIndicator = (props) => 
{
   const { promiseInProgress } = usePromiseTracker({delay: 0});

   return promiseInProgress && 
		  <div style={styles.loadingIndicator}>
	      	<Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
	      </div>  
}
class MainApp extends React.Component
{
	//This screen size can be changed based on the size of user's screen. May 10 2020'
	static LARGE_SCREEN = 1024;
    constructor(props)
    {
        super(props);
		this.state =
		{
			currentWidth: window.innerWidth,
			isLargeScreen: window.innerWidth >= MainApp.LARGE_SCREEN
		};
		this.bodyContainer = React.createRef();
		this.isMobile = window.mobileAndTabletCheck();
		console.log("MOBILE: ", this.isMobile);
    }
    componentDidMount()
    {
		if (!this.isMobile) window.addEventListener("resize", this.onWindowResizeEventListener);
		window.addEventListener("online", this.onInternetConnection);
  		window.addEventListener("offline",this.onInternetConnection);
    }
    componentWillUnmount()
    {
    	if (!this.isMobile) window.removeEventListener("resize", this.onWindowResizeEventListener);   
		window.removeEventListener("online", this.onInternetConnection);
  		window.removeEventListener("offline",this.onInternetConnection);
    }
    changeBodyMargin = (marginal) =>
    {
		if(this.bodyContainer.current)
			this.bodyContainer.current.style.marginLeft = (marginal? DRAWER_WIDTH : 0) + 'px';
		return marginal;
	}
	onWindowResizeEventListener = throttle
	(
			() => 
			{
				this.setState({currentWidth: window.innerWidth, isLargeScreen: window.innerWidth >= MainApp.LARGE_SCREEN});
		    },
			500
	);
	onInternetConnection = (e) =>
	{	console.log("[INFO onInternetConnection of root_idnex.jsx] status: ", navigator.onLine);
		let alertMsg = navigator.onLine ?
					   {turnOn: false, text: "", type:"success", level: 1} :
					   {turnOn: true, text: "Your internet connection is off. -- Check it out!", type: "error", level: 1};
		store.dispatch(addAlertMessage(alertMsg));
	}

    render()
    {	
		
        return(
        		<Provider store={store}>
		        	<BrowserRouter>
						<Route component={(props) => <NavRoot {...props} isLargeScreen={this.state.isLargeScreen} changeBodyMargin={this.changeBodyMargin}/> } />
        				<React.Suspense fallback={<div style={styles.loadingIndicator}><Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /></div>}>	
							<LoadingIndicator />
							
							<div ref={this.bodyContainer} style={this.state.isLargeScreen ? {marginLeft: DRAWER_WIDTH+'px', marginTop: '70px'} : {marginLeft: 0, marginTop: '70px'}}>
							    
								<GlobalAlert />
								
								<div style={styles.gridPanel}> 
			                    <Switch>
			                        <Route exact path="/"    component={ (props) => <Home {...props} /> } /> 
									<Route path="/accounting"    component={ (props) => <Accounting {...props} /> } /> 
									<Route path="/referrals"    component={ (props) => <Referrals {...props} /> } /> 
									<Route exact path="/about"    component={ (props) => <About {...props} /> } /> 
									<Route path="/myAccount"    component={ (props) => <MyAccount {...props} /> } /> 
									
			                        <Route path="/signup"    component={ (props) => <Signup {...props} /> } /> 
			                        <Route path="/login"     component={ (props) => <Login {...props} /> } /> 
			                        <Route path="/forgotPassword" component={ (props) => <ForgotPassword {...props} /> } /> 
			                        <Route path="/resetPassword"  component={ (props) => <ResetPassword {...props} /> } /> 
			                        <Route path="/error"          component={ (props) => <Error {...props} /> } /> 
			                        <Route path="/activation"     component={ (props) => <Activation {...props} /> } />
									<Route path="/contactus"     component={ (props) => <div>thank you</div> } />
			                        <Route path="/privacy-policy" render={ () => {window.location.href="termsfeed-privacy-policy-html-english.html"}} />
			                        <Route component={ (props) => <NotFound {...props} /> } />
		        				</Switch>
								</div>
								<Route component={(props) => <NavRootFooter {...props} /> }/>
	        				</div>
        				</React.Suspense>
        					 
		            </BrowserRouter>
    			</Provider>
              );
    }
	
}

ReactDOM.render
(  
	<MainApp />,
	window.document.getElementById("app")
);
