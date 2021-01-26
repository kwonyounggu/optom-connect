import React from "react";
import {Alert} from "react-bootstrap";
import {PropTypes} from "prop-types";

class AlertMessage extends React.Component
{
	constructor(props)
	{
		super(props);
		this.onDismiss = this.onDismiss.bind(this);
	}
	
	//Do you need this to destroy the message?
	onDismiss()
	{
		this.props.deleteAlertMessage(this.props.message.id);
	}
	
	render()
	{
		const {id, type, text} = this.props.message;
		return (
				<Alert bsStyle={type==="success" ? "success": "danger"}
					   onDismiss={this.onDismiss}>
					<h4>{text}</h4>
				</Alert>
				);
	}
}

AlertMessage.propTypes =
{
	message: PropTypes.object.isRequired,
	deleteAlertMessage: PropTypes.func.isRequired
}
export default AlertMessage;