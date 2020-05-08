import React from 'react';
import {Link} from "react-router-dom";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AlbumIcon from '@material-ui/icons/Album';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SvgIcon from '@material-ui/core/SvgIcon';

import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles((theme) => 
(
	{
		  root: 
		  {
		    width: '100%',
		    maxWidth: 360,
		    backgroundColor: theme.palette.background.paper
		  },
		  link: 
		  {
		    textDecoration:'none'
		  },
		  nest_1st_level: 
		  {
		    paddingLeft: theme.spacing(2)
		  },
		  nest_2nd_level: 
		  {
		    paddingLeft: theme.spacing(4)
		  }
	}
));

const Menubar = (props) =>
{
	const classes = useStyles();
	const [accountingMenuOpen, setAccuntingMenuOpen] = React.useState(true);
	const [ohipMenuOpen, setOhipMenuOpen] = React.useState(true);
	const [nonohipMenuOpen, setNonohipMenuOpen] = React.useState(true);
	const [selectedItem, setSelectedItem] = React.useState("");
	
	//https://material-ui.com/components/lists/
	const menuClick = (key) => () =>
	{
		console.log("[INFO menuClick() of menubar.jsx]: ", key, ":", props);

		switch(key)
		{
			case "accounting": setAccuntingMenuOpen(!accountingMenuOpen); break;
			case "ohip": setOhipMenuOpen(!ohipMenuOpen); break;
			case "non_ohip": setNonohipMenuOpen(!nonohipMenuOpen);break;
			case "home":
			case "ohip_convert_file":
			case "ohip_billing":
			case "ohip_my_record":
			case "non_ohip_billing":
			case "non_ohip_my_record":
			case "referrals":
			case "about": 
				if (props.mobileOpen) props.setMobileOpen(false);
				setSelectedItem(key);
			  	break;
			
			default: break;
		}
		
	}
	return (
	    <div>
	      <List component="nav">
	          <ListItem button key="Home" dense={true} selected={selectedItem=="home"} onClick={menuClick("home")}>
				<ListItemIcon><HomeIcon color="inherit"/></ListItemIcon>
				<Link to="/" className={classes.link}>
	            	<ListItemText primary="Home" />
				</Link>
	          </ListItem>
			  <ListItem button key="Accounting" dense={true} onClick={menuClick("accounting")}>
				<ListItemIcon><FolderOpenIcon color="inherit"/></ListItemIcon>
				<ListItemText primary="Accounting" />
				{accountingMenuOpen ? <ExpandLess /> : <ExpandMore />}
	          </ListItem>
			  <Collapse in={accountingMenuOpen} timeout="auto" unmountOnExit>
				<List>
					<ListItem button key="OHIP" dense={true} onClick={menuClick("ohip")}>
						<ListItemIcon><AccountTreeIcon color="inherit"/></ListItemIcon>
						<ListItemText className={classes.nest_1st_level} primary="OHIP" />
						{ohipMenuOpen ? <ExpandLess /> : <ExpandMore />}
			        </ListItem>
					<Collapse in={ohipMenuOpen} timeout="auto" unmountOnExit>
						<List>
							<ListItem button key="Convert file" dense={true} selected={selectedItem=="ohip_convert_file"} onClick={menuClick("ohip_convert_file")}>
								<ListItemIcon><AutorenewIcon color="inherit"/></ListItemIcon>
								<Link to="/ohip/convert" className={classes.link}>
					            	<ListItemText primary="Convert file"  className={classes.nest_2nd_level}/>
								</Link>
					         </ListItem>
							 <ListItem button key="Billing" dense={true} selected={selectedItem=="ohip_billing"} onClick={menuClick("ohip_billing")}>
								<ListItemIcon><MonetizationOnIcon color="inherit"/></ListItemIcon>
								<Link to="/ohip/billing" className={classes.link}>
					            	<ListItemText primary="Billing" className={classes.nest_2nd_level}/>
								</Link>
					         </ListItem>
							<ListItem button key="My Record" dense={true} selected={selectedItem=="ohip_my_record"} onClick={menuClick("ohip_my_record")}>
								<ListItemIcon><AlbumIcon color="inherit"/></ListItemIcon>
								<Link to="/ohip/myrecord" className={classes.link}>
					            	<ListItemText primary="My Record" className={classes.nest_2nd_level} />
								</Link>
					         </ListItem>
						</List>
					</Collapse>
					<ListItem button key="NON-OHIP" dense={true} onClick={menuClick("non_ohip")}>
						<ListItemIcon><AccountTreeIcon color="inherit"/></ListItemIcon>
						<ListItemText className={classes.nest_1st_level} primary="NON-OHIP" />
						{nonohipMenuOpen ? <ExpandLess /> : <ExpandMore />}
			        </ListItem>
					<Collapse in={nonohipMenuOpen} timeout="auto" unmountOnExit>
						<List>
							 <ListItem button key="non_ohip_billing" dense={true} selected={selectedItem=="non_ohip_billing"} onClick={menuClick("non_ohip_billing")}>
								<ListItemIcon><MonetizationOnIcon color="inherit"/></ListItemIcon>
								<Link to="/non-ohip/billing" className={classes.link}>
					            	<ListItemText primary="Billing" className={classes.nest_2nd_level}/>
								</Link>
					         </ListItem>
							<ListItem button key="non_ohip_my_record" dense={true} selected={selectedItem=="non_ohip_my_record"} onClick={menuClick("non_ohip_my_record")}>
								<ListItemIcon><AlbumIcon color="inherit"/></ListItemIcon>
								<Link to="/non-ohip/myrecord" className={classes.link}>
					            	<ListItemText primary="My Record" className={classes.nest_2nd_level} />
								</Link>
					         </ListItem>
						</List>
					</Collapse>
				</List>
			  </Collapse>
			  <ListItem button key="Referrals" dense={true} selected={selectedItem=="referrals"} onClick={menuClick("referrals")}>
				<ListItemIcon><DynamicFeedIcon color="inherit"/></ListItemIcon>
				<Link to="/referrals" className={classes.link}>
	            	<ListItemText primary="Referrals" />
				</Link>
	          </ListItem>
	          <ListItem button key="About" dense={true} selected={selectedItem=="about"} onClick={menuClick("about")}>
				<ListItemIcon><InfoIcon color="inherit"/></ListItemIcon>
				<Link to="/about" className={classes.link}>
	            	<ListItemText primary="About" />
				</Link>
	          </ListItem>
	      </List>
	    </div>
	  );
}
export default Menubar;