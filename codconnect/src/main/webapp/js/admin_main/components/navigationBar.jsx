import React from "react";

import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LinkContainer}  from "react-router-bootstrap";
import {Link} from "react-router-dom";


class NavigationBar extends React.Component 
{
	render()
	{
		return (
				<Navbar bg="light" expand="lg">
  <LinkContainer to="/admin_index.html/home"><Navbar.Brand>OD Admin</Navbar.Brand></LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <LinkContainer to="/admin_index.html/home"><Nav.Link>Home</Nav.Link></LinkContainer>
      <LinkContainer to="/admin_index.html/other"><Nav.Link>Other</Nav.Link></LinkContainer>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
			   );
	}
}
export default NavigationBar;