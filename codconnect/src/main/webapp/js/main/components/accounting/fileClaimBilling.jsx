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

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';

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
			minWidth: '120px',
			borderRadius: '0px'
		 },
		 selectInput: 
		 {
		    padding: "2px 5px"
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
			careProviderNumber: props.rootReducer.careProviderNumber,
			ohipClaimList: props.rootReducer.ohipClaimList
		}
		
		this.onChange = (e) =>
		{
			console.log("[INFO in onChange(e.target)]: ", e.target);

			e.persist(); //put this because ohipClaimItems initally empty or nulled
			let colcount = e.target.getAttribute('colcount');
			
			console.log("[INFO in onChange(e.target.name)]: ", e.target.name, "| e.target.value: ", e.target.value, '| colcount: ', colcount);
			
			this.setState
			(
				(prevState) =>
				{
					prevState.ohipClaimList[colcount][e.target.name] = e.target.value;
					return {
								prevState
						   }
				}
			);
		}
		/*
		this.onChange = (e) =>
		{
			console.log("[INFO in onChange(e.target)]: ", e.target);

			e.persist(); //put this because ohipClaimItems initally empty or nulled
			let colcount = e.target.getAttribute('colcount');
			
			console.log("[INFO in onChange(e.target.id)]: ", e.target.id, "| e.target.value: ", e.target.value, '| colcount: ', colcount);
			
			this.setState
			(
				(prevState) =>
				{
					prevState.ohipClaimList[colcount][e.target.id] = e.target.value;
					return {
								prevState
						   }
				}
			);
		}*/
		//Validate if a lower case version code of ohip number is entered
		this.beforeMaskedValueChange = (newState, oldState, userInput) => 
		{
			console.log("beforeMaskedValueChange: ", newState);
			  let { value, selection } = newState;
			  if (value.length && selection && selection.start >= 20) value = value.toUpperCase();
			  return {value, selection};
		}

		this.subtractClaim = () =>
		{
			this.state.ohipClaimList.pop();
			this.setState({ohipClaimList: this.state.ohipClaimList});
		}
		this.addClaim = () =>
		{
			this.setState({ohipClaimList: this.state.ohipClaimList.concat({})});
		}
		this.displayErrorBox = (isValid, id) =>
		{
			if (isValid) document.getElementById(id).style.border = 'inherit';
			else document.getElementById(id).style.border = '3px solid red';
		}
		this.createClaimFile = () =>
		{
			//1. validate
			//2. call the server to create a file
			//3. store in claim history if logged in 
			//4. display and ready to download the file in local
			console.log("validate");
			console.log("careProviderNumber: ", document.getElementById("careProviderNumber"));
			console.log("careProviderNumber: ", /^\d{6}/.test(this.state.careProviderNumber));
			if (/^\d{6}/.test(this.state.careProviderNumber))
				document.getElementById("careProviderNumber").style.border = 'inherit';
			else 
				document.getElementById("careProviderNumber").style.border = '3px solid red';
			let colCount = this.state.ohipClaimList.length;
			for (let i=0; i<colCount; i++)
			{
				let colObj = this.state.ohipClaimList[i];  
				console.log(i+" : ", colObj);
				//console.log("[ohip check]:", /^\d{4}\s?-\s?\d{3}\s?-\s?\d{3}\s?-\s?[A-Z]{2}/.test(colObj.ohipNumber));
				let isValid = true;
				if (colObj.ohipNumber) 
				{
					if (/^\d{4}\s?-\s?\d{3}\s?-\s?\d{3}\s?-\s?[A-Z]{2}/.test(colObj.ohipNumber))
					{
						//collect ohip number and version code respectively
						console.log("ohip number and 2 char version code");
					}
					else if (/^\d{4}\s?-\s?\d{3}\s?-\s?\d{3}\s?-\s?[A-Z]{1}/.test(colObj.ohipNumber))
					{
						//collect ohip number and version code respectively
						console.log("ohip number and 1 char version code");
					}
					else if (/^\d{4}\s?-\s?\d{3}\s?-\s?\d{3}\s?-\s?/.test(colObj.ohipNumber))
					{
						console.log("no version code but only ohip number");
						//collect ohip number but no version code
					}
					else
					{
						//error
						isValid = false;
					}
					//console.log("[ohip check]:", /^\d{4}\s?-\s?\d{3}\s?-\s?\d{3}\s?-\s?[A-Z]{2}/.test(colObj.ohipNumber));
				}
				else
				{
					//error
					isValid = false;
				}
				this.displayErrorBox(isValid, "ohipNumber_"+i);
				
				/*
				if (isOK)
					document.getElementById("ohipNumber_"+i).style.border = 'inherit';
				else
					document.getElementById("ohipNumber_"+i).style.border = '3px solid red';
				console.log("[ohipNumber_"+i+"]: ", document.getElementById("ohipNumber_"+i), ", value: " + colObj.ohipNumber);
				*/
			}
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
		this.props.rootReducer.ohipClaimList = this.state.ohipClaimList;
		this.props.rootReducer.careProviderNumber = this.state.careProviderNumber;
	}
	render()
	{
		console.log("INFO:fileClaimBilling.jsx.render() is called, [this.props]: ", this.props);
		console.log("INFO:fileClaimBilling.jsx.render() is called, [this.state]: ", this.state);
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
					
					<Grid item xs={12} >
						<Alert severity="info" style={{paddingTop: 0, paddingBottom: 0}}><span style={{color: 'red'}}>*</span>&nbsp;Required</Alert>
						<Alert severity="info" style={{paddingTop: 0, paddingBottom: 0}}>Each time, creating a claim submission file is limited upto ten patients.</Alert>
					</Grid>
					<Grid item xs={12}>
					
					<TableContainer>
					<Table size="small" aria-label="claimFileTable">
						<TableHead >
					      <TableRow >
							<TableCell style={{textAlign: 'left'}}>
								<span>
									<strong>Provider Number</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;
									<InputMask
							            mask="999999"
										id="careProviderNumber"
										name="careProviderNumber"
							            value={this.state.careProviderNumber || ''}
							            onChange={(e)=>this.setState({careProviderNumber: e.target.value})}
										placeholder=" 123456"
										style={{width: '80px'}}
										title="Six digits required"
							          />
								</span>
							</TableCell>
							<TableCell colSpan={this.state.ohipClaimList.length} style={{textAlign: 'right'}}>
								<IconButton
							        color="primary"
								    onClick={this.addClaim}
									title="Add more claims upto ten patients for the file"
									disabled={this.state.ohipClaimList.length==10}
							      >
							        <AddBoxIcon fontSize="large"/>
							      </IconButton>
								  <IconButton
							        color="primary"
								    onClick={this.subtractClaim}
									title="Subtract the last claim"
									disabled={this.state.ohipClaimList.length==1}
							      >
							        <IndeterminateCheckBoxIcon fontSize="large"/>
							      </IconButton>&nbsp;
								  <Button
							        variant="outlined" color="primary"
									onClick={this.createClaimFile}
							        className={classes.button}
							        endIcon={<Icon>create</Icon>}
									title="Create a submission claim file"
							      >
							        Create Claim
							      </Button>
							</TableCell>
						  </TableRow>
						</TableHead>
					    <TableBody>
							<TableRow style={{backgroundColor: '#e6e6e6'}}>
								<TableCell>OHIP Card Number&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<InputMask
										            mask="9999 - 999 - 999 - aa"
													formatChars={{'9': '[0-9]', 'a': '[A-Z]', '*': '[A-Za-z0-9]'}}
										            value={this.state.ohipClaimList[index].ohipNumber || ''}
										            onChange={this.onChange}
													name="ohipNumber"
													id={"ohipNumber_"+index}
													colcount={index}
													placeholder=" 1234 - 123 - 123 - AB"
													title="10 digits number and version code from the OHIP card are required"
										          />
											</TableCell>
											)
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Patient DOB&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<input type="date" id={"patientDob_"+index} name="patientDob" onChange={this.onChange} value={this.state.ohipClaimList[index].patientDob || ''} colcount={index}/>
											</TableCell>
											)
										}
									)
								}
							</TableRow>			
							<TableRow>
								<TableCell><span>Accounting Number</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<InputMask
										            mask="********"
													id={"accountingNumber_"+index}
													name="accountingNumber"
													value={this.state.ohipClaimList[index].accountingNumber || ''}
										            onChange={this.onChange}
													placeholder=" 12345678"
													colcount={index}
										          />
											</TableCell>)
										}
									)
								}
							</TableRow>
							<TableRow style={{backgroundColor: '#f0f0f0'}}>
								<TableCell>Service Code #1&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id={"serviceCode1_"+index} 
														name="serviceCode1" 
														value={this.state.ohipClaimList[index].serviceCode1 || ''}
										            	onChange={this.onChange}

														native
														className={classes.select}
														variant="outlined"
														input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														inputProps = {{colcount: index}}
											  	>
													<option value='' disabled></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Number Of Services&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
													<Select id={"numberOfServices1_"+index}
															name="numberOfServices1" 
														   value={this.state.ohipClaimList[index].numberOfServices1 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"

											  			   native>
														<option value='' disabled></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Service Date&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<input type="date" id={"serviceDate1_"+index} name="serviceDate1" onChange={this.onChange} value={this.state.ohipClaimList[index].serviceDate1 || ''} colcount={index}/>
											</TableCell>
											)
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Diagnostic Code&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id={"diagnosticCode1_"+index}
														name="diagnosticCode1" 
														   value={this.state.ohipClaimList[index].diagnosticCode1 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"
											  			   native>
													<option value='' disabled></option>
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
										}
									)
								}
							</TableRow>
							<TableRow style={{backgroundColor: '#f0f0f0'}}>
								<TableCell><span>Service Code #2</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id={"serviceCode2_"+index}
														name="serviceCode2" 
														value={this.state.ohipClaimList[index].serviceCode2 || ''}
										            	onChange={this.onChange}
														native
														className={classes.select}
														input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														inputProps = {{colcount: index}}
														variant="outlined"
											  	>
													<option value=''></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Number Of Services</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
													<Select id={"numberOfServices2_"+index}
															name="numberOfServices2" 
														   value={this.state.ohipClaimList[index].numberOfServices2 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"
											  			   native>
														<option value=''></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Service Date</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<input type="date" id={"serviceDate2_"+index} name="serviceDate2" onChange={this.onChange} value={this.state.ohipClaimList[index].serviceDate2 || ''} colcount={index}/>
											</TableCell>
											)
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Diagnostic Code</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id={"diagnosticCode2_"+index}
														name="diagnosticCode2" 
														   value={this.state.ohipClaimList[index].diagnosticCode2 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"
											  			   native>
													<option value=''></option>
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
										}
									)
								}
							</TableRow>		
					    </TableBody>
					  </Table>
					</TableContainer>
					
					</Grid>

				 </Grid>
				);
	}
	renderBeforeValidation()
	{
		console.log("INFO:fileClaimBilling.jsx.render() is called, [this.props]: ", this.props);
		console.log("INFO:fileClaimBilling.jsx.render() is called, [this.state]: ", this.state);
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
					
					<Grid item xs={12} >
						<Alert severity="info" style={{paddingTop: 0, paddingBottom: 0}}><span style={{color: 'red'}}>*</span>&nbsp;Required</Alert>
						<Alert severity="info" style={{paddingTop: 0, paddingBottom: 0}}>Each time, creating a claim submission file is limited upto ten patients.</Alert>
					</Grid>
					<Grid item xs={12}>
					
					<TableContainer>
					<Table size="small" aria-label="claimFileTable">
						<TableHead >
					      <TableRow >
							<TableCell style={{textAlign: 'left'}}>
								<span>
									<strong>Provider Number</strong>&nbsp;<span style={{color: 'red'}}>*</span>&nbsp;
									<InputMask
							            mask="999999"
										id="careProviderNumber"
							            value={this.state.careProviderNumber || ''}
							            onChange={(e)=>this.setState({careProviderNumber: e.target.value})}
										placeholder=" 123456"
										style={{width: '80px'}}
										title="Six digits required"
							          />
								</span>
							</TableCell>
							<TableCell colSpan={this.state.ohipClaimList.length} style={{textAlign: 'right'}}>
								<IconButton
							        color="primary"
								    onClick={this.addClaim}
									title="Add more claims upto ten patients for the file"
									disabled={this.state.ohipClaimList.length==10}
							      >
							        <AddBoxIcon fontSize="large"/>
							      </IconButton>
								  <IconButton
							        color="primary"
								    onClick={this.subtractClaim}
									title="Subtract the last claim"
									disabled={this.state.ohipClaimList.length==1}
							      >
							        <IndeterminateCheckBoxIcon fontSize="large"/>
							      </IconButton>&nbsp;
								  <Button
							        variant="outlined" color="primary"
									onClick={this.createClaimFile}
							        className={classes.button}
							        endIcon={<Icon>create</Icon>}
									title="Create a submission claim file"
							      >
							        Create Claim
							      </Button>
							</TableCell>
						  </TableRow>
						</TableHead>
					    <TableBody>
							<TableRow style={{backgroundColor: '#e6e6e6'}}>
								<TableCell>OHIP Card Number&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<InputMask
										            mask="9999 - 999 - 999 - aa"
													formatChars={{'9': '[0-9]', 'a': '[A-Z]', '*': '[A-Za-z0-9]'}}
										            value={this.state.ohipClaimList[index].ohipNumber || ''}
										            onChange={this.onChange}
													id="ohipNumber"
													colcount={index}
													placeholder=" 1234 - 123 - 123 - AB"
													title="10 digits number and version code from the OHIP card are required"
										          />
											</TableCell>
											)
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Patient DOB&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<input type="date" id="patientDob" onChange={this.onChange} value={this.state.ohipClaimList[index].patientDob || ''} colcount={index}/>
											</TableCell>
											)
										}
									)
								}
							</TableRow>			
							<TableRow>
								<TableCell><span>Accounting Number</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<InputMask
										            mask="********"
													id="accountingNumber"
													value={this.state.ohipClaimList[index].accountingNumber || ''}
										            onChange={this.onChange}
													placeholder=" 12345678"
													colcount={index}
										          />
											</TableCell>)
										}
									)
								}
							</TableRow>
							<TableRow style={{backgroundColor: '#f0f0f0'}}>
								<TableCell>Service Code #1&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id="serviceCode1" 
														value={this.state.ohipClaimList[index].serviceCode1 || ''}
										            	onChange={this.onChange}

														native
														className={classes.select}
														variant="outlined"
														input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														inputProps = {{colcount: index}}
											  	>
													<option value='' disabled></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Number Of Services&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
													<Select id="numberOfServices1" 
														   value={this.state.ohipClaimList[index].numberOfServices1 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"

											  			   native>
														<option value='' disabled></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Service Date&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<input type="date" id="serviceDate1" onChange={this.onChange} value={this.state.ohipClaimList[index].serviceDate1 || ''} colcount={index}/>
											</TableCell>
											)
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell>Diagnostic Code&nbsp;<span style={{color: 'red'}}>*</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id="diagnosticCode1" 
														   value={this.state.ohipClaimList[index].diagnosticCode1 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"
											  			   native>
													<option value='' disabled></option>
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
										}
									)
								}
							</TableRow>
							<TableRow style={{backgroundColor: '#f0f0f0'}}>
								<TableCell><span>Service Code #2</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id="serviceCode2" 
														value={this.state.ohipClaimList[index].serviceCode2 || ''}
										            	onChange={this.onChange}
														native
														className={classes.select}
														input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														inputProps = {{colcount: index}}
														variant="outlined"
											  	>
													<option value=''></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Number Of Services</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
													<Select id="numberOfServices2" 
														   value={this.state.ohipClaimList[index].numberOfServices2 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"
											  			   native>
														<option value=''></option>
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
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Service Date</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<input type="date" id="serviceDate2" onChange={this.onChange} value={this.state.ohipClaimList[index].serviceDate2 || ''} colcount={index}/>
											</TableCell>
											)
										}
									)
								}
							</TableRow>
							<TableRow>
								<TableCell><span>Diagnostic Code</span></TableCell>
								{
									[...Array(this.state.ohipClaimList.length)].map
									(
										(cell, index) =>
										{
											return (<TableCell key={index}>
												<Select id="diagnosticCode2" 
														   value={this.state.ohipClaimList[index].diagnosticCode2 || ''}
										            	   onChange={this.onChange}
														   className={classes.select}
														   input={<OutlinedInput classes={{ input: classes.selectInput}} />}
														   inputProps = {{colcount: index}}
														   variant="outlined"
											  			   native>
													<option value=''></option>
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
										}
									)
								}
							</TableRow>		
					    </TableBody>
					  </Table>
					</TableContainer>
					
					</Grid>

				 </Grid>
				);
	}
}

export default withStyles(styles)(FileClaimBilling);
