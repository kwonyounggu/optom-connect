import React from "react";

import {Navbar, Nav, NavDropdown, Glyphicon} from "react-bootstrap";
import {LinkContainer}  from "react-router-bootstrap";

import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {logout} from "../auth/actions/loginActions.jsx";

class NavigationBar extends React.Component 
{
	constructor(props)
    {
        super(props);
		
    }
	onLogoutClick=(e, props)=>
	{
		console.log("INFO [onLogoutClick(",e,") of navigationBar.jsx] is called");
		e.preventDefault();
		props.logout();
	}
	
	//<NavDropdown.Item><LinkContainer to="/admin_index.html/medicineInput">Medicines</LinkContainer></NavDropdown.Item>
	render()
	{
		console.log("INFO [navigationBar.jsx] props: ", this.props);
		return (
				<Navbar collapseOnSelect bg="light" expand="lg">
				  <LinkContainer to="/admin_index.html/home"><Navbar.Brand>OD Admin</Navbar.Brand></LinkContainer>
				  <Navbar.Toggle aria-controls="basic-navbar-nav" />
				  <Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="mr-auto">
				      <LinkContainer to="/admin_index.html/home"><Nav.Link>Home</Nav.Link></LinkContainer>
				      <LinkContainer to="/admin_index.html/other"><Nav.Link>Other</Nav.Link></LinkContainer>
				      <NavDropdown title="Health Data Input" id="basic-nav-dropdown">
				        <LinkContainer to="/admin_index.html/medicineInput"><NavDropdown.Item>Input Medicines</NavDropdown.Item></LinkContainer>
						<LinkContainer to="/admin_index.html/eyeConditionInput"><NavDropdown.Item>Input Eye Conditions</NavDropdown.Item></LinkContainer>		        
				        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
				        <NavDropdown.Divider />
				        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
				      </NavDropdown>
				    </Nav>
					<Nav>
						{
			          		this.props.auth.isAuthenticated ?		
								<Nav.Link onClick={(e)=>this.onLogoutClick(e, this.props)}>Logout</Nav.Link> :
								<LinkContainer to="/admin_index.html/login"><Nav.Link>Login</Nav.Link></LinkContainer>
			        	}
						
					</Nav>
				  </Navbar.Collapse>
				</Navbar>
			   );
	}
}
NavigationBar.propTypes = 
{
  auth: PropTypes.object.isRequired,
  rootReducer: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer,
		    rootReducer: state.rootReducer
		 };
}

export default connect(mapStateToProps, {logout}) (NavigationBar);