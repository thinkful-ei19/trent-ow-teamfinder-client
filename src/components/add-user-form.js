import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Checkbox from './checkbox';
import {API_BASE_URL, heroList, roleList} from '../config';
import {postPlayer, fetchPlayers} from '../actions/players';
import {login} from '../actions/auth';
import {normalizeResponseErrors} from '../actions/utils';


class AddUserForm extends React.Component {
    convertFormValues(valueObj) {
      const roles = roleList.filter(role => valueObj[role]);
      const heroPool = heroList.filter(hero => valueObj[hero]);
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
            .then(() => this.props.history.push('/players'))
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
        const heroes = heroList.map((hero,index) => {
            return (<Checkbox key={index} value={hero}/>);
        })
        const roles = roleList.map((role,index) => {
            return (<Checkbox key={index} value={role}/>);
        })
        return (
            <form onSubmit={this.onSubmit()}>
                <label htmlFor='username'>username: </label>
                <Field component='input' type='text' name='username'/>
                <label htmlFor='password'>password: </label>
                <Field component='input' type='text' name='password'/>
                <label htmlFor='skill-rating'>SR: </label>
                <Field component='input' type='number' name='skillRating'/><br/>
                <label>Roles: </label>
                {roles}
                <label>Heroes: </label>
                {heroes}
                <button>submit</button>
            </form>
        );
    } 
}

const mapStateToProps = state => {
    return {
      authToken: state.auth.authToken
    }
  }
  
export default withRouter(connect(mapStateToProps)(reduxForm({ 
  form: 'addPlayer',
})(AddUserForm)));

