import React from 'react';
import {Field} from 'redux-form';

export default function Checkbox(props) {
  return (
    <div>
      <Field component='input' type='checkbox' name='role' value={props.value}/>
      <label htmlFor={props.value}>{props.text}</label>
    </div>
  );
}

