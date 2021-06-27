 /**
 * This is the file, entry point, defined in webpack.config.js
 */
import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import store from "./admin_main/store.jsx";
import {BrowserRouter, Route, Switch, MemoryRouter} from "react-router-dom";

import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const Home = React.lazy( () => import("./admin_main/components/home.jsx") );
const NotFound = React.lazy( () => import("./admin_main/components/notFound.jsx") );
const Login = React.lazy( () => import("./admin_main/auth/components/login/login.jsx") );

import NavigationBar from "./admin_main/components/navigationBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const styles = 
{
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
		
    }

	render()
	{
		console.log("INFO [admin_index.jsx]: this.", this);
		return (
				<Provider store={store}>
		        	<BrowserRouter>
						<Route component={(props) => <NavigationBar {...props} /> } />
        				<React.Suspense fallback={<div style={styles.loadingIndicator}><Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /></div>}>	
							<LoadingIndicator />
								
			                    <Switch>
									<Route exact path="/admin_index.html"    component={ (props) => <Home {...props} /> } /> 
			                        <Route path="/admin_index.html/home"    component={ (props) => <Home {...props} /> } /> 
									<Route path="/admin_index.html/other"    component={ (props) => <div>heel</div> } />
									<Route path="/admin_index.html/login" component={ (props) => <Login {...props} /> } /> 
			                        <Route path="/privacy-policy" render={ () => {window.location.href="termsfeed-privacy-policy-html-english.html"}} />			                        
																
									<Route component={ (props) => <NotFound {...props} /> } />
		        				</Switch>
        				</React.Suspense>		 
		            </BrowserRouter >
    			</Provider>
			   );
	}
    render_org()
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
