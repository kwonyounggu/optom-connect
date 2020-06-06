import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { CSVLink } from "react-csv";
import {generateRA1, generateRA2} from "./generateCSV.jsx";

import {menuLinks} from "../common/menuLinks.jsx";

const styles = (theme) =>
({

	root: 
    {
		textAlign: 'left',
		padding: '10px'
    }
});

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 350,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const currency = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'});

class ClaimErrorReport extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO constructor() of claimErrorReport.jsx: ", props);

		this.state = 
		{
			/*
			hr45: props.data.report.hr45,
			order: 'asc',
			orderby: 'accountingNumber',
			csvData_1: generateRA1(props.data.report, currency),
			csvData_2: generateRA2(props.data.report, currency)
			*/
		}
		this.sequenceCount = 0;
	}
	componentDidMount()
	{
		console.log("[INFO in componentDidMount() of claimErrorReport.jsx is called.]");
	}
	componentDidUpdate(prevProps, prevState)
	{
		if (this.props !== prevProps)
		{
			console.log("[INFO componentDidUpdate() of claimErrorReport.jsx] is called with difference between this.props and prevProps");
		}
	}
	componentWillUnmount()
	{
		console.log("[INFO: accounting.jsx -> convertMROtoCSV.jsx -> claimErrorReport.jsx -> componentWillUnmount() window.location changed to] :", window.location, " [from]: ", menuLinks[3]);
		if (window.location.pathname != menuLinks[3]) this.props.resetMROData();
	}
	hx1Record = (hx1) =>
	{
		return (
				<Grid container space={1}>
					<Grid item xs={12} >
						<Typography variant="h6">
						          Group/Provider Header Record  (HX1)
						</Typography>
					</Grid>
					<Grid item xs={12}>&nbsp;</Grid>
					<Grid item xs={6}>
					    <span><strong>OPERATOR NUMBER:</strong>&nbsp;{hx1.operatorNumber}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>PROVIDER NUMBER:</strong>&nbsp;{hx1.providerNumber}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>STATION NUMBER:</strong>&nbsp;{hx1.stationNumber == "000000" ? "N/A": hx1.stationNumber}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>GROUP NUMBER:</strong>&nbsp;{hx1.groupNumber == "0000" ? "N/A": hx1.groupNumber}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>SPCIALITY CODE:</strong>&nbsp;{hx1.speciality}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>CLAIM PROCESS DATE:</strong>&nbsp;{hx1.claimProcessDate}</span>
			        </Grid>
				</Grid>
			   );
	}
	hxhRecord = (obj) =>
	{
		return (
				<Grid container space={1}>
					<Grid item xs={12} >
						<Typography variant="h6">
						          Claim Error Header 1 Record (HXH)
						</Typography>
					</Grid>
					<Grid item xs={12}>&nbsp;</Grid>
					<Grid item xs={6}>
					    <span><strong>HEALTH NUMBER:</strong>&nbsp;{obj.healthNumber}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>VERSION CODE:</strong>&nbsp;{obj.versionCode}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>PATIENT BIRTHDATE:</strong>&nbsp;{obj.patientBirthdate}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ACCOUNTING NUMBER:</strong>&nbsp;{obj.accountingNumber}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>PAYMENT PROGRAM:</strong>&nbsp;{obj.paymentProgram}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>PAYEE:</strong>&nbsp;{obj.payee}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>REFERRING PROVIDER NUMBER:</strong>&nbsp;{obj.referringProviderNumber}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>MASTER NUMBER:</strong>&nbsp;{obj.masterNumber}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>PAYTIENT ADMISSION DATE:</strong>&nbsp;{obj.patientAdmissionDate}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>REFERRING LAB LICENCE:</strong>&nbsp;{obj.referringLabLicence}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>SERVICE LOCATION INDICATOR:</strong>&nbsp;{obj.serviceLocationIndicator}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 1:</strong>&nbsp;{obj.errorCode1}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 2:</strong>&nbsp;{obj.errorCode2}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 3:</strong>&nbsp;{obj.errorCode3}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 4:</strong>&nbsp;{obj.errorCode4}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 5:</strong>&nbsp;{obj.errorCode5}</span>
			        </Grid>
				</Grid>
			   );
	}
	hxtRecord = (obj) =>
	{
		return (
				<Grid container space={1}>
					<Grid item xs={12} >
						<Typography variant="h6">
						          Claim Error Item Record (HXT)
						</Typography>
					</Grid>
					<Grid item xs={12}>&nbsp;</Grid>
					<Grid item xs={6}>
					    <span><strong>SERVICE CODE:</strong>&nbsp;{obj.serviceCode}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>FEE SUBMITTED:</strong>&nbsp;{currency.format(obj.feeSubmitted)}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>NUMBER OF SERVICES:</strong>&nbsp;{obj.numberOfServices}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>SERVICE DATE:</strong>&nbsp;{obj.serviceDate}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>DIAGNOSTIC CODE:</strong>&nbsp;{obj.diagnosticCode}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>EXPLANATORY CODE:</strong>&nbsp;{obj.explanatoryCode}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 1:</strong>&nbsp;{obj.errorCode1}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 2:</strong>&nbsp;{obj.errorCode2}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 3:</strong>&nbsp;{obj.errorCode3}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 4:</strong>&nbsp;{obj.errorCode4}</span>
			        </Grid>
					<Grid item xs={12}>
			           <span><strong>ERROR CODE 5:</strong>&nbsp;{obj.errorCode5}</span>
			        </Grid>
				</Grid>
			   );
	}
	hxrRecord = (obj) =>
	{
		return (
				<Grid container space={1}>
					<Grid item xs={12} >
						<Typography variant="h6">
						          Claim Error Header 2 Record (HXR - RMB Claim)
						</Typography>
					</Grid>
					<Grid item xs={12}>&nbsp;</Grid>
					<Grid item xs={6}>
					    <span><strong>REGISTRATION NUMBER:</strong>&nbsp;{obj.registrationNumber}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>PATIENT LAST NAME:</strong>&nbsp;{obj.patientLastName}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>PATIENT FIRST NAME:</strong>&nbsp;{obj.patientFirstName}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>PATIENT SEX:</strong>&nbsp;{obj.patientSex}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>PROVINCE CODE:</strong>&nbsp;{obj.provinceCode}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 1:</strong>&nbsp;{obj.errorCode1}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 2:</strong>&nbsp;{obj.errorCode2}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 3:</strong>&nbsp;{obj.errorCode3}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 4:</strong>&nbsp;{obj.errorCode4}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>ERROR CODE 5:</strong>&nbsp;{obj.errorCode5}</span>
			        </Grid>
				</Grid>
			   );
	}
	hx8Record = (obj) =>
	{
		return (
				<Grid container space={1}>
					<Grid item xs={12} >
						<Typography variant="h6">
						          Claim Error Explanation Code Message Record (HX8)
						</Typography>
					</Grid>
					<Grid item xs={12}>&nbsp;</Grid>
					<Grid item xs={12}>
					    <span><strong>CODE:</strong>&nbsp;{obj.explanatoryCode},&nbsp;{obj.explanatoryDescription}</span>
			        </Grid>
				</Grid>
			   );
	}
	hx9Record = (obj) =>
	{
		return (
				<Grid container space={1}>
					<Grid item xs={12} >
						<Typography variant="h6">
						          Claim Error Trailer Record (HX9)
						</Typography>
					</Grid>
					<Grid item xs={12}>&nbsp;</Grid>
					<Grid item xs={6}>
					    <span><strong>Count of HXH Records:</strong>&nbsp;{obj.hxhCount}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>Count of HXR Records:</strong>&nbsp;{obj.hxrCount}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>Count of HXT Records:</strong>&nbsp;{obj.hxtCount}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>Count of HX8 Records:</strong>&nbsp;{obj.hx8Count}</span>
			        </Grid>
				</Grid>
			   );
	}
	manifolder = (row) =>
	{
		switch(row.transactionIdentifier)
		{
			case "HX1": return <Paper style={{padding: "20px"}}>{this.hx1Record(row)}</Paper>;
			case "HXH": return <Paper style={{padding: "20px"}}>{this.hxhRecord(row)}</Paper>;
			case "HXR": return <Paper style={{padding: "20px"}}>{this.hxrRecord(row)}</Paper>;
			case "HXT": return <Paper style={{padding: "20px"}}>{this.hxtRecord(row)}</Paper>;
			case "HX8": return <Paper style={{padding: "20px"}}>{this.hx8Record(row)}</Paper>;
			case "HX9": return <Paper style={{padding: "20px"}}>{this.hx9Record(row)}</Paper>;
			default: return;
		}
	}
	render()
	{
		const {claimError, fileInfo} = this.props.data;
		const {classes} = this.props;

		return (
			<Grid container space={1}>
			{
				claimError.map
				(
					(row, index) => 
					(
						<React.Fragment key={index}>
				            <Grid item xs={12}>{this.manifolder(row)}</Grid>
							<Grid item xs={12}>&nbsp;</Grid>
						</React.Fragment>
		      		)
				)
			}
				<Grid item xs={12}>
					<span style={{fontSize: "12px", color: "grey"}}>{"The report is generated from "}{this.props.data.fileInfo.fileName}{"."}</span>
				</Grid>
			</Grid>
			   )
	}
}

export default withStyles(styles)(ClaimErrorReport);