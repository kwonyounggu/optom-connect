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

import orderBy from "lodash/orderBy";

import { CSVLink } from "react-csv";


const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

const styles = (theme) =>
({

	root: 
    {
		textAlign: 'left',
		padding: '10px'
    }
});
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
		
		const {hr1, hr2, hr3} = props.data.report;
		var csvData =
		[
			["PAYEE NAME:", hr1.title + ". " + hr1.initials + " " + hr1.lastName, "HEALTH CARE PROVIDER:", hr1.healthCareProvider],
			["GROUP NUMBER:", hr1.groupNumber, "PAYMENT DATE: ", hr1.paymentDate],
			["PAYMENT METHOD:", hr1.chequeNumber === "99999999" ? "Direcct Deposit" : (hr1.chequeNumber.length == 0 ? "Pay Patient" : hr1.chequeNumber), "TOTAL AMOUNT:", hr1.totalAmountPayable],
			["RA SEQUENCE:", hr1.remittanceAdviceSequence, "SPECIALITY:", hr1.sepciality],
			["BILLING AGENT:", hr2.addressLineOne, hr3.addressLineTwo, hr3.addressLineThree]
		];
		
		this.state = 
		{
			hr45: props.data.report.hr45,
			order: 'asc',
			orderby: 'accountingNumber',
			csvData: csvData
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
							{/*
							<StyledTableCell>
								 <TableSortLabel onClick={onHandlingSort(report.h45, ""serviceDate)}>
								SERVICE DATE
								</TableSortLabel>
							</StyledTableCell>
					        <StyledTableCell>ACCOUNTING NUMBER</StyledTableCell>
					        <StyledTableCell>CLAIM NUMBER</StyledTableCell>
					        <StyledTableCell>REGISTRAION NUMBER</StyledTableCell>					        
					        <StyledTableCell>SERVICE CODE</StyledTableCell>
							<StyledTableCell>SERVICE NUMBER</StyledTableCell>
					        <StyledTableCell>AMOUNT SUBMITTED</StyledTableCell>
					        <StyledTableCell>AMOUNT PAID</StyledTableCell>
							*/}
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
									  <StyledTableCell>{row.accountingNumber}</StyledTableCell>
							          <StyledTableCell>{row.claimNumber}</StyledTableCell>
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
			</Grid>
			   )
	}
}

export default withStyles(styles)(RAReport);