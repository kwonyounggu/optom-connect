import React from "react";
import PropTypes from "prop-types";
import {Link, Route, Switch} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {connect} from "react-redux";
import {convertMroToCSV} from "../actions/rootActions.jsx";
import {addAlertMessage} from "../actions/alertMessageActions.jsx";

const ConvertMROtoCSV = React.lazy( () => import("../components/accounting/convertMROtoCSV.jsx") );
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

class Accounting extends React.Component
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
		console.log("INFO: Accounting.render() is called, this.props: ", this.props);
		let pathname = this.props.location.pathname.toLowerCase();
		
		switch(pathname)
		{
			case "/accounting":
			case "/accounting/bill":
			case "/accounting/nonohip": break;
			default: { pathname = "/accounting"; break;}
		}
		
		return(	
				<div >
                    <Switch>
						<Route exact path="/accounting"  ><h3>show avaliable links for accouting sections</h3></Route>
						<Route exact path="/accounting/ohip"  ><h3>provide what ohip section is providing</h3></Route>
						<Route path="/accounting/ohip/billing"  ><h3>provide ohip billing component</h3></Route>
						<Route path="/accounting/ohip/convert"  component={ (props) => <ConvertMROtoCSV {...props} auth={this.props.auth} rootReducer={this.props.rootReducer} convertMroToCSV={this.props.convertMroToCSV} addAlertMessage={this.props.addAlertMessage}/> } />
						<Route path="/accounting/ohip/myrecord"  ><h3>provide ohip my record component</h3></Route>
						<Route exact path="/accounting/nonohip"  ><h3>provide what non-ohip section is doing</h3></Route>
						<Route path="/accounting/non-ohip/billing"  ><h3>provide non-ohip billing component</h3></Route>
						<Route path="/accounting/non-ohip/myrecord"  ><h3>provide non-ohip my record component</h3></Route>
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
Accounting.propTypes =
{
	classes: PropTypes.object.isRequired,
	convertMroToCSV: PropTypes.func.isRequired,
	addAlertMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {convertMroToCSV, addAlertMessage}) (withStyles(styles) (Accounting));
/************************** Hope this works:
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ComponentName))
**********************************/
