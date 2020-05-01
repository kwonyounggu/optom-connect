import React from 'react';
import {Link, useRouteMatch, LinkProps} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Grid from "@material-ui/core/Grid";


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {connect} from "react-redux";
import {logout, login} from "../auth/actions/loginActions.jsx";



const useStyles = makeStyles((theme) => 
({
  root: 
  {
    flexGrow: 1,
  },
  menuButton: 
  {
    marginRight: theme.spacing(1),
  },
  title: 
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {display: 'block'}
  },
  logo: {
    width: 135,
    height: 43.54
  }
}));


const NavRoot=(props)=>
{
	console.log("In NavRoot, ",props);
	
	let currentMenu=null, pathname=props.location.pathname;
	switch(pathname)
	{
		case "/": 
		case "/login":
		case "/about":
		case "/referrals":
		case "/accounting":
		case "/signup":
		case "/forgotPassword":
		case "/resetPassword":
		case (pathname.match(/^\/home[\/]?/i)||{}).input:
		{
			currentMenu=<NavRootMenuBar {...props} />;
			break;
		}
		default:
		{
			console.log("Location pathname, ", pathname,", is not defined in NavRoot of naveRoot.jsx");
			break;
		}
	}
	return currentMenu;
}

const NavRootMenuBar = (props) => 
{
  const classes = useStyles();

  return (
      <AppBar position="relative" color="transparent">
        <Toolbar style={{ alignItems: "center", justifyContent: "center" }}>	
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Optom CONNECT
          </Typography>
		  <Tabs value={props.location.pathname} variant="scrollable" scrollButtons="on">
	          <Tab label="Home" value="/" component={Link} to="/" />
				<Tab label="Accounting" value="/accounting" component={Link} to="/accounting" />
				<Tab label="Referrals" value="/referrals" component={Link} to="/referrals" />
				<Tab label="About" value="/about" component={Link} to="/about" />
	        </Tabs>
		
        </Toolbar>
     </AppBar>
  );
}


function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer,
		    rootReducer: state.rootReducer
		 };
}

export default connect(mapStateToProps, {logout})(NavRoot);
//export default NavRoot;

