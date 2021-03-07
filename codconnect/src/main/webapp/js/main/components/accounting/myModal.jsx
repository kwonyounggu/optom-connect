import React from "react";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";

const useStyles = makeStyles
(
	(theme) =>
	(
		{
			modal:
			{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			},
			paper:
			{
				backgroundColor: theme.palette.background.paper,
				border: '2px solid #000',
				boxShadow: theme.shadows[5],
				padding: theme.spacing(2, 4, 3)					
			}
		}	
	)
	
);
const MyModal = (props) =>
{
	console.log('MyModal props: ', props);
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(true);//onPurpose
	return (
				<Modal 
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
					className={classes.modal}
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{timeout: 500}}
				>
					<Fade in={open}>
						<div className={classes.paper}> {/* <div> ... </div>, otherwise there occurs an error */}
							<h2 id="modal-title">Sorry, the login is required.</h2>
							<div>
								<Button href="/" color="primary">Home</Button>
								<Button component={Link} to={props.to} color="primary"><b>Login</b></Button>
							</div>
						</div>
					</Fade>
				</Modal>
		   );
}

MyModal.propTypes=
{
	to: PropTypes.object.isRequired
}
export default MyModal;