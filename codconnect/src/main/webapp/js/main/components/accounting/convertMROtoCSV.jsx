import React from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

import accountingText from "../../data/accountingText.json";

//const json = require("../../data/accountingText.json");
import {StyledBreadcrumb} from "../common/styledBreadcrumb.jsx";

const styles = (theme) =>
({
	rootOrg:	
	{
		display: 'flex',
			flexGrow: 1,
			flexDirection: 'row',
	},
	root: 
    {
		textAlign: 'left',
		padding: '10px'
    },
	link:
	{
		display: 'flex'
	},
	breadcurmbIcon: 
	{
	    marginRight: theme.spacing(0.5),
	    width: 20,
	    height: 20
    },
	paper:
	{
		backgroundColor: '#fcfaf5',
		padding: '10px 25px 10px 25px'
	},
	wrapper: 
	{
	    margin: theme.spacing(1),
	    position: 'relative'
	},
	buttonProgress: 
	{
	    color: green[500],
	    position: 'absolute',
	    top: '50%',
	    left: '50%',
	    marginTop: -12,
	    marginLeft: -12,
	}
});

const MyBreadcrumbs = (props) => 
{
	//console.info("MyBreadscrumbs: props, ", props.location.pathname);
	let path = props.location.pathname.split("\/");
	/*console.info("MyBreadscrumbs: path, ", path);
	path.map((item, i)=>
		{
			if (i==0) return ;
			else 
			{
				let index = props.location.pathname.indexOf(item);
				if (index > 0) console.info(props.location.pathname.substring(0, index+item.length));
				return item;
			}	
		}
	)
  */
  return (
		    <Breadcrumbs aria-label="breadcrumb" maxItems={2}>
				{
					path.map
					(
						(item, i) =>
						(
						   (i == 0) ? 
								<StyledBreadcrumb key={i} component="a" href="/" label="Home" icon={<HomeIcon fontSize="small" />}/> : 
								<StyledBreadcrumb key={i} component="a" href={props.location.pathname.substring(0, props.location.pathname.indexOf(item)+item.length)} label={item}/>
						)
					)
				}
		    </Breadcrumbs>
		  );
}

