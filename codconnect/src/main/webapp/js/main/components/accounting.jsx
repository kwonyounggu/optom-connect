import React from "react";

const styles = (theme) =>
({
	root:	
	{
		display: 'flex',
			flexGrow: 1,
			flexDirection: 'row',
	},
	gridPanel: 
	{
		padding: 8,
		
		border: '1px solid red',
		borderRadius: '8px'
	}
});

const Home=(props)=>
{
	return (
			<div>

				<h1>
					accounting
				</h1>
			</div>
		   );
};

export default Home;