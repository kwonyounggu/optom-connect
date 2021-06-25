import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, DropdownButton, Glyphicon, OverlayTrigger, Popover, Label} from "react-bootstrap";

import {PropTypes} from "prop-types";
import {connect} from "react-redux";

class NavigationBar extends React.Component 
{
	render()
	{
		return (
				<Navbar>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="#home">Brand</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>
    			<Navbar.Text>
    				Signed in as: <Navbar.Link href="#">Mark OPttto</Navbar.Link>
    			</Navbar.Text>
    			<Navbar.Text pullRight>Have a great day...</Navbar.Text>
    		</Navbar.Collapse>
    	</Navbar>	
			   );
	}
}
export default NavigationBar;
const NavRoot=(props)=>
{
	console.log("In NavRoot, ",props);
	let currentMenu=null, pathname=props.location.pathname;
	switch(pathname)
	{
		case "/": 
		case "/login":
		case "/signup":
		case "/forgotPassword":
		case "/resetPassword":
		case (pathname.match(/^\/home[\/]?/i)||{}).input:
		{
			currentMenu=<NavRootBar {...props} />;
			break;
		}
		case (pathname.match(/^\/marriage[\/]?/i)||{}).input:
		{
			currentMenu=<NavMarriageBar {...props} />;
			break;
		}
		case (pathname.match(/^\/music[\/]?/i)||{}).input:
		{
			currentMenu=<NavMusicBar {...props} />;
			break;
		}
		case (pathname.match(/^\/tutorials[\/]?/i)||{}).input:
		{
			//console.log("here: ---", props.location.pathname.match(/^\/tutorials/i));
			currentMenu=<NavTutorialBar {...props} />;
			break;
		}
		default:
		{
			console.log("Location pathname, ", pathname,", is not defined in NavRoot of naveRoot.jsx");
			currentMenu=<NavRootBar {...props} />;
			break;
		}
	}
	return currentMenu;
}

const onCollapsedButtonClick=(props)=>
{
	console.log("onEnter(",props,")");
}
const onExitClick=(props)=>
{
	console.log("onExitClick is called,",props);
}
export const onLogoutClick=(e, props)=>
{
	//console.log("onLogoutClick(",e,") is called");
	e.preventDefault();
	props.logout();
}
export const onChangeLangClick=(e, props)=>
{
	e.preventDefault();
	props.changeLang(props.rootReducer.lang=="kr" ? "en": "kr");
}

/* For testing an icon when expanded navbar is reduced*/
const NavRootBar=(props)=>
(<Navbar>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="#home">Brand</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>
    			<Navbar.Text>
    				Signed in as: <Navbar.Link href="#">Mark OPttto</Navbar.Link>
    			</Navbar.Text>
    			<Navbar.Text pullRight>Have a great day...</Navbar.Text>
    		</Navbar.Collapse>
    	</Navbar>);

