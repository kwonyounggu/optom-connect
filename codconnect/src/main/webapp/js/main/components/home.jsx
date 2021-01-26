import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme, fade } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputMask from "react-input-mask";
import MaskedInput from "react-text-mask";
import Input from '@material-ui/core/Input';

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
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};
const Home=(props)=>
{
	const classes = useStyles();
	const [values, setValues] = React.useState({
    textmask: '(1  )    -    '
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
	return (
			<div>

				<h1  >
					Welcome Root Home !!!
				</h1>
				<Input
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
			</div>
		   );
};

export default Home;