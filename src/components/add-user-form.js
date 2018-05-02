import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './add-user-form.css';
import RolesAndHeroes from './roles-heroes';

import {API_BASE_URL, HERO_LIST, ROLE_LIST} from '../config';

import {postPlayer, fetchPlayers} from '../actions/players';
import {login, authError} from '../actions/auth';
import {normalizeResponseErrors} from '../actions/utils';


class AddUserForm extends React.Component {
    convertFormValues(valueObj) {
      const roles = ROLE_LIST.filter(role => valueObj[role.name]).map(role => role.name);
      const heroPool = HERO_LIST.filter(hero => valueObj[hero.name]).map(hero => hero.name);
      return {
          username : valueObj.username,
          skillRating: valueObj.skillRating,
          password: valueObj.password,
          roles,
          heroPool
      }
    }

    onSubmit() {
        return this.props.handleSubmit(values => {
            const filteredValues= this.convertFormValues(values);
            return fetch(`${API_BASE_URL}/api/players`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  players: filteredValues
                })
              })
              .then(res => normalizeResponseErrors(res))
              .then(res => {
                this.props.reset()
                return res.json();
              })
            .then((data) =>this.props.dispatch(postPlayer(data)))
            .then(() => this.props.dispatch(login(filteredValues.username, filteredValues.password)))
            .then(() => this.props.dispatch(fetchPlayers(this.props.authToken)))
            .then(() => this.props.history.push('/view/players'))
            .catch(err => {
                const {reason, message, location} = err;
                this.props.dispatch(authError(err));
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
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.errorMessage.message}
                </div>
            );
        }
        return (
            <form className="player-form" onSubmit={this.onSubmit()}>
                <div className="container text-fields">
                    <label htmlFor='username'>Username: </label>
                    <Field component='input' type='text' name='username' required/>
                    <label htmlFor='password'>Password: </label>
                    <Field component='input' type='password' name='password' minlength="8"
       maxlength="72" required/>
                    <label htmlFor='skill-rating'>Skill Rating: </label>
                    <Field component='input' type='number' max="5000" min="0" required name='skillRating'/><br/>
                </div>
                <RolesAndHeroes/>
                {error}
                <button>submit</button>
            </form>
        );
    } 
}

const mapStateToProps = state => {
    return {
      authToken: state.auth.authToken,
      errorMessage: state.auth.error
    }
  }
  
export default withRouter(connect(mapStateToProps)(reduxForm({ 
  form: 'addPlayer',
})(AddUserForm)));

