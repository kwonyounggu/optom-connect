import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';



/*
 * flex-direction: row | row-reverse | column | column-reverse;
 * backgroundColor: 'white',
 */

const styles = (theme) =>
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
});
class Accounting extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	componentWillMount()
	{
	}
	componentWillUnmount()
	{
	}
	componentDidMount()
	{

	}
	render()
	{
		console.log("==================>INFO: Accounting.render() is called, this.props: ", this.props);

		return(	
				<Paper elevation={0} className={this.props.classes.gridPanel}/>
				
			  );
	}
}


/*
const mapStateToProps=(state)=>
(	//return omitted for simplication
	{
		playMusicPanesReducer: state.playMusicPanesReducer
	}
);



const mapDispatchToProps=(dispatch)=>
(
    {
    	playMusicPanesActions: bindActionCreators(playMusicPanesActions, dispatch)
    }
);
export default connect(mapStateToProps, mapDispatchToProps) (PlayMusicContainer);
*/
Accounting.propTypes =
{
	classes: PropTypes.object.isRequired
};

export default withStyles(styles) (Accounting);
