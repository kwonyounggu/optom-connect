/**
 * This is the file, entry point, defined in webpack.config.js
 */
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./main/store.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {throttle} from "lodash";


const Home = React.lazy( () => import("./main/components/home.jsx") );
const Accounting = React.lazy( () => import("./main/containers/accounting.jsx") );
const Referrals = React.lazy( () => import("./main/components/referrals.jsx") );
const About = React.lazy( () => import("./main/components/about.jsx") );
const NotFound = React.lazy( () => import("./main/components/notFound.jsx") );

import NavRoot from "./main/components/navRoot.jsx";
import NavRootFooter from "./main/components/navRootFooter.jsx";


const Signup = React.lazy( () => import("./main/auth/components/signup/signup.jsx") );
const Activation = React.lazy( () => import("./main/auth/components/signup/activation.jsx") );
const Login = React.lazy( () => import("./main/auth/components/login/login.jsx") );
const ResetPassword = React.lazy( () => import("./main/auth/components/resetPassword/resetPassword.jsx") );
const ForgotPassword = React.lazy( () => import("./main/auth/components/forgotPassword/forgotPassword.jsx") );

const Error = React.lazy( () => import("./main/components/common/error.jsx") );

import "./main/css/root.css";
import "./main/css/footer.css";

class MainApp extends React.Component
{
	static NORM_WIDTH = 900;
	
    constructor(props)
    {
        super(props);
		this.state =
		{
			
		};
		this.rootContainer = React.createRef();
    }
    componentWillMount()
    { 	
    }
    componentDidMount()
    {
		if (MainApp.NORM_WIDTH > window.innerWidth) this.rootContainer.current.style.width = "95%";
		else this.rootContainer.current.style.width = MainApp.NORM_WIDTH+"px";
		window.addEventListener("resize", this.onWindowResizeEventListener);
    }
    componentWillUnmount()
    {
    	window.removeEventListener("resize", this.onWindowResizeEventListener);   
    }
	onWindowResizeEventListener = throttle
	(
			() => 
			{
				if (MainApp.NORM_WIDTH > window.innerWidth) this.rootContainer.current.style.width = "95%";
				else this.rootContainer.current.style.width = MainApp.NORM_WIDTH+"px";
		    },
			1000
	);
    render()
    {	
	
		//console.log("browserInnerWidth: ", this.state.browserInnerWidth, " : ", MainApp.NORM_WIDTH);
		//console.log("this.rootContainer.current): ", this.rootContainer.current == null ? "NULL" : this.rootContainer.current);
		//console.log("INFO, root_index.jsx, ",this.props);
		//const rootContainerStyles = window.getComputedStyle(this.rootContainer, null).getPropertyValue("border-radius");

		
        return(
        		<Provider store={store}>
		        	<BrowserRouter>
						<Route component={(props) => <NavRoot {...props}  /> } />
        				<React.Suspense fallback={<div>Component being loaded ... </div>}>	
							{ /*MainApp.NORM_WIDTH < this.state.browserInnerWidth && <div/> */}


	        				{/*console.log("this.rootContainer.current): ", this.rootContainer.current.style.width)*/}
<div ref={this.rootContainer} className="root-container"> 
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
        				</React.Suspense>
        				{/* <Route component={(props) => <NavRootFooter {...props} /> }/>	   */} 		  
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