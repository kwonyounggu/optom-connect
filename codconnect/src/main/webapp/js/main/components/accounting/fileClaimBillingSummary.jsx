import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';

const styles = (theme) =>
({

	root: 
    {
		textAlign: 'left',
		padding: '10px'
    }
});

const HtmlTooltip = withStyles((theme) => 
({
  tooltip: 
  {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '100%',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}))(Tooltip);

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

const headCells =
[
	{id: 'ohipCard', label: 'OHIP CARD NUM', labelDesc: 'OHIP Card Number including Version Code'},
	{id: 'patientDob', label: 'PATIENT DOB', labelDesc: 'Patient Date of Birth'},
	{id: 'accountingNumber', label: 'ACCOUNT NUM', labelDesc: 'Accounting Number'},
	{id: 'serviceCode', label: 'SVC CODE 1/2', labelDesc: 'Service Code #1 and or #2'},
	{id: 'numberOfServies', label: 'SVC NUM 1/2', labelDesc: 'Number of Services #1 and or #2'},
	{id: 'serviceDate', label: 'SVC DATE 1/2', labelDesc: 'Service Date #1 and or #2'},
	{id: 'diagnosticCode', label: 'DGNOTIC CODE 1/2', labelDesc: 'Diagnostic Code #1 and or #2'}
];

class FileClaimBillingSummary extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO constructor() of FileClaimBillingSummary.jsx: ", props);

		this.state = 
		{
		}
	}
	componentDidMount()
	{
	}

	componentDidUpdate(prevProps, prevState)
	{
	}
	componentWillUnmount()
	{
	}
	tooltips = () =>
	{
		let claimFileData = JSON.parse(localStorage.getItem("claimFileData"));
		console.log("claimFileData from localStorage: ", claimFileData);
		let claimList = claimFileData.ohipClaimList.map
						(
							(item, key) =>
							(
								<ul key={key}>
									<li>OHIP Number: {item.ohipNumber}</li>
									<li>Patient Dob: {item.patientDob}</li>
									{item.accountingNumber && <li>Accounting Number: {item.accountingNumber}</li>}
									<li>Service Code #1: {item.serviceCode1}</li>
									<li>Number Of Services: {item.numberOfServices1}</li>
									<li>Service Date: {item.serviceDate1}</li>
									<li>Diagnostic Code: {item.diagnosticCode1}</li>
									{item.serviceCode2 && <li>Service Code #2: {item.serviceCode2}</li>}
									{item.numberOfServices2 && <li>Number Of Services: {item.numberOfServices2}</li>}
									{item.serviceDate2 && <li>Service Date: {item.serviceDate2}</li>}
									{item.diagnosticCode2 && <li>Diagnostic Code: {item.diagnosticCode2}</li>}
								</ul>
							)
						);
		let toolTips = 
				(<HtmlTooltip
			        title={
					          <React.Fragment>
					            <Typography color="inherit" align="center">Inside of claim file for provider: {claimFileData.careProviderNumber}</Typography>
								{claimList}
					          </React.Fragment>
			        	  }
			      >
					<InfoIcon fontSize="small" color="primary"/>
      			</HtmlTooltip>);		
		return toolTips;
	}
	render()
	{
		const claimFileData = JSON.parse(localStorage.getItem("claimFileData"));
		return (
			<Grid container space={1}>
				<Grid item xs={12} >						
					   <span><strong>HEALTH CARE PROVIDER NUMBER:</strong>&nbsp;{claimFileData.careProviderNumber}&nbsp;{this.tooltips()}</span>
				</Grid>
				<Grid item xs={12} >&nbsp;</Grid>
				<Grid item xs={12}>
					<TableContainer>
					<Table size="small">
					    <TableHead >
					      <TableRow>
							{
								headCells.map
								(
									(cell, index) =>
									(
										<StyledTableCell title={cell.labelDesc} key={index}>	 			
												{cell.label}
										</StyledTableCell>
									)
								)
							}
					      </TableRow>
					    </TableHead>
					    <TableBody>
					    {
							claimFileData.ohipClaimList.map
							(
								(row, index) => 
								(
							        <StyledTableRow key={index}>
										  <StyledTableCell component="th" scope="row"><span>{row.ohipNumber}</span></StyledTableCell>
										  <StyledTableCell><span>{row.patientDob}</span></StyledTableCell>
								          <StyledTableCell ><span>{row.accountingNumber}</span></StyledTableCell>
										  <StyledTableCell><span>{row.serviceCode1}/{row.serviceCode2}</span></StyledTableCell> 
										  <StyledTableCell><span>{row.numberOfServices1}/{row.numberOfServices2}</span></StyledTableCell>
										  <StyledTableCell><span>{row.serviceDate1}/{row.serviceDate2}</span></StyledTableCell>
										  <StyledTableCell><span>{row.diagnosticCode1}/{row.diagnosticCode2}</span></StyledTableCell>
							        </StyledTableRow>
					      		)
							)
						}					
					    </TableBody>
					  </Table>
					</TableContainer>
				</Grid>
			</Grid>
			   )
	}
}

export default withStyles(styles)(FileClaimBillingSummary);