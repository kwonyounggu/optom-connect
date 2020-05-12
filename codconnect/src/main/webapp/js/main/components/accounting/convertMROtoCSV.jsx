import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {DropzoneArea} from 'material-ui-dropzone';
import Paper from '@material-ui/core/Paper';

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

class ConvertMROtoCSV extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	componentDidMount()
	{

	}
	
	renderTemp()
	{
		return(<MyBreadcrumbs {...this.props} />)
	}
	onChangeHandler=event=>
	{

    console.log("file: ", event.target.files[0]);

	}
	render()
	{
		const {classes} = this.props;
		return (
				  <div className={classes.root}>
					    <Grid container spacing={2}>
					      <Grid item xs={12}>
					        <Typography variant="h6">
					          Start converting MRO Records from the OHIP Health Reconciliation.
					        </Typography>
					      </Grid>
						  <Grid item xs={12}>
					        <MyBreadcrumbs {...this.props} />
					      </Grid>
					      <Grid item xs={12}>
							<Grid container direction="column" justify="center" alignItems="center">
								<Grid item>
							       	<Paper variant="outlined" className={classes.paper}>
										<Typography style={{fontSize: '14px', fontWeight: 'bold'}} color="primary" gutterBottom>
								          Please choose a valid MRO file with a three digit extension.
								        </Typography>
										{/*<DropzoneArea onChange={(files) => console.log('Files:', files)}/>*/}
										<input type="file" name="file" onChange={this.onChangeHandler}/>
									</Paper>
								</Grid>
							</Grid>
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