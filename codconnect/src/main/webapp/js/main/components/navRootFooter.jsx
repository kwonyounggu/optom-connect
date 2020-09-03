import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import TermsConditionPage from "../data/termsfeed-privacy-policy-html-english.html";
import AboutPage from "../data/about.html";
import ContactusPage from "../data/contactus.html";

import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => 
({
  root: 
  {
		margin: 'auto',
		backgroundColor: 'inherit',
		textAlign: 'center',
		width: '90%',
		paddingTop: '30px'
  }
}));
const NavRootFooter = (props) => 
{
	const classes = useStyles();
	const [selected, setSelected] = React.useState(); 
	const [about, setAbout] = React.useState(false); 
	const [termsCondition, setTermsCondition] = React.useState(false); 
	const [contactus, setContactus] = React.useState(false);  
	
	return (
		  <div className={classes.root}>
			    <Grid container justify={"center"} spacing={2}>
			      <Grid item xs={12} sm={6} md={3}>
						<Button style={{textTransform: 'none'}}
										onClick={()=>{setAbout(!about); setTermsCondition(false); setContactus(false); setSelected(AboutPage);}}
										endIcon={about ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								>
									About
						</Button>
			      </Grid>
			      <Grid item xs={12} sm={6} md={3}>
					<Button style={{textTransform: 'none', color: 'grey'}}>Facebook</Button>
			      </Grid>
			      <Grid item xs={12} sm={6} md={3}>
			        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
			          
			        </Typography>
					<Button style={{textTransform: 'none'}}
									onClick={()=>{setAbout(false); setTermsCondition(!termsCondition); setContactus(false);  setSelected(TermsConditionPage);}}
									endIcon={termsCondition ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							>
								Terms & Conditions
					</Button>
			      </Grid>
			      <Grid item xs={12} sm={6} md={3}>
			        <Button style={{textTransform: 'none'}}
									onClick={()=>{setAbout(false); setTermsCondition(false); setContactus(!contactus); setSelected(ContactusPage);}}
									endIcon={contactus ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							>
								Contact us
					</Button>
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
