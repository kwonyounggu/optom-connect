import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import TermsConditionPage from "../data/termsfeed-privacy-policy-html-english.html";
import AboutPage from "../data/about.html";
import ContactusPage from "../data/contactus.html";
//import DOMPurify from "dompurify";
import InnerHTML from 'dangerously-set-html-content'

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
										onClick={()=>{about? setSelected() : setSelected(AboutPage); setAbout(!about); setTermsCondition(false); setContactus(false);}}
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
									onClick={()=>{setAbout(false); termsCondition? setSelected() : setSelected(TermsConditionPage); setTermsCondition(!termsCondition); setContactus(false);}}
									endIcon={termsCondition ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							>
								Terms & Conditions
					</Button>
			      </Grid>
			      <Grid item xs={12} sm={6} md={3}>
			        <Button style={{textTransform: 'none'}}
									onClick={()=>{setAbout(false); setTermsCondition(false); contactus? setSelected() : setSelected(ContactusPage); setContactus(!contactus); }}
									endIcon={contactus ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							>
								Contact us
					</Button>
			      </Grid>
				  <Grid item xs={12} style={{paddingLeft: '5%', paddingRight: '5%'}}>
						<Collapse in={selected != null}>
							<InnerHTML html={selected} style={{textAlign: 'left', padding: '10px', borderRadius: '3px', border: '1px solid #DCDCDC'}} />
							{/*<div dangerouslySetInnerHTML={ {__html: selected} } style={{textAlign: 'left', padding: '10px', borderRadius: '3px', border: '1px solid #DCDCDC'}}/>*/}
					    </Collapse>
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
