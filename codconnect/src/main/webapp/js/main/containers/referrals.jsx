import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {connect} from "react-redux";
import {convertMroToCSV, resetMROData, resetClaimFileData, getBillingCodes, getClaimFile} from "../actions/rootActions.jsx";
import {addAlertMessage} from "../actions/alertMessageActions.jsx";
import DisplaySinglePage from "../components/refferals/displaySinglePage.jsx";
import {PDFViewer} from "react-view-pdf";

/*
 * flex-direction: row | row-reverse | column | column-reverse;
 * backgroundColor: 'white',
 */

const styles = (theme) =>
({
  	root:	
	{
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row'
	},
	gridPanel: 
	{
		padding: 8,
		border: '0px solid red',
		borderRadius: '8px'
	},
	toolbar: theme.mixins.toolbar
});

class Referrals extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	componentWillUnmount()
	{
	}
	componentDidMount()
	{

	}
	
	render()
	{
		console.log("INFO: Referrals.render() is called, this.props: ", this.props);
		
		return(	
				<div >
                    <Switch>
						<Route exact path="/referrals"  ><h3>show avaliable links for referrals sections</h3></Route>
						<Route exact path="/referrals/patient_referral_form"  ><h3>patient-refferals-form</h3></Route>
						<Route exact path="/referrals/ocular_exam_report"  ><h3>ocular-exam-report</h3></Route>
						<Route exact path="/referrals/blind_low_vision_referral_form"  ><DisplaySinglePage src="/docs/blv-referral-form-feb-12-2018.pdf" /></Route>
						<Route exact path="/referrals/blind_low_vision_early_report"  ><PDFViewer url="/docs/blv-vision-report-form-feb-12-2018.pdf" /></Route>
					</Switch>
				</div>
			  );
	}
}

const mapStateToProps=(state)=>
(	//return omitted for simplication
	{
		auth: state.authReducer,
		rootReducer: state.rootReducer
	}
);
Referrals.propTypes =
{
	classes: PropTypes.object.isRequired,
	convertMroToCSV: PropTypes.func.isRequired,
	resetMROData: PropTypes.func.isRequired,
	resetClaimFileData: PropTypes.func.isRequired,
	getBillingCodes: PropTypes.func.isRequired,
	getClaimFile: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {convertMroToCSV, addAlertMessage, resetMROData, resetClaimFileData, getBillingCodes, getClaimFile}) (withStyles(styles) (Referrals));
/************************** Hope this works:
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentName))
**********************************/
