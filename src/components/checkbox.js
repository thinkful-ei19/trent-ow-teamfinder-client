import React from 'react';
import {Field} from 'redux-form';

export default function Checkbox(props) {
  return (
    <div>
      <Field component='input' type='checkbox' name={props.value} value={props.value} id={props.value}/>
      <label htmlFor={props.value}>{props.value}</label>
    </div>
  );
}

