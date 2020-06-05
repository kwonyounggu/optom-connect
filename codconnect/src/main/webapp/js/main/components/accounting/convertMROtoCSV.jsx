import React from "react";
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
import ReactToPrint from "react-to-print";
import PrintIcon from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';

import {StyledBreadcrumb} from "../common/styledBreadcrumb.jsx";

import RAReport from "./raReport.jsx";
import ClaimErrorReport from "./claimErrorReport.jsx";

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
		/*
		fetch(accountingText)
      .then((res) => res.json())
      .then((data) => console.log("[TEST]: ", data.fileNameError));
	  */
		
		//console.info('[REGEX]: ', EXPECTED_FILE_NAME.test("EL990000.123"));

	}
	static getDerivedStateFromProps(nextProps, prevState) 
	{
		if (nextProps.rootReducer.convertFetched && nextProps.rootReducer.data.isItValid)
	 	{
			console.log("[INFO getDerivedStateFromProps of convertMROtoCSV.jsx] called. DATA RECEIVED NOW !!");
		}
		return{};
	}
	componentDidUpdate(prevProps, prevState)
	{
		console.log("[INFO componentDidUpdate(...) of convertMROtoCSV.jsx] nextProps.rootReducer: " , prevProps.rootReducer);
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

		const data = new FormData();
		data.append('mroFile', this.state.mroFile);
		this.setState({returnStatus: 0, returnMessage: ""});
		this.props.convertMroToCSV(data);
	}
	render()
	{
		console.log("INFO: ConvertMROtoCSX.jsx.render() is called, this.props: ", this.props);
		const {classes, rootReducer} = this.props;
		
		let report = null, pageHeader = null;
		if (rootReducer.convertFetched && rootReducer.data.isItValid)
			switch(rootReducer.data.fileInfo.reportType)
			{
				case "P": report = <RAReport ref={(el) => (this.reportRef = el)} data={rootReducer.data} resetMROData={this.props.resetMROData}/>;
						  pageHeader = "Remittance Advice Report";
						  break;
				case "E":
				case "F":
						  report = <ClaimErrorReport ref={(el) => (this.reportRef = el)} data={rootReducer.data} resetMROData={this.props.resetMROData}/>;
						  pageHeader = "Claim Error Report";
						  break;
				case "B":
						  break;
				default: break;
			}
		return (  
				  <div className={classes.root}>
					    <Grid container spacing={1}>
					      <Grid item xs={12}>
					        <Typography variant="h6">
					          {pageHeader !=null ? pageHeader : "Start converting OHIP Remittance Advice, Claim Error MRO files to Excel CSV!"}
					        </Typography>
					      </Grid>
						  <Grid item xs={10}>
					        <MyBreadcrumbs {...this.props} />
					      </Grid>
						  <Grid item xs={2} >
					        {pageHeader && <ReactToPrint
												documentTitle={rootReducer.data.fileInfo.fileName}
									          trigger={
														() =>
															<IconButton color="primary" aria-label="Print the report page" component="span">
													          <PrintIcon />
													        </IconButton>
													  }
									          content={() => this.reportRef}
									        />}
					      </Grid>
						  <Grid item xs={12}>
					       	<hr />
					      </Grid>
						  <Grid item xs={12}>
								<Collapse in={this.state.returnStatus == 2}>
									  <Alert severity="error">{this.state.returnMessage} — check it out!</Alert>
								</Collapse>
						  </Grid>
						  <Grid item xs={12}> {report} </Grid>
					      { report == null &&
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
						  }
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