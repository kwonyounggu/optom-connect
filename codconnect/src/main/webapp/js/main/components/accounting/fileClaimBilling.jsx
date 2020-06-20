import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputMask from "react-input-mask";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = (theme) =>
(
	{
		root: 
		{
		    '& .MuiTextField-root': 
			{
		      margin: theme.spacing(1),
		      width: '25ch'
		    }
		 },
		 select:
		 {
			minWidth: '120px'
		 }
	}
);

const EXPECTED_FILE_NAME = /(^[BEFPX]{1})+([ABCDEFGHIJKL]{1})+([0-9]{4,6})+(.\d{3})$/;
const currency = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'});
const numberOfServices = [1, 2, 3, 4, 5];
class FileClaimBilling extends React.Component
{
	constructor(props)
	{
		super(props);
		//console.log("INFO constructor() of fileClaimBilling.jsx: ", props);
		this.state = 
		{
			ohipNumber: props.rootReducer.fileClaimBilling.ohipNumber,
			patientDob: new Date(),
			accountingNumber: props.rootReducer.fileClaimBilling.accountingNumber,
			careProviderNumber: props.rootReducer.fileClaimBilling.careProviderNumber,
			serviceCode: props.rootReducer.fileClaimBilling.serviceCode,
			diagnosticCode: props.rootReducer.fileClaimBilling.diagnosticCode,
			numberOfServices: props.rootReducer.fileClaimBilling.numberOfServices,
			serviceDate: new Date()
		}
		this.onChange = (e) =>
		{
			console.log("onChange: ", e.target, ", value: ", e.target.value);
			this.setState({...this.state, [e.target.id]: e.target.value});
		}
		//Validate if a lower case version code of ohip number is entered
		this.beforeMaskedValueChange = (newState, oldState, userInput) => 
		{
			console.log("beforeMaskedValueChange: ", newState);
			  let { value, selection } = newState;
			  if (value.length && selection && selection.start >= 20) value = value.toUpperCase();
			  return {value, selection};
		}
		this.headCells =
		[
			{id: 'fieldName', label: 'FIELDS'},
			{id: 'inputField1', label: 'CLAIM #1'}
		];
		this.addHeadCells = () =>
		{
			let length = this.headCells.length;
			this.headCells.push({id: 'inputField'+length, label: 'CLAIM #'+lenght});
		}
	}
	componentDidMount()
	{
	}
	componentDidUpdate(prevProps, prevState)
	{
		console.log("[INFO componentDidUpdate(...) of fileClaimBilling.jsx] nextProps.rootReducer: " , prevProps.rootReducer);
	}
	componentWillUnmount()
	{
		this.props.rootReducer.fileClaimBilling.ohipNumber = this.state.ohipNumber;
		this.props.rootReducer.fileClaimBilling.patientDob = this.state.patientDob;
		this.props.rootReducer.fileClaimBilling.accountingNumber = this.state.accountingNumber;
		this.props.rootReducer.fileClaimBilling.careProviderNumber = this.state.careProviderNumber;
		this.props.rootReducer.fileClaimBilling.serviceCode = this.state.serviceCode;
		this.props.rootReducer.fileClaimBilling.numberOfServices = this.state.numberOfServices;
		this.props.rootReducer.fileClaimBilling.diagnosticCode = this.state.diagnosticCode;
		this.props.rootReducer.fileClaimBilling.serviceDate = this.state.serviceDate;
	}
	render()
	{
		console.log("INFO:fileClaimBilling.jsx.render() is called, this.props: ", this.props);
		const {classes, rootReducer} = this.props;

		return (
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h6">
					          For Solo Health Care Provider
					    </Typography>
						
					</Grid>
					<Grid item xs={12}>
						&nbsp;
					</Grid>
					<Grid item xs={2} style={{textAlign: 'center'}} color="primary">
						<span><strong>Provider Number</strong></span>
					</Grid>
					<Grid item xs={4}>
						<InputMask
				            mask="999999"
							id="careProviderNumber"
				            value={this.state.careProviderNumber}
				            onChange={this.onChange}
							placeholder="eg:123456"
							style={{width: '80px'}}
				          />
					</Grid>
					<Grid item xs={6}>
						RHS Create a submission file
					</Grid>
					<Grid item xs={12}>
						&nbsp;
					</Grid>
					<Grid item xs={12} className={classes.root}>
					<Paper>
					<TableContainer>
					<Table size="small" aria-label="claimFileTable">
						<TableHead >
					      <TableRow>
							<TableCell colSpan={this.headCells.length} >
								<Button
							        variant="contained"
							        color="primary"
							        className={classes.button}
							        endIcon={<Icon>add</Icon>}
							      >
							        Add Claim
							      </Button>
							</TableCell>
						  </TableRow>
						</TableHead>
					    <TableBody>
							<TableRow>
								<TableCell><span>Accounting Number</span></TableCell>
								{
									this.headCells.map
									(
										(cell, index) =>
										{
											if (index) return (<TableCell key={index}>
												<InputMask
										            mask="********"
													id="accountingNumber"
										            value={this.state.accountingNumber}
										            onChange={this.onChange}
													placeholder="12345678"
										          />
											</TableCell>)
											else return;
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Service Code</span></TableCell>
								{
									this.headCells.map
									(
										(cell, index) =>
										{
											if (index) return (<TableCell key={index}>
												<Select id="serviceCode" 
														   value={this.state.serviceCode}
										            	   onChange={this.onChange}
														native
														className={classes.select}
											  	>
													{   
														rootReducer.billingCodes && rootReducer.billingCodes.serviceCodes.map
														(
															(element, index) =>
															(<option key={index} value={element.code} title={"Fee: " + currency.format(element.fee) + ", " + element.description}>{element.code}</option>)
														)
													}
													{
														!rootReducer.billingCodes && <option></option>
													}
												</Select>
											</TableCell>
											)
											else return;
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Diagnostic Code</span></TableCell>
								{
									this.headCells.map
									(
										(cell, index) =>
										{
											if (index) return (<TableCell key={index}>
												<Select id="diagnosticCode" 
														   value={this.state.diagnosticCode}
										            	   onChange={this.onChange}
														   className={classes.select}
											  			   native>
													{   
														rootReducer.billingCodes && rootReducer.billingCodes.diagnosticCodes.map
														(
															(element, index) =>
															(<option key={index} value={element.code} title={element.description}>{element.code}</option>)
														)
													}
													{
														!rootReducer.billingCodes && <option></option>
													}
												</Select>
											</TableCell>
											)
											else return;
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Number Of Services</span></TableCell>
								{
									this.headCells.map
									(
										(cell, index) =>
										{
											if (index) return (<TableCell key={index}>
													<Select id="numberOfServices" 
														   value={this.state.numberOfServices}
										            	   onChange={this.onChange}
														   className={classes.select}
											  			   native>
														{
															numberOfServices.map
															(
																(element,  index) =>
																(
																	<option key={index} value={element}>{element}</option>
																)
															)
														}
													</Select>		
											</TableCell>
											)
											else return;
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Service Date</span></TableCell>
								{
									this.headCells.map
									(
										(cell, index) =>
										{
											if (index) return (<TableCell key={index}>
												<input type="date" id="serviceDate" />
											</TableCell>
											)
											else return;
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>OHIP Card Number</span></TableCell>
								{
									this.headCells.map
									(
										(cell, index) =>
										{
											if (index) return (<TableCell key={index}>
												<InputMask
										            mask="9999 - 999 - 999 - aa"
										            value={this.state.ohipNumber}
										            onChange={this.onChange}
													id="ohipNumber"
													placeholder="eg, 1234 - 123 - 123 - AB"
										          />
											</TableCell>
											)
											else return;
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Patient DOB</span></TableCell>
								{
									this.headCells.map
									(
										(cell, index) =>
										{
											if (index) return (<TableCell key={index}>
												<input type="date" id="patientDob" />
											</TableCell>
											)
											else return;
										}
									)
								}
							</TableRow>					
					    </TableBody>
					  </Table>
					</TableContainer>
					</Paper>
					</Grid>

				 </Grid>
				);
	}
	renderTextField()
	{
		console.log("INFO:fileClaimBilling.jsx.render() is called, this.props: ", this.props);
		const {classes, rootReducer} = this.props;

		return (
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h6">
					          For Solo Health Care Provider
					    </Typography>
						
					</Grid>
					<Grid item xs={12} className={classes.root}>
				      <div>
						<InputMask
				            mask="999999"
				            value={this.state.careProviderNumber}
				            onChange={this.onChange}

				          >
				            {() => 
								<TextField
								      required
						              id="careProviderNumber"
						              label="Care Provider Number"
						              helperText="eg, 123456"
									  placeholder="123456"
									  variant="outlined"
				                />
							}
				          </InputMask>
						<InputMask
				            mask="********"
				            value={this.state.accountingNumber}
				            onChange={this.onChange}
				          >
				            {() => 
								<TextField
						              id="accountingNumber"
						              label="Accounting Number"
						              helperText="eg, 00001234"
									  variant="outlined"
				                />
							}
				        </InputMask>
				        <TextField id="serviceCode" 
								   label="Service Code" 
								   variant="outlined" 
								   value={this.state.serviceCode}
				            	   onChange={this.onChange}
					  			   SelectProps={{native: true}} select required>
							{   
								rootReducer.billingCodes && rootReducer.billingCodes.serviceCodes.map
								(
									(element, index) =>
									(<option key={index} value={element.code} title={"Fee: " + currency.format(element.fee) + ", " + element.description}>{element.code}</option>)
								)
							}
							{
								!rootReducer.billingCodes && <option></option>
							}
						</TextField>
						<TextField id="diagnosticCode" 
								   label="Diagnostic Code" 
								   variant="outlined" 
								   value={this.state.diagnosticCode}
				            	   onChange={this.onChange}
					  			   SelectProps={{native: true}} select required>
							{   
								rootReducer.billingCodes && rootReducer.billingCodes.diagnosticCodes.map
								(
									(element, index) =>
									(<option key={index} value={element.code} title={element.description}>{element.code}</option>)
								)
							}
							{
								!rootReducer.billingCodes && <option></option>
							}
						</TextField>
				        <TextField
				          id="numberOfServices"
				          label="Number Of Services"
				          type="number"
						  value={this.state.numberOfServices}
						  onChange={this.onChange}
							variant="outlined"
				          InputProps={{inputProps: {min: 1, max: 10}}}
						  required
				        />
				        <TextField
				          id="serviceDate"
				          label="Service Date"
						  variant="outlined"
						  type="date"
						  value={this.state.serviceDate}
						  InputLabelProps={{shrink: true}}
						  onChange={this.onChange}
						  required
				        />

						 <InputMask
				            mask="9999 - 999 - 999 - aa"
				            value={this.state.ohipNumber}
				            onChange={this.onChange}
							beforeMaskedValueChange={this.beforeMaskedValueChange}
				          >
				            {() => 
								<TextField
						              id="ohipNumber"
						              label="OHIP Card Number"
						              helperText="eg, 1234 - 123 - 123 - AB"
									  variant="outlined"
				                />
							}
				        </InputMask>
				        <TextField
				          id="patientDob"
				          label="Patient DOB"
						  variant="outlined"
						  type="date"
						  value={this.state.patientDob}
						  onChange={this.onChange}
						  InputLabelProps={{shrink: true}}
						  required
				        />
						
				      </div>
					</Grid>

				 </Grid>
				);
	}
}

export default withStyles(styles)(FileClaimBilling);
