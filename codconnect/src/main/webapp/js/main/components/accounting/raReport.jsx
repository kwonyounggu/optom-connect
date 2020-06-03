import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import orderBy from "lodash/orderBy";

import { CSVLink } from "react-csv";
import {generateRA1, generateRA2} from "./generateCSV.jsx";

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
/**
backgroundColor: theme.palette.common.black,
		    color: theme.palette.common.white,
 */
const StyledTableCell = withStyles
(
	(theme) => 
	(
		{
		  head: 
		  {
		    fontWeight: 'bold'
		  },
		  body: 
		  {
		  }
		}
	)
)(TableCell);

const StyledTableRow = withStyles
(
	(theme) => 
	(
		{
		  root: 
		  {
		    '&:nth-of-type(odd)': {backgroundColor: theme.palette.action.hover}
		  }
		}
	)
)(TableRow);
const currency = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'});
const headCells =
[
	{id: 'serviceDate', label: 'SVC DATE', labelDesc: 'Service Date'},
	{id: 'accountingNumber', label: 'ACCOUNT NUM', labelDesc: 'Accounting Number'},
	{id: 'claimNumber', label: 'CLAIM NUM', labelDesc: 'Claim Number'},
	{id: 'healthRegistrationNumber', label: 'REGSTN NUM', labelDesc: 'Health Registration Number'},
	{id: 'serviceCode', label: 'SVC CODE', labelDesc: 'Service Code'},
	{id: 'serviceNumber', label: 'SVC NUM', labelDesc: 'Service Number'},
	{id: 'amountSubmitted', label: 'AMOUNT SUBMITTED', labelDesc: 'Amount Submitted by You'},
	{id: 'amountPaid', label: 'AMOUNT PAID', labelDesc: 'Amount Paid for You'}
];

