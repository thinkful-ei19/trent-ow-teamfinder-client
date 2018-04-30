import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import './login.css';
import {fetchPlayers} from '../actions/players';
import { login } from '../actions/auth';

class Login extends React.Component {
    onSubmit() {
        return this.props.handleSubmit(values => {
          return this.props.dispatch(login(values.username, values.password))
            .then(() => this.props.dispatch(fetchPlayers(this.props.authToken)))
            .then(() => this.props.history.push('/auth/players'))
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
            <div className="login">
              <form onSubmit={this.onSubmit()}>
                <h1>Login</h1>
                <label className="login-label" htmlFor='username'>Username: </label>
                <Field component='input' type='text' name='username'/>
                <label className="login-label" htmlFor='password'>Password: </label>
                <Field component='input' type='text' name='password'/><br/>
                <button className="login-button">Login</button>
              </form>
              <h3>Don't have an Account? <Link to='/register'>Register</Link></h3>
            </div>
            
        );
    }
    
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken
  }
}

export default withRouter(connect(mapStateToProps)(reduxForm({ 
  form: 'login',
})(Login)));
