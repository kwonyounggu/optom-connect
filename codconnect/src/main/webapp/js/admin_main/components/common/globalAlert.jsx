import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {addAlertMessage} from "../../actions/alertMessageActions.jsx";

class GlobalAlert extends React.Component
{
	constructor(props)
    {
        super(props);
    }
	render()
	{
				
		return (<Collapse in={this.props.alertState.turnOn} >
					<Alert severity={this.props.alertState.type}
						action={
						            <IconButton aria-label="close" color="inherit" size="small"
						              			onClick={
															() => this.props.addAlertMessage({turnOn: false, type: this.props.alertState.type, level: 2, text: ""})
														}
						            >
						              <CloseIcon fontSize="inherit" />
						            </IconButton>
					          }
					>
						{this.props.alertState.text}
					</Alert>
				</Collapse>
			   );
	}
}

GlobalAlert.propTypes =
{
	addAlertMessage: PropTypes.func.isRequired,
	alertState: PropTypes.object.isRequired
};

//incoming a global state, the parameter of mapStateToProps function
//then you just get the specific state from alertMessageReducer.jsx
function mapStateToProps(state)
{
	return {alertState: state.alertMessageReducer}
}

export default connect(mapStateToProps, {addAlertMessage})(GlobalAlert);