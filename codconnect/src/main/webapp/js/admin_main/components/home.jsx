import React from "react";
import { makeStyles, withStyles, useTheme, fade } from '@material-ui/core/styles';
import HomeBanner from "./homeBanner.jsx";

const useStyles = makeStyles((theme) => 
({
  	root:	
	{
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row'
	},
	gridPanel: 
	{
		padding: 8,
		border: '1px solid red',
		borderRadius: '8px'
	}
}));

const Home=(props)=>
{
	  const classes = useStyles();

	  return (
			<div>
	
				<HomeBanner />
			</div>
		   );
};

export default Home;