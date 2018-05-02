import React from 'react';
import {Field} from 'redux-form';
import './checkbox.css';

export default function Checkbox(props) {
  // const imgStyle= {
  //   content: `url(${props.url})`
  // }
  return (
    <label className="checkbox">
      <Field component='input' type='checkbox' name={props.value} value={props.value}/>
      <img src={props.url} title={props.value} alt={props.value}/>
    </label>
  );
}

