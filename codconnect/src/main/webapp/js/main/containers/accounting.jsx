import React from "react";
import PropTypes from "prop-types";
import {Link, Route, Switch} from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AccountingMRO = React.lazy( () => import("../components/accountingMRO.jsx") );
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
		border: '1px solid red',
		borderRadius: '8px'
	}
});
class Accounting extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	componentWillMount()
	{
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

		return(	
				<div className={this.props.classes.gridPanel}>
					<Tabs value={this.props.location.pathname} vari="scrollable" scrollButtons="on">
			          <Tab label="OHIP Reconciliation > Billing" value="/accounting" component={Link} to="/accounting" />
					  <Tab label="OHIP Reconciliation > Billing" value="/accounting/bill" component={Link} to="/accounting/bill" />
					  <Tab label="NON-OHIP Reconciliation > Billing" value="/accounting/nonohip" component={Link} to="/accounting/nonohip" />
			        </Tabs>
                    <Switch>
						<Route exact path="/accounting"  ><h3>hello</h3></Route>
						<Route path="/accounting/bill"  ><h3>hello 2</h3></Route>
						<Route path="/accounting/nonohip"  ><h3>hello 3</h3></Route>
					</Switch>
				</div>
			  );
	}
}


/*
const mapStateToProps=(state)=>
(	//return omitted for simplication
	{
		playMusicPanesReducer: state.playMusicPanesReducer
	}
);



const mapDispatchToProps=(dispatch)=>
(
    {
    	playMusicPanesActions: bindActionCreators(playMusicPanesActions, dispatch)
    }
);
export default connect(mapStateToProps, mapDispatchToProps) (PlayMusicContainer);
*/
Accounting.propTypes =
{
	classes: PropTypes.object.isRequired
};

export default withStyles(styles) (Accounting);
