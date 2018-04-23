import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';

import Checkbox from './checkbox';
import {API_BASE_URL} from '../config';
import {postPlayer} from '../actions/players';

function onSubmit(props) {
    return props.handleSubmit(values => {
        console.log(values);
        return fetch(`${API_BASE_URL}/api/players`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              players: values
            })
          })
          .then(res => {
            if (!res.ok) {
                if (
                    res.headers.has('content-type') &&
                    res.headers
                        .get('content-type')
                        .startsWith('application/json')
                ) {
                    // It's a nice JSON error returned by us, so decode it
                    return res.json().then(err => Promise.reject(err));
                }
                // It's a less informative error returned by express
                return Promise.reject({
                    code: res.status,
                    message: res.statusText
                });
            }
            props.reset()
            return res.json();
        })
        .then((data) => props.dispatch(postPlayer(data)))
        // .then((data) => console.log(data))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            return Promise.reject(
                new SubmissionError({
                    _error: 'Error submitting message'
                })
            );
        });
          
    })
}

function AddUserForm(props) {
    
    return (
        <form onSubmit={onSubmit(props)}>
            <label htmlFor='userName'>username: </label>
            <Field component='input' type='text' name='userName'/>
            <label htmlFor='skill-rating'>SR: </label>
            <Field component='input' type='number' name='skillRating'/>
            {/* <label>Roles: </label>
            <Checkbox value={'dps'} text={'Dps'}/>
            <Field component='input' type='radio' name='role' value='flex'/>
            <label htmlFor='flex'>Flex</label>
            <Field component='input' type='radio' name='role' value='tank'/>
            <label htmlFor='tank'>Tank</label>
            <Field component='input' type='radio' name='role' value='support'/>
            <label htmlFor='support'>Support</label> */}
            <button>submit</button>
        </form>
    );
}

export default reduxForm({
    form: 'addPlayer'
})(AddUserForm);