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
			ohipNumber: ""
		}
		this.onChange = (e) =>
		{
			console.log("onChange: ", e.target.value);
			this.setState({ohipNumber: e.target.value});
		}
		//Validate if a lower case version code of ohip number is entered
		this.beforeMaskedValueChange = (newState, oldState, userInput) => 
		{
			  let { value, selection } = newState;
			  if (selection.start >= 20) value = value.toUpperCase();
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
				        <TextField id="standard-required" label="Care Provider Number" defaultValue="123456" variant="outlined"/>
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
				      </div>
				      <div>
				        <TextField
				          required
				          id="filled-required"
				          label="Health Card Number"
				          defaultValue="1234-567-890"
				          variant="filled"
				        />
						 <InputMask
            mask="9999 - 999 - 999 - aa"
            value={this.state.ohipNumber}
            onChange={this.onChange}
			beforeMaskedValueChange={this.beforeMaskedValueChange}
          >
            {() => <TextField
              id={"ohipNmber"}
              label={"OHIP Card Number"}
              name={"ohipNmber"}
              margin="normal"
              type="text"
              />}
          </InputMask>
				        <TextField
				          disabled
				          id="filled-disabled"
				          label="Disabled"
				          defaultValue="Hello World"
				          variant="filled"
				        />
				        <TextField
				          id="filled-password-input"
				          label="Password"
				          type="password"
				          autoComplete="current-password"
				          variant="filled"
				        />
				        <TextField
				          id="filled-read-only-input"
				          label="Read Only"
				          defaultValue="Hello World"
				          InputProps={{
				            readOnly: true,
				          }}
				          variant="filled"
				        />
				        <TextField
				          id="filled-number"
				          label="Number"
				          type="number"
				          InputLabelProps={{
				            shrink: true,
				          }}
				          variant="filled"
				        />
				        <TextField id="filled-search" label="Search field" type="search" variant="filled" />
				        <TextField
				          id="filled-helperText"
				          label="Helper text"
				          defaultValue="Default Value"
				          helperText="Some important text"
				          variant="filled"
				        />
				      </div>
				      <div>
				        <TextField
				          required
				          id="outlined-required"
				          label="Required"
				          defaultValue="Hello World"
				          variant="outlined"
				        />
				        <TextField
				          disabled
				          id="outlined-disabled"
				          label="Disabled"
				          defaultValue="Hello World"
				          variant="outlined"
				        />
				        <TextField
				          id="outlined-password-input"
				          label="Password"
				          type="password"
				          autoComplete="current-password"
				          variant="outlined"
				        />
				        <TextField
				          id="outlined-read-only-input"
				          label="Read Only"
				          defaultValue="Hello World"
				          InputProps={{
				            readOnly: true,
				          }}
				          variant="outlined"
				        />
				        <TextField
				          id="outlined-number"
				          label="Number"
				          type="number"
				          InputLabelProps={{
				            shrink: true,
				          }}
				          variant="outlined"
				        />
				        <TextField id="outlined-search" label="Search field" type="search" variant="outlined" />
				        <TextField
				          id="outlined-helperText"
				          label="Helper text"
				          defaultValue="Default Value"
				          helperText="Some important text"
				          variant="outlined"
				        />
				      </div>
					</Grid>

				 </Grid>
				);
	}
}

export default withStyles(styles)(FileClaimBilling);