const MRO_MAX_FILE_SIZE = 1000000;
const EXPECTED_FILE_NAME = /(^[EFPX]{1})+([ABCDEFGHIJKL]{1})+([0-9]{4,6})+(.\d{3})$/;
class ConvertMROtoCSV extends React.Component
{
	constructor(props)
	{
		super(props);
		//console.log("INFO constructor() of ConvertMROtoCSV.jsx: ", props);
		this.state = 
		{
			isFileNameValid: true,
			isFileSizeValid: false,
			isFileChosen: false,
			converting: false,
			mroFile: null
		}
	}
	componentDidMount()
	{
		
		fetch(accountingText)
      .then((res) => res.json())
      .then((data) => console.log("[TEST]: ", data.fileNameError));

		
		//console.info('[REGEX]: ', EXPECTED_FILE_NAME.test("EL990000.123"));

	}
	/*static getDerivedStateFromProps(nextProps, prevState) 
	{
		console.log("[INFO getDerivedStateFromProps] nextPorps: ", nextProps, "| prevState", prevState);
	 	return {};
	}*/
	componentDidUpdate(prevProps, prevState)
	{
		console.log("[INFO componentDidUpdate(...) of convertMROtoCSV.jsx] nextProps.rootReducer: " , prevProps.rootReducer);
	}
	renderTemp()
	{
		return(<MyBreadcrumbs {...this.props} />)
	}
	onChangeHandler = (event) =>
	{
		if (!event.target.files[0]) return; //it may be undefined due to unselection
    	console.log("file: ", event.target.files[0], "|", typeof event.target.files[0].size);
		let fileName = event.target.files[0].name;
		
		this.setState
		(
			{
				isFileNameValid: EXPECTED_FILE_NAME.test(fileName), 
				isFileChosen: true,
				isFileSizeValid: event.target.files[0].size < MRO_MAX_FILE_SIZE,
				mroFile: event.target.files[0],
				returnStatus: 0, //0: initial, 1:successful, 3: errorneous
				returnMessage: "" //from the servlet
			}
		);
	}
	onConvertButtonClick = () =>
	{
		this.setState({converting: true});
		//if there found an error, then display the error message and setState({converting: false})
		//else 
		//		1) display none this section
		//		2) display summary of the table
		//		3) display the converted file to download
		//		4) display a button to goback to more conversion
		const data = new FormData();
		data.append('mroFile', this.state.mroFile);
		this.setState({returnStatus: 0, returnMessage: ""});
		this.props.convertMroToCSV(data);
	}
	render()
	{
		console.log("INFO: ConvertMROtoCSX.jsx.render() is called, this.props: ", this.props);
		const {classes} = this.props;
		return (  
				  <div className={classes.root}>
					    <Grid container spacing={1}>
					      <Grid item xs={12}>
					        <Typography variant="h6">
					          Start converting OHIP MRO files in Health Reconciliation to Excel CSV.
					        </Typography>
					      </Grid>
						  <Grid item xs={12}>
					        <MyBreadcrumbs {...this.props} />
					      </Grid>
						  <Grid item xs={12}>
					       	<hr />
					      </Grid>
						  <Grid item xs={12}>
								<Collapse in={this.state.returnStatus == 2}>
									  <Alert severity="error">{this.state.returnMessage} — check it out!</Alert>
								</Collapse>
						  </Grid>
					      <Grid item xs={12}>
					       	<Paper variant="outlined" className={classes.paper}>
								<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
									<Grid item>
										<Typography style={{fontSize: '14px', fontWeight: 'bold'}} color="primary" gutterBottom>
								          Please choose a valid MRO file having a three digit extension.
								        </Typography>
									</Grid>
									<Grid item>
										<input type="file" name="file" pattern=".^[0-9]{3}" onChange={this.onChangeHandler} disabled={this.state.converting}/>
									</Grid>
									<Grid item>
										<Collapse in={!this.state.isFileNameValid && this.state.isFileChosen}>
									        <Alert severity="error">The file name is not one expected — check it out!</Alert>
									    </Collapse>
										<Collapse in={!this.state.isFileSizeValid && this.state.isFileChosen}>
									        <Alert severity="error">The file size is not supported — check it out!</Alert>
									    </Collapse>
									</Grid>
									<Grid item>
										<div className={classes.wrapper}>
									        <Button
									          variant="contained"
									          color="primary"
									          disabled={this.state.converting || !(this.state.isFileChosen && this.state.isFileNameValid && this.state.isFileSizeValid)}
									          onClick={this.onConvertButtonClick}
									        >
									          Convert to Excel CSV
									        </Button>
									        {this.state.converting && <CircularProgress size={24} className={classes.buttonProgress} />}
									    </div>
									</Grid>
								</Grid>
							</Paper>
					      </Grid>
					      <Grid item xs={12}>
					        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
					          Terms & Conditions
					        </Typography>
					      </Grid>
					      <Grid item xs={12}>
					        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
					          Contact us
					        </Typography>
					      </Grid>
					    </Grid>
				  </div>
				);
	}
}

export default withStyles(styles)(ConvertMROtoCSV);

/***********************************************************
		let extension = fileName.substring(fileName.lastIndexOf('.') + 1);
	    console.info("file extension is supported: ", extension, "|", extension.length, "|", /^\d+$/.test(extension), "|", (extension.length == 3) && /^\d+$/.test(extension));
		this.setState
		(
			{
				isFileExtensionValid: (extension.length == 3) && /^\d+$/.test(extension), 
				isFileChosen: true,
				isFileSizeValid: event.target.files[0].size < MRO_MAX_FILE_SIZE,
				mroFile: event.target.files[0],
				returnStatus: 0, //0: initial, 1:successful, 3: errorneous
				returnMessage: "" //from the servlet
			}
		);
		
		--------------
		
		//console.info("[REGEX]: ", /(^[EFPX]{1})+([ABCDEFGHIJKL]{1})+([0-9]{4,6})+(.\d{3})$/.test("EL990000.123"));
 */