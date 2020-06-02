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
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import orderBy from "lodash/orderBy";

import { CSVLink } from "react-csv";
import {generateRA} from "./generateCSV.jsx";

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
    maxWidth: 220,
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
	{id: 'serviceDate', label: 'SERVICE DATE'},
	{id: 'accountingNumber', label: 'ACCOUNTING NUMBER'},
	{id: 'claimNumber', label: 'CLAIM NUMBER'},
	{id: 'healthRegistrationNumber', label: 'REGISTRATION NUMBER'},
	{id: 'serviceCode', label: 'SERVICE CODE'},
	{id: 'serviceNumber', label: 'SERVICE NUMBER'},
	{id: 'amountSubmitted', label: 'AMOUNT SUBMITTED'},
	{id: 'amountPaid', label: 'AMOUNT PAID'}
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
			csvData: generateRA(props.data.report, currency)
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
	render()
	{
		const {report, fileInfo} = this.props.data;
		const {classes} = this.props;
		const {hr45, order, orderby} = this.state;
		return (
			<Grid container space={1}>
				<Grid item xs={12}>						
						<Grid container space={1}>
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
					           <span><strong>PAYMENT METHOD:</strong>&nbsp;{report.hr1.chequeNumber === "99999999" ? "Direcct Deposit" : (report.hr1.chequeNumber.length == 0 ? "Pay Patient" : report.hr1.chequeNumber)}</span>
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
					           <CSVLink data={this.state.csvData} filename={fileInfo.fileName+".csv"}>Download {fileInfo.fileName+".csv"} Excel</CSVLink>
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
										<StyledTableCell key={index} sortDirection={orderby === cell.id ? order : false}>
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
							        <StyledTableRow key={index}>
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
									  <StyledTableCell>{currency.format(row.amountPaid)}</StyledTableCell>
							        </StyledTableRow>
					      		)
							)
						}
							<StyledTableRow>
									  <StyledTableCell align="right" colSpan={5}>TOTAL</StyledTableCell>
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
						(<Grid container space={1}>
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
						(<Grid container space={1}>
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
				{report.hr8 && <Grid item xs={12} ><span><strong>Message Facility Record</strong></span></Grid>}
				<Grid item xs={12}>
					{ report.hr8 && 
						(<Grid container space={1}>
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