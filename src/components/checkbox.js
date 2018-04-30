import React from 'react';
import {Field} from 'redux-form';
import './checkbox.css';

export default function Checkbox(props) {
  const imgStyle= {
    content: `url(${props.url})`
  }
  return (
    <div className="checkbox">
      <Field  component='input' type='checkbox' name={props.value} value={props.value} id={props.value}/>
      <label className="image" style={imgStyle} htmlFor={props.value}>{props.value}</label>
    </div>
  );
}

