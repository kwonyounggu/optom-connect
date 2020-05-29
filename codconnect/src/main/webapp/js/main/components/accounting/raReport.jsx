import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import 
{
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
} from 'react-table';
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
    },
	gridRight:
	{
		textAlign: 'right'
	},
	gridLeft:
	{
		textAlign: 'left'
	}
});

const currency = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'});
class RAReport extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("INFO constructor() of raReport.jsx: ", props);
		this.state = 
		{
			
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
	/*static getDerivedStateFromProps(nextProps, prevState) 
	{
		console.log("[INFO getDerivedStateFromProps] nextPorps: ", nextProps, "| prevState", prevState);
	 	return {};
	}*/
	componentDidUpdate(prevProps, prevState)
	{
		console.log("[INFO componentDidUpdate(...) of raReport.jsx] nextProps: " , prevProps);
	}
	
	render()
	{
		const {report, fileInfo} = this.props.data;
		const {classes} = this.props;
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
					           <span></span>
					        </Grid>
						</Grid>
				</Grid>
				<Grid item xs={12}>
					<TableContainer>
					<Table aria-label="simple table">
					    <TableHead>
					      <TableRow>
					        <TableCell>ACCOUNTING NUMBER</TableCell>
					        <TableCell>CLAIM NUMBER</TableCell>
					        <TableCell>REGISTRAION NUMBER</TableCell>
					        <TableCell>SERVICE NUMBER</TableCell>
					        <TableCell>SERVICE CODE</TableCell>
							<TableCell>SERVICE DATE</TableCell>
					        <TableCell>AMOUNT SUBMITTED</TableCell>
					        <TableCell>AMOUNT PAID</TableCell>
					      </TableRow>
					    </TableHead>
					    <TableBody>
					    {
							report.hr45.map
							(
								(row, index) => 
								(
							        <TableRow key={index}>
							          <TableCell component="th" scope="row">
							            {row.accountingNumber}
							          </TableCell>
							          <TableCell>{row.claimNumber}</TableCell>
									  <TableCell>{row.healthRegistrationNumber}</TableCell>
									  <TableCell>{row.numberOfServices}</TableCell>
									  <TableCell>{row.serviceCode}</TableCell>
									  <TableCell>{row.serviceDate}</TableCell>
									  <TableCell>{currency.format(row.amountSubmitted)}</TableCell>
									  <TableCell>{currency.format(row.amountPaid)}</TableCell>
							        </TableRow>
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

export default withStyles(styles)(RAReport);