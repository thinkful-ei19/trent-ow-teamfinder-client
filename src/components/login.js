import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {postPlayer} from '../actions/players';

class Login extends React.Component {
    onSubmit() {
        return this.props.handleSubmit(values => {
            return fetch(`${API_BASE_URL}/api/login/players`, {
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
                this.props.reset()
                return res.json();
            })
            .then((data) =>this.props.dispatch(postPlayer(data)))
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


    render () {
        return (
            <form>
                <label htmlFor='userName'>username: </label>
                <Field component='input' type='text' name='userName'/>
                <label htmlFor='password'>password: </label>
                <Field component='input' type='text' name='password'/>
            </form>
        );
    }
    
}