import React from "react";

export default class IframePDF extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			contentHeight: Math.round(window.innerHeight * 0.7)
		}
	}
	componentWillUnmount()
	{
		this.container.contentWindow.removeEventListener('resize', this.handleResize);
	}
	handleResize = () =>
	{
		const {body, documentElement} = this.container.contentWindow.document;
		const contentHeight =
			  Math.max
			  (
				body.clientHeight,
				body.offsetHeight,
				body.scrollHeight,
				documentElement.clientHeight,
				documentElement.offsetHeight,
				documentElement.scrollHeight	
			  );
		if (contentHeight != this.state.contentHeight) this.state.setState({contentHeight});
	}
	onLoad = () =>
	{
		this.container.contentWindow.addEventListener('resize', this.handleResize);
		this.handleResize();
	}
	render()
	{
		const {contentHeight} = this.state;
		return (
				<iframe style={{width: '100%', height: `${contentHeight}px`}}
						onLoad={this.onLoad}
						ref={(container) => this.container =  container}
						src={this.props.src}
						width="100%"
						height={contentHeight}
						scrolling="no"
						frameBorder="0"
				/>
			   );
	}
}