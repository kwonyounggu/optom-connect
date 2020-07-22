import React from 'react';
import {Link, Redirect, useLocation} from "react-router-dom";
import {PropTypes} from "prop-types";
import { makeStyles, withStyles, useTheme, fade } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

import SvgIcon from '@material-ui/core/SvgIcon';
import Menubar from "./common/menubar.jsx";
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import {connect} from "react-redux";
import {logout} from "../auth/actions/loginActions.jsx";
import {addAlertMessage} from "../actions/alertMessageActions.jsx";
import {menuLinks} from "./common/menuLinks.jsx";

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => 
({
  root: 
  {
    display: "flex"
  },
  appBar: 
  {
    zIndex: theme.zIndex.drawer + 1,
  },
  /*
  drawer: 
  {
    [theme.breakpoints.up("md")]: {width: DRAWER_WIDTH, flexShrink: 0}
  },
  */
  menuButton: 
  {
    marginRight: theme.spacing(1),
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
    width: DRAWER_WIDTH
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
	marginLeft: 0,
	width: 67,
	height: 45,
	verticalAlign: 'middle'
  },
  flexGrow: 
  {
    flexGrow: 1
  },
  search: 
  {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': 
    {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: 
    {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: 
  {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: 
  {
    color: 'inherit'
  },
  inputInput: 
  {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {width: '20ch'}
  },
  sectionDesktop: 
  {
    display: 'none',
    [theme.breakpoints.up('md')]: {display: 'flex'}
  },
  sectionMobile: 
  {
    display: 'flex',
    [theme.breakpoints.up('md')]: {display: 'none'}
  }
}));
//logo.width=1000*50/667, height: 50

const NavRoot=(props)=>
{
	console.log("In NavRoot, ",props);
	/*
	const location = useLocation();
	React.useEffect
	(
		() =>
		{
			console.log("=================>LOCATION CHANGE: ", location.pathname);
		},
		[location]
	);
	*/
	let currentMenu = null;
	let pathname = props.location.pathname.toLowerCase();
	if (menuLinks.includes(pathname)) currentMenu=<NavRootMenuBar {...props} />;
    else switch(pathname)
    {
		case (pathname.match(/^\/about[\/]?/i) || {}).input: { currentMenu=<Redirect to='/about' />; break;}
		case (pathname.match(/^\/referrals[\/]?/i) || {}).input: { currentMenu=<Redirect to='/referrals' />; break;}
		case (pathname.match(/^\/accounting[\/]?/i) || {}).input: { currentMenu=<Redirect to='/accounting' />; break;}
		case (pathname.match(/^\/login[\/]?/i) || {}).input: {currentMenu=<NavRootMenuBar {...props} />; break;}
		/*case (pathname.match(/^\/login[\/]?/i) || {}).input: { pathname = "/login"; break;}
		case (pathname.match(/^\/signup[\/]?/i) || {}).input: { pathname = "/signup"; break;}
		case (pathname.match(/^\/forgotPassword[\/]?/i) || {}).input: { pathname = "/forgotPassword"; break;}
		case (pathname.match(/^\/resetPassword[\/]?/i) || {}).input: { pathname = "/resetPassword"; break;} 
		default: { currentMenu=<NavRootMenuBar {...props} pathname="/"/>; break;} */	
		default: { currentMenu=<Redirect to='/' />; break;}
	}
	
	return currentMenu;
}


const NavRootMenuBar = (props) => 
{
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(props.isLargeScreen);  
  
  //This will be called whenever any props value changed or UI events updated such as a GUI clicks
  React.useEffect(() => 
  { 
  });
  function onLogout()
  {
	 props.logout();
  }
  function handleDrawerToggle() 
  {
	if (props.isLargeScreen) 
		if (drawerOpen) props.changeBodyMargin(false);
		else props.changeBodyMargin(true);
	
	setDrawerOpen(!drawerOpen);
	
  }
  return (
	<div className={classes.root}>
	  <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>	
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="optom connect" component={Link} to="/">
            <img src={"/images/general/connect-png-2.png"} alt="logo" className={classes.logo} />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Optom Connect
          </Typography>
		  <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
		  <div className={classes.flexGrow} />
          <div className={classes.sectionDesktop}>
			<Tooltip title="Newly uploaded blogs (COMING SOON)" arrow>
	            <IconButton aria-label="show 17 new notifications" color="inherit">
	              <Badge badgeContent={0} color="secondary">
	                <NotificationsIcon />
	              </Badge>
	            </IconButton>
			</Tooltip>
			{
				props.auth.isAuthenticated ?
				(
					<Tooltip title="Click to logout" arrow>
					  <IconButton aria-label="Logout"  color="inherit" onClick={onLogout}>
					     <ExitToAppIcon />
					  </IconButton>
					</Tooltip>
				):
				(
					<Tooltip title="Click to login" arrow>
					  <IconButton aria-label="Login"  color="inherit" component={Link} to={"/login?prevPath=" + props.location.pathname}>
					     <SvgIcon>
					      <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/>
					    </SvgIcon>
					  </IconButton>
					</Tooltip>
				)
			}
			<Tooltip title="My Account (COMING SOON)" arrow>
	            <IconButton
	              edge="end"
	              aria-label="account of current user"
	              aria-haspopup="true"
	              color="inherit"
	            >
	              <AccountCircle />
	            </IconButton>
			</Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
     </AppBar>
          {drawerOpen && props.isLargeScreen && props.changeBodyMargin(true)}
          <Drawer
            variant={props.isLargeScreen ? "persistent": "temporary"}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper}}
            ModalProps={props.isLargeScreen ? {} : {keepMounted: true}} // Better open performance on mobile
          >
            {
				props.isLargeScreen? 
					<div className={classes.toolbar} /> :
					<React.Fragment>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px 5px 2px'}}>
						 <img src={"/images/general/connect-png-2.png"} alt="logo" className={classes.logo} />
						 
			             <Typography variant="h6" noWrap>
				            Optom Connect
				          </Typography>
					    </div>
					    <Divider />
					</React.Fragment>
			}
            <Menubar {...props} setDrawerOpen={setDrawerOpen}/>
          </Drawer>
	</div>
  );
}
NavRootMenuBar.propTypes = 
{
  auth: PropTypes.object.isRequired,
  rootReducer: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}
function mapStateToProps(state) 
{
  return {
		    auth: state.authReducer,
		    rootReducer: state.rootReducer,
			alertState: state.alertMessageReducer
		 };
}

export default connect(mapStateToProps, {logout, addAlertMessage})(NavRoot);
//export default NavRoot;

