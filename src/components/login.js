import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';

import {fetchPlayers} from '../actions/players';
import { login } from '../actions/auth';

class Login extends React.Component {
    onSubmit() {
        return this.props.handleSubmit(values => {
          console.log(values);
          return this.props.dispatch(login(values.username, values.password))
            .then(() => this.props.dispatch(fetchPlayers(this.props.authToken)))
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
            <form onSubmit={this.onSubmit()}>
                Log in:<br/>
                <label htmlFor='username'>username: </label>
                <Field component='input' type='text' name='username'/>
                <label htmlFor='password'>password: </label>
                <Field component='input' type='text' name='password'/>
                <button>Login</button>
            </form>
        );
    }
    
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken
  }
}

export default connect(mapStateToProps)(reduxForm({ 
  form: 'login',
})(Login));
