import React from "react";
import {Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DescriptionIcon from '@material-ui/icons/Description';
import LanguageIcon from '@material-ui/icons/Language';

import {StyledBreadcrumb} from "../common/styledBreadcrumb.jsx";
import {menuLinks} from "../common/menuLinks.jsx";
import FileClaimBilling from "./fileClaimBilling.jsx";

const styles = (theme) =>
(
	{
			root: 
			{
		    	flexGrow: 1
		  	},
			indicator: 
			{
			    backgroundColor: 'transparent'
		    }
	}
);

const MyBreadcrumbs = (props) => 
{
	//console.info("MyBreadscrumbs: props, ", props.location.pathname);
	let path = props.location.pathname.split("\/");
    return (
		    <Breadcrumbs aria-label="breadcrumb" maxItems={2}>
				{
					path.map
					(
						(item, i) =>
						(
						   (i == 0) ? 
								<StyledBreadcrumb key={i} component="a" href="/" label="Home" icon={<HomeIcon fontSize="small" />}/> : 
								<StyledBreadcrumb key={i} component="a" href={props.location.pathname.substring(0, props.location.pathname.indexOf(item)+item.length)} label={item}/>
						)
					)
				}
		    </Breadcrumbs>
		  );
}

const MRO_MAX_FILE_SIZE = 1000000;
const EXPECTED_FILE_NAME = /(^[BEFPX]{1})+([ABCDEFGHIJKL]{1})+([0-9]{4,6})+(.\d{3})$/;
class OHIPBilling extends React.Component
{
	constructor(props)
	{
		super(props);
		//console.log("INFO constructor() of OHIPBilling.jsx: ", props);
		this.state = 
		{
		}
	}
	componentDidMount()
	{
		if (this.props.rootReducer.billingCodes == null) this.props.getBillingCodes();

	}
	componentDidUpdate(prevProps, prevState)
	{
		console.log("[INFO componentDidUpdate(...) of OHIPBilling.jsx] nextProps.rootReducer: " , prevProps.rootReducer);
	}

	render()
	{
		console.log("INFO:OHIPBilling.jsx.render() is called, this.props: ", this.props);
		const {classes, location} = this.props;

		return ( <React.Fragment>
				   
				      <Tabs 
				        value={location.pathname}
					    variant="fullWidth"
				        textColor="primary"
						classes={{indicator: classes.indicator}}
				      >
				        <Tab style={
										(location.pathname == menuLinks[4]) ? 
										{borderLeft: '1px solid grey', borderTop: '1px solid grey', borderRight: '1px solid grey', borderRadius: '6px 6px 0px 0px'} :
										{borderBottom: '1px solid grey'}
									}
								    label={<span><DescriptionIcon fontSize="inherit"/>	&nbsp;&nbsp;BY FILE CLAIM</span>} value={menuLinks[4]} component={Link} to={menuLinks[4]}/>
				        <Tab style={
										(location.pathname == menuLinks[11]) ? 
										{borderLeft: '1px solid grey', borderTop: '1px solid grey', borderRight: '1px solid grey', borderRadius: '6px 6px 0px 0px'} :
										{borderBottom: '1px solid grey'}
									}
									label={<span><LanguageIcon fontSize="inherit"/>	&nbsp;&nbsp;BY WEBSERVICE</span>} value={menuLinks[4]+"/wsdl"} component={Link} to={menuLinks[4]+"/wsdl"}/>
				      </Tabs>
				   
					
					{
						(location.pathname == menuLinks[4]) && 
						<div style={{borderLeft: '1px solid grey', borderRight: '1px solid grey', borderBottom: '1px solid grey', padding: '20px'}}> 
							<FileClaimBilling auth={this.props.auth} resetClaimFileData={this.props.resetClaimFileData} getClaimFile={this.props.getClaimFile} rootReducer={this.props.rootReducer} location={location}/>
						</div>
					}
					{
						(location.pathname == menuLinks[11]) && <div>here two</div>
					}

				</React.Fragment>
				);
	}
}

export default withStyles(styles)(OHIPBilling);
