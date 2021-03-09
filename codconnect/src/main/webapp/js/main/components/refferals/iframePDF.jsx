import React, {PropTypes} from "react";
import ReactDOM from "react-dom";

export default class IframePDF extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			iFrameHeight: '0px'
		}
	}
	render()
	{
		return (
				<iframe style={{maxWidth: 640, width: '100%', height: this.state.iFrameHeight, overflow: 'visible'}}
						onLoad=
						{
							() =>
							{
								const obj = ReactDOM.findDOMNode(this);
								console.log("IframePDF props: ", obj)
								this.setState
								(
									{iFrameHeight: obj.contentWindow.document.body.scrollHeight + 'px'}
								);
							}
						}
						ref="iFrame"
						src={this.props.src}
						width="100%"
						height={this.state.iFrameHeight}
						scrolling="no"
						frameBorder="0"
				/>
			   );
	}
}