import React from "react";
import {Form, Row, Col} from "react-bootstrap"
import {withStyles} from "@material-ui/core/styles";
//import validateLoginForm from "./validateLoginForm.jsx";

//import {setAuthorizationToken} from "../../utils/utils.jsx";
import {PropTypes} from "prop-types";

//import jwtDecode from "jwt-decode";
//import queryString from "query-string";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import {Alert} from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";

//import { trackPromise } from 'react-promise-tracker';

//import {DisplaySteps} from "../signup/signupForm.jsx";

const styles = (theme) =>
({
	paper:
	{
		backgroundColor: '#fcfaf5',
		padding: '10px 25px 10px 25px'
	}
});
class InputMedicineData extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			medicineName: "",
		    pronounciationFile: "",
		    errors: {},
		    isLoading: false,
			invalid: false,
			keepMeLoggedIn: false
		};
	}
	componentWillUnmount()
	{
	}
	componentDidMount()
	{

	}
	render()
	{
		const {classes} = this.props;
		return (
				<Grid container spacing={1}>
				  <Grid item xs={12}>&nbsp;</Grid>
				  <Grid item xs={12}>
			       	<Paper variant="outlined" className={classes.paper}>
					  <Grid container spacing={1}>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={12} style={{textAlign: 'center'}}>
							<Typography variant="h6">
						          Input Eye Medicine Data
						    </Typography>
						</Grid>
						<Grid item xs={12} style={{paddingLeft: '10%', paddingRight: '10%'}}>
							<Collapse in={this.state.errors.hasOwnProperty('overall')}>
								<Alert severity="error">{this.state.errors.overall} — check it out!</Alert>
						    </Collapse>
						</Grid>
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3} style={{textAlign: 'right'}}>
							<strong>Medicine name</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9} style={{textAlign: 'left'}}>
							<input name="medicineName" type="text" value={this.state.medicineName} onChange={this.onChange} style={{width: "95%"}} />		
						</Grid>

						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Pronounciation file</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={8}>
							<input name="pronounciationFile" type="file" value={this.state.pronounciationFile} onChange={this.onChange} />
						</Grid>
						<Grid item xs={1}>
							<IconButton
						            color="inherit"
						            
						          >
						            <RecordVoiceOverIcon fontSize="small"/>
						          </IconButton>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Drug Class</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="drug_class" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>

						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>What is this</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="what_is_this" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Warning</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="warning" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Before taking this</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="before_taking_this" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>How to take this</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="how_to_take_this" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>What happens if I miss a dose</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="if_i_miss_a_dose" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>What happens if I overdose</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="if_i_overdose" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>What should avoid while taking</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="what_should_avoid" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Side effects</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="side_effects" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>More side effects in detail</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="more_side_effects" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>What other drugs will affects</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="what_other_drug_will_affect" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Other drug interactions in detail</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="other_drug_interactions" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>During pregnancy</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="during_pregnancy" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>During breastfeeding</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="during_pregnancy" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={3}  style={{textAlign: 'right'}}>
							<strong>Dosage forms</strong>&nbsp;&nbsp;:&nbsp;
						</Grid>
						<Grid item xs={9}>
							<input name="dosage_forms" type="text" value={this.state.password} onChange={this.onChange} placeholder="Requires at least six in length" style={{padding: '5px', width: '100%'}}/>
						</Grid>
						
						<Grid item xs={12}>&nbsp;</Grid>
						<Grid item xs={3}>&nbsp;</Grid>
						<Grid item xs={9}  style={{textAlign: 'left'}}>
							<Button variant="outlined" color="primary" disabled={this.state.isLoading} onClick={this.onSubmit}>Log In</Button>
						</Grid>
					</Grid>
				</Paper> 
			</Grid>
		</Grid>
			   );
	}
	renderOrg()
	{
		return(
			<Form>
				<Form.Group as={Row}>
					<Form.Label column sm="2">Medicine Name:</Form.Label>
					<Col sm="10">
						<Form.Control type="text" placeholder="Prednisone" />
					</Col>
				</Form.Group>
				<Form.Group as={Row} >
					<Form.Label column sm="2">Pronounciation File:</Form.Label>
					<Form.File sm="10" id="pronounciationFile" />
				</Form.Group>
			</Form>
				);
	}
}

InputMedicineData.propTypes =
{
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputMedicineData);