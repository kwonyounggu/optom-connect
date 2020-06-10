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

class BatchEditReport extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO constructor() of batchEditReport.jsx: ", props);

		this.state = 
		{
		}
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
		console.log("[INFO: accounting.jsx -> convertMROtoCSV.jsx -> batchEditReport.jsx -> componentWillUnmount() window.location changed to] :", window.location, " [from]: ", menuLinks[3]);
		if (window.location.pathname != menuLinks[3]) this.props.resetMROData();
	}
	hb1Record = (hb1) =>
	{
		return (
				<Grid container space={1}>
					<Grid item xs={12} >
						<Typography variant="h6">
						          Batch Edit Report Record
						</Typography>
					</Grid>
					<Grid item xs={12}>&nbsp;</Grid>
					<Grid item xs={6}>
					    <span><strong>BATCH NUMBER:</strong>&nbsp;{hb1.batchNumber}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>OPERATOR NUMBER:</strong>&nbsp;{hb1.operatorNumber == "000000" ? "": hb1.operatorNumber}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>BATCH CREATE DATE:</strong>&nbsp;{hb1.batchCreateDate == "1111/11/11" ? "": hb1.batchCreateDate}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>BATCH PROCESS DATE:</strong>&nbsp;{hb1.batchProcessDate == "1111/11/11" ? "": hb1.batchProcessDate}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>MICRO START:</strong>&nbsp;{hb1.microStart}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>MICRO END:</strong>&nbsp;{hb1.microEnd}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>MICRO TYPE:</strong>&nbsp;{hb1.microType}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>GROUP NUMBER:</strong>&nbsp;{hb1.groupNumber == "0000" ? "": hb1.groupNumber}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>PROVIDER NUMBER:</strong>&nbsp;{hb1.providerNumber == "000000" ? "": hb1.providerNumber}</span>
			        </Grid>
					<Grid item xs={6}>
			           <span><strong>NUMBER OF CLAIMS:</strong>&nbsp;{hb1.numberOfClaims}</span>
			        </Grid>
					<Grid item xs={6}>
					    <span><strong>NUMBER OF RECORDS:</strong>&nbsp;{hb1.numberOfRecords}</span>
			        </Grid>
					<Grid item xs={6}>
						<span><strong>BATCH SEQUENCE NUMBER:</strong>&nbsp;{hb1.batchSequenceNumber == "0000" ? "": hb1.batchSequenceNumber}</span>
			        </Grid>
					<Grid item xs={12}>
					    <span><strong>EDIT MESSAGE:</strong>&nbsp;{hb1.editMessage}</span>
			        </Grid>
				</Grid>
			   );
	}
	render()
	{
		const {batchEdit, fileInfo} = this.props.data;
		const {classes} = this.props;

		return (
			<Grid container space={1}>
			{
				batchEdit.map
				(
					(row, index) => 
					(
						<React.Fragment key={index}>
				            <Grid item xs={12}>
								<Paper style={{padding: "20px"}}>
									{this.hb1Record(row)}
								</Paper>
							</Grid>
							<Grid item xs={12}>&nbsp;</Grid>
						</React.Fragment>
		      		)
				)
			}
				<Grid item xs={12}>
					<span style={{paddingLeft: "20px", fontSize: "12px", color: "grey"}}>{"The report is generated from "}{this.props.data.fileInfo.fileName}{"."}</span>
				</Grid>
			</Grid>
			   )
	}
}

export default withStyles(styles)(BatchEditReport);