class RAReport extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO constructor() of raReport.jsx: ", props);

		this.state = 
		{
			hr45: props.data.report.hr45,
			order: 'asc',
			orderby: 'accountingNumber',
			csvData_1: generateRA1(props.data.report, currency),
			csvData_2: generateRA2(props.data.report, currency)
		}
	}
	componentDidMount()
	{
		/*	
			fetch(accountingText)
	      .then((res) => res.json())
	      .then((data) => console.log("[TEST]: ", data.fileNameError));
		*/
		
		console.log("[INFO in componentDidMount() of jaReport.jsx is called.]");
	}
	/*
	static getDerivedStateFromProps(nextProps, prevState) 
	{
		console.log("[INFO getDerivedStateFromProps] nextPorps: ", nextProps, "| prevState", prevState);
	 	return {hr45: nextProps.data.report.hr45};
	}*/
	componentDidUpdate(prevProps, prevState)
	{
		if (this.props !== prevProps)
		{
			console.log("[INFO componentDidUpdate() of raReport.jsx] is called with difference between this.props and prevProps");
		}
	}
	handleSorting = (cellId) =>
	{
		/*
		this.state.hr45.sort
		(
			(a, b) =>
			{
				switch(cellId)
				{
					case "serviceDate": 
					{
						let dateA = a.serviceDate.split("/");
						let dateB = b.serviceDate.split("/");
						console.log("[INFO sorting]", dateA[0], dateA[1], dateA[2], " | ", dateB[0], dateB[1], dateB[2]);
						return (new Date(dateA[0], dateA[1], dateA[2]) - new Date(dateB[0], dateB[1], dateB[2])).reverse();
					}
					case "accountingNumber":
					{
						return (parseInt(a.accountingNumber) - parseInt(b.accountingNumber));
					}
					case "amountPaid":
					{
						return (a.amountPaid - b.amountPaid);
					}
					default: return;
				}
			}
		).reverse();
		*/
		this.setState((prevState) => ({hr45: orderBy(prevState.hr45, [cellId], [(prevState.order === 'asc') ? 'desc' : 'asc']), orderby: cellId, order: ((prevState.order === 'asc') ? 'desc' : 'asc')}));	
	}
	onSortClick = (cellId) => (event) =>
	{
		this.handleSorting(cellId);
	}
	tableBody = (row) =>
	{
		let txType = row.transactionType; //1: original claim, 2: adjustment to original claim
		let explanatory = row.explanatoryCode.length > 0;
		let color = null;
		
		let txTypeDesc = (txType == 1 ? "Transaction Type: Original Claim" : "Transaction Type: Adjustment to Original Claim");
		let explantoryCodeDesc = "Explantory Code: " + (explanatory ? (row.explanatoryCode + ", " + row.explanatoryCodeDesc) : "N/A"); //row.explanatoryCode + ", " + row.explanatoryCodeDesc
		
		if (txType == 2 && explanatory) 
		{
			color = {color: "#a84a32"};
		}
		else if (txType == 2) 
		{
			color = {color: "#32a860"};
		}
		else if (explanatory) 
		{
			color = {color: "#ad5834"};
		}
		else color = {color: "inherit"};
		
		let amountPaid =
				(<HtmlTooltip
			        title={
					          <React.Fragment>
					            <Typography color="inherit" align="center">More Information about the record</Typography>
								<ul>
					            <li>{explantoryCodeDesc}</li>
					            <li>{txTypeDesc}</li>
								<li>{"Payment Program: " + row.paymentProgram}</li>
								<li>{"Province Code: " + row.provinceCode}</li>
								<li>{"Version Code: " + row.versionCode}</li>
								</ul>
					          </React.Fragment>
			        	  }
			      >
					<Chip label={currency.format(row.amountPaid)} style={color} variant="outlined" />
					
      			</HtmlTooltip>
				);
				
		return (<React.Fragment>
				  <StyledTableCell component="th" scope="row">
		            <span style={color}>{row.serviceDate}</span>
		          </StyledTableCell>
				  <StyledTableCell>
						<span style={color}>{row.accountingNumber}</span>
				  </StyledTableCell>
		          <StyledTableCell ><span style={color}>{row.claimNumber}</span></StyledTableCell>
				  <StyledTableCell><span style={color}>{row.healthRegistrationNumber}</span></StyledTableCell> 
				  <StyledTableCell align="right"><span style={color}>{row.serviceCode}</span></StyledTableCell>
				  <StyledTableCell><span style={color}>{row.numberOfServices}</span></StyledTableCell>
				  <StyledTableCell><span style={color}>{currency.format(row.amountSubmitted)}</span></StyledTableCell>
				  <StyledTableCell>{amountPaid}</StyledTableCell>
				</React.Fragment>
				);
	}
	render()
	{
		const {report, fileInfo} = this.props.data;
		const {classes} = this.props;
		const {hr45, order, orderby} = this.state;
		return (
			<Grid container space={1}>
				<Grid item xs={12} >						
						<Grid container space={1} style={{padding: "20px"}}>
							<Grid item xs={6}>
					           <span><strong>PAYEE NAME:</strong>&nbsp;{report.hr1.title}.&nbsp;{report.hr1.initials}&nbsp;{report.hr1.lastName}</span>
					        </Grid>
							<Grid item xs={6}>
					           <span><strong>HEALTH CARE PROVIDER:</strong>&nbsp;{report.hr1.healthCareProvider}</span>
					        </Grid>
					        <Grid item xs={6}>
					           <span><strong>GROUP NUMBER:</strong>&nbsp;{report.hr1.groupNumber === "0000" ? "N/A" : report.hr1.groupNumber}</span>
					        </Grid>
							<Grid item xs={6}>
					           <span><strong>PAYMENT DATE:</strong>&nbsp;{report.hr1.paymentDate}</span>
					        </Grid>
							<Grid item xs={6}>
					           <span><strong>PAYMENT METHOD:</strong>&nbsp;{report.hr1.chequeNumber === "99999999" ? "Direct Deposit" : (report.hr1.chequeNumber.length == 0 ? "Pay Patient" : report.hr1.chequeNumber)}</span>
					        </Grid>
							<Grid item xs={6}>
					           <span><strong>TOTAL AMOUNT:</strong>&nbsp;{currency.format(report.hr1.totalAmountPayable)}</span>
					        </Grid>
							<Grid item xs={6}>
					           <span><strong>BILLING AGENT:</strong>&nbsp;{report.hr2.addressLineOne}</span>
					        </Grid>
							<Grid item xs={6}>
					           <span><strong>SOURCE FILE:</strong>&nbsp;{fileInfo.fileName}</span>
					        </Grid>
							<Grid item xs={6}>	
								<span>{report.hr3.addressLineTwo}&nbsp;{report.hr3.addressLineThree}</span>					      
					        </Grid>
							<Grid item xs={6}>
					           <CSVLink data={this.state.csvData_1} filename={fileInfo.fileName+"_1.csv"}>Download {fileInfo.fileName+"_1.csv"}</CSVLink>&nbsp;&amp;&nbsp;
					           <CSVLink data={this.state.csvData_2} filename={fileInfo.fileName+"_2.csv"}>{fileInfo.fileName+"_2.csv"}</CSVLink>
					        </Grid>
						</Grid>
				</Grid>
				<Grid item xs={12} >&nbsp;</Grid>
				<Grid item xs={12}>
					<TableContainer>
					<Table size="small" aria-label="HR45">
					    <TableHead >
					      <TableRow>
							{
								headCells.map
								(
									(cell, index) =>
									(
										<StyledTableCell title={cell.labelDesc} key={index} sortDirection={orderby === cell.id ? order : false}>
								 			<TableSortLabel onClick={this.onSortClick(cell.id)}
													active={orderby === cell.id}
													direction={orderby === cell.id ? order : 'asc'}
										    >
												{cell.label}
											</TableSortLabel>
										</StyledTableCell>
									)
								)
							}
					      </TableRow>
					    </TableHead>
					    <TableBody>
					    {
							hr45.map
							(
								(row, index) => 
								(
							        <StyledTableRow key={index}>{this.tableBody(row)}
										{/*
							          <StyledTableCell component="th" scope="row">
							            {row.serviceDate}
							          </StyledTableCell>
									  <StyledTableCell title={row.explanatoryCode.length > 0 ? ("Explanatory Code: " + row.explanatoryCode + ", Tx Type: " + row.transactionType) : ("Explanatory Code: N/A, Tx Type: " + row.transactionType)}>
											<span style={row.explanatoryCode.length > 0 ? {color: "#ad5834"} : {color: "inherit"}}>{row.accountingNumber}</span>
									  </StyledTableCell>
							          <StyledTableCell >{row.claimNumber}</StyledTableCell>
									  <StyledTableCell>{row.healthRegistrationNumber}</StyledTableCell> 
									  <StyledTableCell align="right">{row.serviceCode}</StyledTableCell>
									  <StyledTableCell>{row.numberOfServices}</StyledTableCell>
									  <StyledTableCell>{currency.format(row.amountSubmitted)}</StyledTableCell>
									  <StyledTableCell>{currency.format(row.amountPaid)}</StyledTableCell>*/}
							        </StyledTableRow>
					      		)
							)
						}
							<StyledTableRow>
									  <StyledTableCell align="right" colSpan={5}><span><strong>TOTAL</strong></span></StyledTableCell>
									  <StyledTableCell>{report.total.numberOfServices}</StyledTableCell>
									  <StyledTableCell>{currency.format(report.total.amountSubmitted)}</StyledTableCell>
									  <StyledTableCell>{currency.format(report.total.amountPaid)}</StyledTableCell>
							</StyledTableRow>						
					    </TableBody>
					  </Table>
					</TableContainer>
				</Grid>
				{report.hr6 && <Grid item xs={12} >&nbsp;</Grid>}
				<Grid item xs={12}>
					{ report.hr6 && 
						(<Grid container space={1} style={{padding: "20px"}}>
							<Grid item xs={12}>
					           <span><strong>Balance Forward Record</strong></span>
					        </Grid>
							<Grid item xs={12}>
					           <span>Amount Brought Forward  – Claims Adjustment:&nbsp;{currency.format(report.hr6.amtBrtFwdClaimsAdjustment)}</span>
					        </Grid>
					        <Grid item xs={12}>
					           <span>Amount Brought Forward  – Advances:&nbsp;{currency.format(report.hr6.amtBrtFwdClaimsAdvances)}</span>
					        </Grid>
							<Grid item xs={12}>
					           <span>Amount Brought Forward  – Reductions:&nbsp;{currency.format(report.hr6.amtBrtFwdReductions)}</span>
					        </Grid>
							<Grid item xs={12}>
					           <span>Amount Brought Forward  – Other Deductions:&nbsp;{currency.format(report.hr6.amtBrtFwdOtherDeductions)}</span>
					        </Grid>
						</Grid>
						)
					}
				</Grid>
				{report.hr7 && <Grid item xs={12} >&nbsp;</Grid>}
				<Grid item xs={12}>
					{ report.hr7 && 
						(<Grid container space={1} style={{padding: "20px"}}>
							<Grid item xs={12}>
					           <span><strong>Accounting Transaction Record</strong></span>
					        </Grid>
							<Grid item xs={12} >&nbsp;</Grid>
							<Grid item xs={12}>
					           <span>Transaction Code[{report.hr7.txCodeOrg}]:&nbsp;{report.hr7.transactionCode}</span>
					        </Grid>
					        <Grid item xs={12}>
					           <span>Transaction Date:&nbsp;{report.hr7.transactionDate}</span>
					        </Grid>
							<Grid item xs={12}>
					           <span>Transaction Amount:&nbsp;{currency.format(report.hr7.transactionAmount)}</span>
					        </Grid>
							<Grid item xs={12}>
					           <span>Transaction Message:&nbsp;{report.hr7.transactionMessage}</span>
					        </Grid>
						</Grid>
						)
					}
				</Grid>
				{report.hr8 && <Grid item xs={12} >&nbsp;</Grid>}
				{report.hr8 && <Grid item xs={12} style={{paddingLeft: "20px"}}><span><strong>Message Facility Record</strong></span></Grid>}
				<Grid item xs={12}>
					{ report.hr8 && 
						(<Grid container space={1} style={{paddingLeft: "20px"}}>
							{
								report.hr8.map
								(
									(row, index) =>
										(<Grid item xs={12} key={index}>
								           <span>{row.messageText.startsWith("*") ? <br /> : row.messageText}</span>
								        </Grid>
										)
								)
							}
						</Grid>
						)
					}
				</Grid>
			</Grid>
			   )
	}
}

export default withStyles(styles)(RAReport);