import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';

import RolesAndHeroes from './roles-heroes';
import { HERO_LIST, ROLE_LIST} from '../config';
import {fetchUpdateAccount, editAccount} from '../actions/players';
import {normalizeResponseErrors} from '../actions/utils';


class EditAccountForm extends React.Component {
    convertFormValues(valueObj) {
      const roles = ROLE_LIST.filter(role => valueObj[role.name]).map(role => role.name);;
      const heroPool = HERO_LIST.filter(hero => valueObj[hero.name]).map(hero => hero.name);;
      return {
          skillRating: valueObj.skillRating,
          roles,
          heroPool
      }
    }

    onSubmit() {
        return this.props.handleSubmit(values => {
            const filteredValues= this.convertFormValues(values);
            return fetchUpdateAccount(this.props.authToken, this.props.currentUser.id, filteredValues)
              .then(res => normalizeResponseErrors(res))
              .then(res => {
                return res.json();
              })
            .then((data) =>this.props.dispatch(editAccount(data)))
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
            <form className="player-form" onSubmit={this.onSubmit()}>
                <label htmlFor='skill-rating'>SR: </label>
                <Field component='input' type='number' name='skillRating'/><br/>
                <RolesAndHeroes/>
                <button>submit</button>
            </form>
        );
    } 
}

const mapStateToProps = (state,ownProps) => {
    return {
      authToken: state.auth.authToken,
      currentUser: state.auth.currentUser
    }
  }
  
export default connect(mapStateToProps)(reduxForm({ 
  form: 'addPlayer'
})(EditAccountForm));

