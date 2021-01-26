import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import queryString from "query-string";

import {addAlertMessage} from "../../actions/alertMessageActions.jsx";

class Error extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		const params = queryString.parse(this.props.location.search);
		if(params.msg != null)
		{
			this.props.addAlertMessage
			(
				{
					type: "error",
					text: "Oops! Something went wrong, "+params.msg
				}
		    );
			
		}
		return (<div><Redirect to="/" /></div>);

	}
}

Error.propTypes=
{
	addAlertMessage: PropTypes.func.isRequired
}

export default connect(null, {addAlertMessage})(Error);
