import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputMask from "react-input-mask";

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
			 }
	}
);

const EXPECTED_FILE_NAME = /(^[BEFPX]{1})+([ABCDEFGHIJKL]{1})+([0-9]{4,6})+(.\d{3})$/;
const currency = new Intl.NumberFormat('en-CA', {style: 'currency', currency: 'CAD'});
const today = new Date();
class FileClaimBilling extends React.Component
{
	constructor(props)
	{
		super(props);
		//console.log("INFO constructor() of fileClaimBilling.jsx: ", props);
		this.state = 
		{
			ohipNumber: "",
			patientDob: "",
			accountingNumber: "",
			careProviderNumber: "",
			serviceCode: "",
			diagnosticCode: ""
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
	}
	componentDidMount()
	{
	}
	componentDidUpdate(prevProps, prevState)
	{
		console.log("[INFO componentDidUpdate(...) of fileClaimBilling.jsx] nextProps.rootReducer: " , prevProps.rootReducer);
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
				          id="standard-read-only-input"
				          label="Service Location"
				          defaultValue="ON"
							variant="outlined"
				          InputProps={{
				            readOnly: true,
				          }}
				        />
						
				        <TextField
				          id="numberOfServices"
				          label="Number Of Services"
				          type="number"
						  defaultValue={1}
							variant="outlined"
				          InputProps={{inputProps: {min: 1, max: 10}}}
						  required
				        />
				        <TextField
				          id="serviceDate"
				          label="Service Date"
						  variant="outlined"
						  type="date"
						  InputLabelProps={{shrink: true}}
						  defaultValue={today.toLocaleDateString()}
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
						  InputLabelProps={{shrink: true}}
						  defaultValue={today.toLocaleDateString()}
						  required
				        />
				      </div>
					</Grid>

				 </Grid>
				);
	}
}

export default withStyles(styles)(FileClaimBilling);
