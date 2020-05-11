import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => 
({
  root: 
  {
		margin: 'auto',
		backgroundColor: '#dbdbdb',
		textAlign: 'center',
		minHeight: '100vh'
  }
}));
const NavRootFooter = (props) => 
{
	const classes = useStyles();
	
	return (
		  <div className={classes.root}>
			    <Grid container justify={"center"} spacing={2}>
			      <Grid item xs={12} sm={6} md={3}>
			        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
			          About
			        </Typography>
			      </Grid>
			      <Grid item xs={12} sm={6} md={3}>
			        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
			          Facebook
			        </Typography>
			      </Grid>
			      <Grid item xs={12} sm={6} md={3}>
			        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
			          Terms & Conditions
			        </Typography>
			      </Grid>
			      <Grid item xs={12} sm={6} md={3}>
			        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
			          Contact us
			        </Typography>
			      </Grid>
			    </Grid>
				<div style={{height: '20px'}} />
				<Typography variant="caption" align={"center"}>
			      © Copyright 2019
			    </Typography>
		  </div>
		);
}
NavRootFooter.propTypes = {};
NavRootFooter.defaultProps = {};

export default NavRootFooter;
