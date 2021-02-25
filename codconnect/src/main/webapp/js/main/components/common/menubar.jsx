import React from 'react';
import {Link} from "react-router-dom";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AlbumIcon from '@material-ui/icons/Album';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import VisibilityIcon from "@material-ui/icons/Visibility";

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { ListItemIcon } from '@material-ui/core';

import {menuLinks} from "./menuLinks.jsx";

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
		  },
		  activeItem:
		  {
			color: "blue"
		  }
	}
));

const Menubar = (props) =>
{
	const classes = useStyles();
	const [accountingMenuOpen, setAccuntingMenuOpen] = React.useState(true);
	const [ohipMenuOpen, setOhipMenuOpen] = React.useState(true);
	const [nonohipMenuOpen, setNonohipMenuOpen] = React.useState(true);
	const [referralsMenuOpen, setReferralsMenuOpen] = React.useState(true);
	const [selectedItem, setSelectedItem] = React.useState(props.location.pathname);
	
	console.log("[INFO Menubar() of menubar.jsx ]: props.location.pathname", props.location.pathname, "|", props);
	//https://material-ui.com/components/lists/
	const menuClick = (key) => () =>
	{
		console.log("[INFO menuClick() of menubar.jsx]: ", key, ":", props);

		switch(key)
		{
			case "/accounting": setAccuntingMenuOpen(!accountingMenuOpen); break;
			case "/accounting/ohip": setOhipMenuOpen(!ohipMenuOpen); break;
			case "/accounting/non_ohip": setNonohipMenuOpen(!nonohipMenuOpen);break;
			case "/referrals": setReferralsMenuOpen(!referralsMenuOpen); break;
			case "/":
			case "/accounting/ohip/convert": //if rootReducer.data is not null, nullify by sending DATA_RESET
			case "/accounting/ohip/billing":
			case "/accounting/ohip/myrecord":
			case "/accounting/non-ohip/billing":
			case "/accounting/non-ohip/myrecord":
			case "/referrals/patient_referral_form":
			case "/referrals/ocular_exam_report":
			case "/referrals/blind_low_vision_referral_form":
			case "/referrals/blind_low_vision_early_report":
			case "/about": 
				if (!props.isLargeScreen) props.setDrawerOpen(false);
				//else props.changeBodyMargin(true);
				setSelectedItem(key);
			  	break;
			
			default: break;
		}
		//This is a right place to remove a temporay GlobalAlert message
		if (props.alertState.turnOn && props.alertState.level == 2)//turn it (GloablAlert)off due to a menu change
		{
			props.addAlertMessage({turnOn: false, type: "error", text: "", level: 2});
		}
	}
	return (
	    <div>
	      <List component="nav">
	          <ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[0]} selected={selectedItem==menuLinks[0]} onClick={menuClick(menuLinks[0])}>
				<ListItemIcon color="inherit"><HomeIcon  color="primary" fontSize="small"/></ListItemIcon>
	            <ListItemText primary="Home" />
	          </ListItem>
			  <ListItem button classes={{ selected: classes.activeItem }} dense={true} selected={selectedItem==menuLinks[1]} onClick={menuClick(menuLinks[1])}>
				<ListItemIcon><FolderOpenIcon color="inherit" fontSize="small"/></ListItemIcon>
				<ListItemText primary="Accounting" />
				{accountingMenuOpen ? <ExpandLess /> : <ExpandMore />}
	          </ListItem>
			  <Collapse in={accountingMenuOpen} timeout="auto" unmountOnExit>
				<List>
					<ListItem button classes={{ selected: classes.activeItem }} dense={true} selected={selectedItem==menuLinks[2]} onClick={menuClick(menuLinks[2])}>
						<ListItemIcon><AccountTreeIcon color="inherit" fontSize="small"/></ListItemIcon>
						<ListItemText className={classes.nest_1st_level} primary="OHIP" />
						{ohipMenuOpen ? <ExpandLess /> : <ExpandMore />}
			        </ListItem>
					<Collapse in={ohipMenuOpen} timeout="auto" unmountOnExit>
						<List>
							<ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[3]} selected={selectedItem==menuLinks[3]} onClick={menuClick(menuLinks[3])}>
								<ListItemIcon><AutorenewIcon color="inherit" fontSize="small"/></ListItemIcon>
					            <ListItemText primary="Convert file"  className={classes.nest_2nd_level}/>
					         </ListItem>
							 <ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[4]} selected={selectedItem==menuLinks[4]} onClick={menuClick(menuLinks[4])}>
								<ListItemIcon><MonetizationOnIcon color="inherit" fontSize="small"/></ListItemIcon>
					            <ListItemText primary="Billing" className={classes.nest_2nd_level}/>
					         </ListItem>
							<ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[5]} selected={selectedItem==menuLinks[5]} onClick={menuClick(menuLinks[5])}>
								<ListItemIcon><AlbumIcon color="inherit" fontSize="small"/></ListItemIcon>
					            <ListItemText primary="My Record" className={classes.nest_2nd_level} />
					         </ListItem>
						</List>
					</Collapse>
					<ListItem button classes={{ selected: classes.activeItem }} dense={true} selected={selectedItem==menuLinks[6]} onClick={menuClick(menuLinks[6])}>
						<ListItemIcon><AccountTreeIcon color="inherit" fontSize="small"/></ListItemIcon>
						<ListItemText className={classes.nest_1st_level} primary="NON-OHIP" />
						{nonohipMenuOpen ? <ExpandLess /> : <ExpandMore />}
			        </ListItem>
					<Collapse in={nonohipMenuOpen} timeout="auto" unmountOnExit>
						<List>
							 <ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[7]} selected={selectedItem==menuLinks[7]} onClick={menuClick(menuLinks[7])}>
								<ListItemIcon><MonetizationOnIcon color="inherit" fontSize="small"/></ListItemIcon>
					            <ListItemText primary="Billing" className={classes.nest_2nd_level}/>
					         </ListItem>
							<ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[8]} selected={selectedItem==menuLinks[8]} onClick={menuClick(menuLinks[8])}>
								<ListItemIcon><AlbumIcon color="inherit" fontSize="small"/></ListItemIcon>
					            <ListItemText primary="My Record" className={classes.nest_2nd_level} />
					         </ListItem>
						</List>
					</Collapse>
				</List>
			  </Collapse>
	
			  <ListItem button classes={{ selected: classes.activeItem }} dense={true} selected={selectedItem==menuLinks[9]} onClick={menuClick(menuLinks[9])}>
				<ListItemIcon><DynamicFeedIcon color="inherit" fontSize="small"/></ListItemIcon>
				<ListItemText primary="Referrals" />
				{referralsMenuOpen ? <ExpandLess /> : <ExpandMore />}
	          </ListItem>
			  <Collapse in={referralsMenuOpen} timeout="auto" unmountOnExit>
				<List>
					<ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[12]} selected={selectedItem==menuLinks[12]} onClick={menuClick(menuLinks[12])}>
						<ListItemIcon><VisibilityIcon color="inherit" fontSize="small"/></ListItemIcon>
			            <ListItemText primary="Patient Referrals Form" className={classes.nest_1st_level}/>
			        </ListItem>
					<ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[13]} selected={selectedItem==menuLinks[13]} onClick={menuClick(menuLinks[13])}>
						<ListItemIcon><VisibilityIcon color="inherit" fontSize="small"/></ListItemIcon>
			            <ListItemText primary="Ocular Exam Report" className={classes.nest_1st_level} />
			        </ListItem>
					<ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[14]} selected={selectedItem==menuLinks[14]} onClick={menuClick(menuLinks[14])}>
						<ListItemIcon><VisibilityIcon color="inherit" fontSize="small"/></ListItemIcon>
			            <ListItemText primary="Low Vision Referrals Form" className={classes.nest_1st_level}/>
			         </ListItem>
					<ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[15]} selected={selectedItem==menuLinks[15]} onClick={menuClick(menuLinks[15])}>
						<ListItemIcon><VisibilityIcon color="inherit" fontSize="small"/></ListItemIcon>
			            <ListItemText primary="Low Vision Eearly Report" className={classes.nest_1st_level} />
			         </ListItem>
				</List>
			   </Collapse>
	
	
	          <ListItem button classes={{ selected: classes.activeItem }} dense={true} component={Link} to={menuLinks[10]} selected={selectedItem==menuLinks[10]} onClick={menuClick(menuLinks[10])}>
				<ListItemIcon><InfoIcon color="inherit" fontSize="small"/></ListItemIcon>
	            <ListItemText primary="About" />
	          </ListItem>
	      </List>
	    </div>
	  );
}
export default Menubar;