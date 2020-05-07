import React from 'react';
import {Link} from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Menubar = () => (
    <div>
      <List component="nav">
          <ListItem button key="Home">
			<Link to="/">
            	<ListItemText inset primary="Home" />
			</Link>
          </ListItem>
		  <ListItem button key="Accounting">
			<ListItemText inset primary="Accounting" />
          </ListItem>
		  <Collapse in={true} timeout="auto" unmountOnExit>
			<List>
				<ListItem button key="OHIP">
					<ListItemText inset primary="OHIP" />
		        </ListItem>
				<Collapse in={true} timeout="auto" unmountOnExit>
					<List>
						<ListItem button key="Convert to CSV">
							<Link to="/ohip/convert">
				            	<ListItemText inset primary="Convert to CSV" />
							</Link>
				         </ListItem>
						 <ListItem button key="Billing">
							<Link to="/ohip/billing">
				            	<ListItemText inset primary="Billing" />
							</Link>
				         </ListItem>
						<ListItem button key="My Record">
							<Link to="/ohip/myrecord">
				            	<ListItemText inset primary="My Record" />
							</Link>
				         </ListItem>
					</List>
				</Collapse>
				<ListItem button key="NON-OHIP">
					<ListItemText inset primary="NON-OHIP" />
		        </ListItem>
				<Collapse in={true} timeout="auto" unmountOnExit>
					<List>
						 <ListItem button key="Billing">
							<Link to="/non-ohip/billing">
				            	<ListItemText inset primary="Billing" />
							</Link>
				         </ListItem>
						<ListItem button key="My Record">
							<Link to="/non-ohip/myrecord">
				            	<ListItemText inset primary="My Record" />
							</Link>
				         </ListItem>
					</List>
				</Collapse>
			</List>
		  </Collapse>
          <ListItem button key="Referrals">
			<Link to="/referrals">
            	<ListItemText inset primary="Referrals" />
			</Link>
          </ListItem>
		  <ListItem button key="About">
			<Link to="/about">
            	<ListItemText inset primary="About" />
			</Link>
          </ListItem>
      </List>
    </div>
  );

export default Menubar;