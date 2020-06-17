import React from "react";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
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
const ohipMask = ["9999 - 999 - 999"];
const EXPECTED_FILE_NAME = /(^[BEFPX]{1})+([ABCDEFGHIJKL]{1})+([0-9]{4,6})+(.\d{3})$/;
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
			careProviderNumber: ""
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
		const {classes, rootReducer, location} = this.props;

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
				        <TextField id="standard-disabled" label="Service Code" defaultValue="V406C" variant="outlined"/>
				        <TextField
				          id="standard-password-input"
				          label="Diagnostic Code"
						  defaultValue="939"
							variant="outlined"
				        />
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
				          id="standard-number"
				          label="Number Of Services"
				          type="number"
							variant="outlined"
				          InputLabelProps={{
				            shrink: true,
				          }}
				        />
				        <TextField
				          id="standard-helperText"
				          label="Service Date"
							variant="outlined"
				        />
						 <InputMask
				            mask="9999 - 999 - 999 - aa"
				            value={this.state.ohipNumber}
				            onChange={this.onChange}
							beforeMaskedValueChange={this.beforeMaskedValueChange}
				          >
				            {() => 
								<TextField
						              id={"ohipNmber"}
						              label={"OHIP Card Number"}
						              helperText="eg, 1234 - 123 - 123 - AB"
									  variant="outlined"
				                />
							}
				        </InputMask>
				        <InputMask
				            mask="9999 - 99 - 99"
				            value={this.state.patientDob}
				            onChange={this.onChange}
							beforeMaskedValueChange={this.beforeMaskedValueChange}
				          >
				            {() => 
								<TextField
						              id={"patientDob"}
						              label={"Patient DOB"}
						              helperText="eg, 1966 - 11 - 11"
									  variant="outlined"
				                />
							}
				          </InputMask>
				      </div>
					</Grid>

				 </Grid>
				);
	}
}

export default withStyles(styles)(FileClaimBilling);
