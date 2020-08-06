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
    }
    componentDidMount()
    {
		window.addEventListener("resize", this.onWindowResizeEventListener);
		window.addEventListener("online", this.onInternetConnection);
  		window.addEventListener("offline",this.onInternetConnection);
    }
    componentWillUnmount()
    {
    	window.removeEventListener("resize", this.onWindowResizeEventListener);   
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
		        	<MemoryRouter>
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
			                        <Route path="/privacy-policy" render={ () => {window.location.href="termsfeed-privacy-policy-html-english.html"}} />
			                        <Route component={ (props) => <NotFound {...props} /> } />
		        				</Switch>
								</div>
								{/*<Route component={(props) => <NavRootFooter {...props} /> }/> */}
	        				</div>
        				</React.Suspense>
        					 
		            </MemoryRouter>
    			</Provider>
              );
    }
	
}

ReactDOM.render
(  
	<MainApp />,
	window.document.getElementById("app")
);