/***
const NavRootBar=(props)=>
(	
	 <Navbar inverse collapseOnSelect fixedTop fluid>
		<div style={{maxWidth: "1200px", margin: "0 auto"}}>
		    <Navbar.Header>
		      <Navbar.Brand>
		 			<Link to="/"><img src={"/images/wm_logo.png"} width="150" height="26" alt="WM_LOGO"/></Link>
		      </Navbar.Brand>
		      <Navbar.Toggle />		  
		    </Navbar.Header>	
		    <Navbar.Collapse onEntered={onCollapsedButtonClick} onExit={onExitClick}>	
			    <Nav>
			         <IndexLinkContainer to="/">
			           	<NavItem eventKey={1}>{korean.home}</NavItem>
			         </IndexLinkContainer>
			         <LinkContainer to="/marriage">
			           	<NavItem eventKey={2}>{korean.marriage}</NavItem>
			         </LinkContainer>
			         <LinkContainer to="/music">
			           	<NavItem eventKey={3}>{korean.music}</NavItem>
			         </LinkContainer>
			          <NavItem>{korean.movie}</NavItem>    
			      </Nav>
			        	
			      <Nav pullRight>
			        <NavDropdown eventKey={40} title="Tutorials" id="tutorials-nav-dropdown" >
				        <ReactJsTutorial {...props} className="dropdown-submenu" noCaret={true}/>
			        	<ReactNativeTutorial {...props} className="dropdown-submenu" noCaret={true} />
			        	<LinkContainer to={`${props.location.pathname}/tim_rn`}>
			          		<MenuItem eventKey={40.1}>Tim</MenuItem>
			          	</LinkContainer>
			        </NavDropdown>
			        {
			          	props.auth.isAuthenticated ?
			          			<NavItem title={props.auth.user.iss} onClick={(e)=>onLogoutClick(e, props)}>Logout<Glyphicon glyph="log-out"></Glyphicon></NavItem> :
			          			<LinkContainer to="/login">
			          				<NavItem>Login<Glyphicon glyph="log-in"></Glyphicon></NavItem>	
			          			</LinkContainer>
			        }
			        <NavItem eventKey={20} href="#">Search<Glyphicon glyph="search"></Glyphicon></NavItem>
			        <NavItem eventKey={21} onClick={(e)=>onChangeLangClick(e, props)}><i className="fa fa-language" area-hidden="true" style={{color: "#bcd6fe", fontSize: "20px"}}></i></NavItem>
			      </Nav>
		    </Navbar.Collapse>	
			</div>
    </Navbar>
);
*/
/* Note: the following is used but later found it does not display the collaped icon having three horizontal bars when the browser size is reduced.
const NavRootBar=(props)=>
(	
	 <Navbar inverse collapseOnSelect fixedTop fluid>
		<div className="root-container">
		    <Navbar.Header>
		      <Navbar.Brand>
		 			<Link to="/"><img src={"/images/wm_logo.png"} width="150" height="26" alt="WM_LOGO"/></Link>
		      </Navbar.Brand>
		      <Navbar.Toggle />		  
		    </Navbar.Header>	
		    <Navbar.Collapse onEntered={onCollapsedButtonClick} onExit={onExitClick}>	
			    <Nav>
			         <IndexLinkContainer to="/">
			           	<NavItem eventKey={1}>{korean.home}</NavItem>
			         </IndexLinkContainer>
			         <LinkContainer to="/music">
			           	<NavItem eventKey={2}>{korean.music}</NavItem>
			         </LinkContainer>
			          <NavItem>{korean.movie}</NavItem>    
			      </Nav>
			        	
			      <Nav pullRight>
			        <NavDropdown eventKey={40} title="Tutorials" id="tutorials-nav-dropdown" >
				        <ReactJsTutorial {...props} className="dropdown-submenu" noCaret={true}/>
			        	<ReactNativeTutorial {...props} className="dropdown-submenu" noCaret={true} />
			        	<LinkContainer to={`${props.location.pathname}/tim_rn`}>
			          		<MenuItem eventKey={40.1}>Tim</MenuItem>
			          	</LinkContainer>
			        </NavDropdown>
			        {
			          	props.auth.isAuthenticated ?
			          			<NavItem title={props.auth.user.iss} onClick={(e)=>onLogoutClick(e, props)}>Logout<Glyphicon glyph="log-out"></Glyphicon></NavItem> :
			          			<LinkContainer to="/login">
			          				<NavItem>Login<Glyphicon glyph="log-in"></Glyphicon></NavItem>	
			          			</LinkContainer>
			        }
			        <NavItem eventKey={20} href="#">Search<Glyphicon glyph="search"></Glyphicon></NavItem>
			        <NavItem eventKey={21} onClick={(e)=>onChangeLangClick(e, props)}><i className="fa fa-language" area-hidden="true" style={{color: "#bcd6fe", fontSize: "20px"}}></i></NavItem>
			      </Nav>
		    </Navbar.Collapse>
		</div>
    </Navbar>
);
*/
/*
NavRootBar.propTypes = 
{
  auth: PropTypes.object.isRequired,
  rootReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  changeLang: PropTypes.func.isRequired
}

function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer,
		    rootReducer: state.rootReducer
		 };
}
*/
//export default connect(mapStateToProps, {logout, changeLang})(NavRoot);
//export default NavRoot;

