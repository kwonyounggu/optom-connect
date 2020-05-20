/**
 * This is the file, entry point, defined in webpack.config.js
 */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {Provider} from "react-redux";
import store from "./main/store.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {throttle} from "lodash";
import { withStyles } from "@material-ui/core/styles";
import {addAlertMessage} from "./main/actions/alertMessageActions.jsx"

const Home = React.lazy( () => import("./main/components/home.jsx") );
const Accounting = React.lazy( () => import("./main/containers/accounting.jsx") );
const Referrals = React.lazy( () => import("./main/components/referrals.jsx") );
const About = React.lazy( () => import("./main/components/about.jsx") );
const NotFound = React.lazy( () => import("./main/components/notFound.jsx") );

import NavRoot from "./main/components/navRoot.jsx";
import NavRootFooter from "./main/components/navRootFooter.jsx";
import {DRAWER_WIDTH} from "./main/components/navRoot.jsx";

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
		border: '1px solid red',
		borderRadius: '8px'
	}
};

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
					   {turnOn: false, text: "", type:"success"} :
					   {turnOn: true, text: "Your internet connection is off. -- Check it out!", type: "error"};
		store.dispatch(addAlertMessage(alertMsg));
	}
    render()
    {	
		
        return(
        		<Provider store={store}>
		        	<BrowserRouter>
						<Route component={(props) => <NavRoot {...props} isLargeScreen={this.state.isLargeScreen} changeBodyMargin={this.changeBodyMargin}/> } />
        				<React.Suspense fallback={<div>Component being loaded ... </div>}>	
							<div ref={this.bodyContainer} style={this.state.isLargeScreen ? {marginLeft: DRAWER_WIDTH+'px'} : {marginLeft: 0}}>
							    <GlobalAlert />
								<div style={styles.gridPanel}> 
			                    <Switch>
			                        <Route exact path="/"    component={ (props) => <Home {...props} /> } /> 
									<Route path="/accounting"    component={ (props) => <Accounting {...props} /> } /> 
									<Route path="/referrals"    component={ (props) => <Referrals {...props} /> } /> 
									<Route exact path="/about"    component={ (props) => <About {...props} /> } /> 
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
