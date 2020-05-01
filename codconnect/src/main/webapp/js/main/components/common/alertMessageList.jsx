import React from "react";
import {connect} from "react-redux";
import {deleteAlertMessage} from "../../actions/alertMessageActions.jsx";
import {PropTypes} from "prop-types";
import AlertMessage from "./alertMessage.jsx";

class AlertMessageList extends React.Component
{
	render()
	{
		const messages = this.props.msgStateArray.map
						 (
							(aMsg) =>
							<AlertMessage key={aMsg.id}
										  message={aMsg}
										  deleteAlertMessage={this.props.deleteAlertMessage}
							/>
						 );
		return (<div>{messages}</div>)
	}
}

AlertMessageList.propTypes =
{
	msgStateArray: PropTypes.array.isRequired,
	deleteAlertMessage: PropTypes.func.isRequired
};

//incoming a global state, the parameter of mapStateToProps function
//then you just get the specific state from alertMessageReducer.jsx
function mapStateToProps(state)
{
	return {msgStateArray: state.alertMessageReducer}
}

export default connect(mapStateToProps, {deleteAlertMessage})(AlertMessageList);