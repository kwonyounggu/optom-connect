import React from "react";
import {FormGroup, FormControl} from "react-bootstrap";

const FieldGroup = ({ id, label, help, checkUserExists, ...props }) =>
{

  return (
		    <FormGroup controlId={id} validationState={help ? "error": null}>
		      {label}
		      <FormControl onBlur={checkUserExists} {...props} />
		      {help && {help}}
		    </FormGroup>
		 );
}
export default FieldGroup;