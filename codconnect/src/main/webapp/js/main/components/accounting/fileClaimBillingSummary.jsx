import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme) =>
({

	root: 
    {
		textAlign: 'left',
		padding: '10px'
    }
});

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
	render()
	{
		const claimFileData = JSON.parse(localStorage.getItem("claimFileData"));
		return (
			<Grid container space={1}>
				<Grid item xs={12} >						
					   <span><strong>HEALTH CARE PROVIDER NUMBER:</strong>&nbsp;{claimFileData.careProviderNumber}</span>
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