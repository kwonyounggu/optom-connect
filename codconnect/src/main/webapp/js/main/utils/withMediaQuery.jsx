import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withStyles } from "@material-ui/core/styles";

/*
const withMediaQuery = (...args) => Component => props => {
  const mediaQuery = useMediaQuery(...args);
  return <Component mediaQuery={mediaQuery} {...props} />;
}

export default withMediaQuery;
*/

const styles = (theme) =>
({
  	root:	
	{
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row'
	}
});

const withMediaQuery = (queries = []) => Component => props => 
{
  const mediaProps = {};
  queries.forEach
  (
	q => 
	{ mediaProps[q[0]] = useMediaQuery(q[1])}
  );
  return <Component {...mediaProps} {...props} />;
}

export default withStyles(styles)
(withMediaQuery
	(
		[
    		['isDesktop', theme => theme.breakpoints.up('lg'), {defaultMatches: true}]
  		]
    )
);
