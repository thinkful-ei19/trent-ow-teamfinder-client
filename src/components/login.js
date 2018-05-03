import React from 'react';
import {reduxForm, Field} from 'redux-form';
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
            .then(() => this.props.history.push('/view/players'))
        })
    }


    render () {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <div className="login">
              <form onSubmit={this.onSubmit()}>
                <h1><span className="orange">Team</span>Builder</h1>
                <h2>Please Login</h2>
                <label className="login-label" htmlFor='username'>Username: </label>
                <Field component='input' type='text' name='username'/>
                <label className="login-label" htmlFor='password'>Password: </label>
                <Field component='input' type='password' name='password'/><br/>
                <button className="login-button">Login</button>
              </form>
              {error}
              <h3>Don't have an Account? <Link to='/register'>Register</Link></h3>
            </div>
            
        );
    }
    
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken,
    error: state.auth.error
  }
}

export default withRouter(connect(mapStateToProps)(reduxForm({ 
  form: 'login',
})(Login)));
