import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menubar from "./common/menubar.jsx";
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { green } from '@material-ui/core/colors';

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

const drawerWidth = 240;
const LARGE_SCREEN = 1280;
const useStyles = makeStyles((theme) => 
({
  root_tmp: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
  root: 
  {
    display: "flex"
  },
  appBar: 
  {
    zIndex: theme.zIndex.drawer + 1,
  },

  drawer: 
  {
    [theme.breakpoints.up("md")]: {width: drawerWidth, flexShrink: 0}
  },
  
  menuButton: 
  {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('xl')]: 
	{
      display: 'none'
    },
  },
  title: 
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {display: 'block'}
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: 
  {
    width: drawerWidth
  },
  content: 
  {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  closeMenuButton: 
  {
    marginRight: "auto",
    marginLeft: 0
  },
  logo:
  {
	width: 67,
	height: 45
  }
}));
//logo.width=1000*50/667, height: 50

const NavRoot=(props)=>
{
	console.log("In NavRoot, ",props);
	
	let currentMenu = null;
	let pathname = props.location.pathname.toLowerCase();
    switch(pathname)
    {
		case "/": { currentMenu=<NavRootMenuBar {...props} pathname="/"/>; break;}
		case (pathname.match(/^\/about[\/]?/i) || {}).input: { currentMenu=<NavRootMenuBar {...props} pathname="/about"/>; break;}
		case (pathname.match(/^\/referrals[\/]?/i) || {}).input: { currentMenu=<NavRootMenuBar {...props} pathname="/referrals"/>; break;}
		case (pathname.match(/^\/accounting[\/]?/i) || {}).input: { currentMenu=<NavRootMenuBar {...props} pathname="/accounting"/>; break;}
		/*case (pathname.match(/^\/login[\/]?/i) || {}).input: { pathname = "/login"; break;}
		case (pathname.match(/^\/signup[\/]?/i) || {}).input: { pathname = "/signup"; break;}
		case (pathname.match(/^\/forgotPassword[\/]?/i) || {}).input: { pathname = "/forgotPassword"; break;}
		case (pathname.match(/^\/resetPassword[\/]?/i) || {}).input: { pathname = "/resetPassword"; break;} */
		default: { currentMenu=<NavRootMenuBar {...props} pathname="/"/>; break;}
	}
	
	return currentMenu;
}

const NavRootMenuBar = (props) => 
{
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentWidth, setCurrentWidth] = React.useState(props.currentWidth);
  const [permanentOpen, setPermanentOpen] = React.useState(true);

  //This will be called whenever any props value changed or UI events updated such as a GUI clicks
  React.useEffect(() => 
  { 
    	if (currentWidth != props.currentWidth)
		{
			setCurrentWidth(props.currentWidth);
			if (mobileOpen) setMobileOpen(false);
		}
  });
  function handleDrawerToggle() 
  {

	if (window.innerWidth >= LARGE_SCREEN) //over lg size
	{	
		if (mobileOpen) setMobileOpen(false);
		
		if (permanentOpen) 
		{
			setPermanentOpen(false); //close it when width >= LG AND menu button is pressed
			props.onChangeDrawerMenu(false);
		}
		else 
		{
			setPermanentOpen(true); //open it when width >= LG and menu button is pressed
			props.onChangeDrawerMenu(true);
		}
	}
	
    else 
	{
		setMobileOpen(!mobileOpen);
		setPermanentOpen(true);
	}
  }

  return (
	<div className={classes.root}>
	  <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>	
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="optom connect" onClick={handleDrawerToggle}>
            <img src={"/images/general/connect-png-2.png"} alt="logo" className={classes.logo} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            OptomDr
          </Typography>
		  {/* https://stackoverflow.com/questions/50012686/both-right-and-left-aligned-icons-in-appbar-with-material-ui-next */}
		  {/*<AntTabs value={props.pathname} variant="scrollable" scrollButtons="on" style={{marginLeft: 'auto'}}>
	          <AntTab label="Home" value="/" component={Link} to="/" />
				<AntTab label="Accounting" value="/accounting" component={Link} to="/accounting" />
				<AntTab label="Referrals" value="/referrals" component={Link} to="/referrals" />
				<AntTab label="About" value="/about" component={Link} to="/about" />
	        </AntTabs>
		*/}
        </Toolbar>
     </AppBar>
     <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/*<Hidden mdUp implementation="css">*/}
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper}}
            ModalProps={{ keepMounted: true}} // Better open performance on mobile
          >
			<div>
				 <img src={"/images/general/connect-png-2.png"} alt="logo" className={classes.logo} />
	            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
	             	<CloseIcon />
	            </IconButton>
			</div>
			<Divider />
            <Menubar {...props} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
          </Drawer>
        {/*</Hidden> */}
		<Hidden mdDown implementation="css">
		{/*When this drawer is open, close the temporay drwawer if open */}
          <Drawer
            className={classes.drawer}
            variant="persistent"
            classes={{ paper: classes.drawerPaper }}
			open={permanentOpen}
          >
            <div className={classes.toolbar} />
            <Menubar {...props} mobileOpen={mobileOpen}/>
          </Drawer>  
        </Hidden>
      </nav>

	</div>
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

