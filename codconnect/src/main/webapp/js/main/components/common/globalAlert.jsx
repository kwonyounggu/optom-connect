import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
class GlobalAlert extends React.Component
{
	render()
	{
				
		return (<Collapse in={this.props.alertState.turnOn}>
					<Alert severity={this.props.alertState.type}>{this.props.alertState.text}</Alert>
				</Collapse>
			   );
	}
}

GlobalAlert.propTypes =
{
	alertState: PropTypes.object.isRequired
};

//incoming a global state, the parameter of mapStateToProps function
//then you just get the specific state from alertMessageReducer.jsx
function mapStateToProps(state)
{
	return {alertState: state.alertMessageReducer}
}

export default connect(mapStateToProps, null)(GlobalAlert);