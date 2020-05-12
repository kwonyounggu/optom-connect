import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';


import {StyledBreadcrumb} from "../common/styledBreadcrumb.jsx";

const styles = (theme) =>
({
	rootOrg:	
	{
		display: 'flex',
			flexGrow: 1,
			flexDirection: 'row',
	},
	root: 
    {
		textAlign: 'left',
		padding: '10px'
    },
	link:
	{
		display: 'flex'
	},
	breadcurmbIcon: 
	{
	    marginRight: theme.spacing(0.5),
	    width: 20,
	    height: 20
    },
	paper:
	{
		backgroundColor: '#fcfaf5',
		padding: '10px 25px 10px 25px'
	},
	wrapper: 
	{
	    margin: theme.spacing(1),
	    position: 'relative'
	},
	buttonProgress: 
	{
	    color: green[500],
	    position: 'absolute',
	    top: '50%',
	    left: '50%',
	    marginTop: -12,
	    marginLeft: -12,
	}
});

const MyBreadcrumbs = (props) => 
{
	//console.info("MyBreadscrumbs: props, ", props.location.pathname);
	let path = props.location.pathname.split("\/");
	/*console.info("MyBreadscrumbs: path, ", path);
	path.map((item, i)=>
		{
			if (i==0) return ;
			else 
			{
				let index = props.location.pathname.indexOf(item);
				if (index > 0) console.info(props.location.pathname.substring(0, index+item.length));
				return item;
			}	
		}
	)
  */
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

const MAX_FILE_SIZE = 1000000;
class ConvertMROtoCSV extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			isFileExtensionValid: true,
			isFileSizeValid: false,
			isFileChosen: false,
			converting: false
		}
	}
	componentDidMount()
	{

	}
	
	renderTemp()
	{
		return(<MyBreadcrumbs {...this.props} />)
	}
	onChangeHandler = (event) =>
	{
		if (!event.target.files[0]) return; //it may be undefined due to unselection
    	console.log("file: ", event.target.files[0], "|", typeof event.target.files[0].size);
		let fileName = event.target.files[0].name;
		let extension = fileName.substring(fileName.lastIndexOf('.') + 1);
	    console.info("file extension is supported: ", extension, "|", extension.length, "|", /^\d+$/.test(extension), "|", (extension.length == 3) && /^\d+$/.test(extension));
		this.setState
		(
			{
				isFileExtensionValid: (extension.length == 3) && /^\d+$/.test(extension), 
				isFileChosen: true,
				isFileSizeValid: event.target.files[0].size < MAX_FILE_SIZE
			}
		);
	}
	onConvertButtonClick = () =>
	{
		this.setState({converting: true});
		//if there found an error, then display the error message and setState({converting: false})
		//else 
		//		1) display none this section
		//		2) display summary of the table
		//		3) display the converted file to download
		//		4) display a button to goback to more conversion
	}
	render()
	{
		const {classes} = this.props;
		return (
				  <div className={classes.root}>
					    <Grid container spacing={1}>
					      <Grid item xs={12}>
					        <Typography variant="h6">
					          Start converting OHIP MRO files in Health Reconciliation to Excel CSV.
					        </Typography>
					      </Grid>
						  <Grid item xs={12}>
					        <MyBreadcrumbs {...this.props} />
					      </Grid>
						  <Grid item xs={12}>
					       	<hr />
					      </Grid>
					      <Grid item xs={12}>
					       	<Paper variant="outlined" className={classes.paper}>
								<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
									<Grid item>
										<Typography style={{fontSize: '14px', fontWeight: 'bold'}} color="primary" gutterBottom>
								          Please choose a valid MRO file with a three digit extension.
								        </Typography>
									</Grid>
									<Grid item>
										<input type="file" name="file" pattern=".^[0-9]{3}" onChange={this.onChangeHandler} disabled={this.state.converting}/>
									</Grid>
									<Grid item>
										<Collapse in={!this.state.isFileExtensionValid && this.state.isFileChosen}>
									        <Alert severity="error">The file extension is not supported — check it out!</Alert>
									    </Collapse>
										<Collapse in={!this.state.isFileSizeValid && this.state.isFileChosen}>
									        <Alert severity="error">The file size is not supported — check it out</Alert>
									    </Collapse>
									</Grid>
									<Grid item>
										<div className={classes.wrapper}>
									        <Button
									          variant="contained"
									          color="primary"
									          disabled={this.state.converting || !(this.state.isFileChosen && this.state.isFileExtensionValid && this.state.isFileSizeValid)}
									          onClick={this.onConvertButtonClick}
									        >
									          Convert to Excel CSV
									        </Button>
									        {this.state.converting && <CircularProgress size={24} className={classes.buttonProgress} />}
									    </div>
									</Grid>
								</Grid>
							</Paper>
					      </Grid>
					      <Grid item xs={12}>
					        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
					          Terms & Conditions
					        </Typography>
					      </Grid>
					      <Grid item xs={12}>
					        <Typography variant="caption" align={"center"} gutterBottom color={"textSecondary"}>
					          Contact us
					        </Typography>
					      </Grid>
					    </Grid>
				  </div>
				);
	}
}

export default withStyles(styles)(ConvertMROtoCSV);