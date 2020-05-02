import React from 'react';
import {Link, useRouteMatch, LinkProps} from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

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
	
	let currentMenu=null, pathname=props.location.pathname.startsWith("/accounting") ? "/accounting" : props.location.pathname;
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
			currentMenu=<NavRootMenuBar {...props} pathname={pathname}/>;
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
  //console.log("props: ", props);

  return (
      <AppBar position="relative" color="transparent">
        <Toolbar style={{ alignItems: "center", justifyContent: "center" }}>	
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Optom CONNECT
          </Typography>
		  <AntTabs value={props.pathname} variant="scrollable" scrollButtons="on">
	          <AntTab label="Home" value="/" component={Link} to="/" />
				<AntTab label="Accounting" value="/accounting" component={Link} to="/accounting" />
				<AntTab label="Referrals" value="/referrals" component={Link} to="/referrals" />
				<AntTab label="About" value="/about" component={Link} to="/about" />
	        </AntTabs>
		
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

