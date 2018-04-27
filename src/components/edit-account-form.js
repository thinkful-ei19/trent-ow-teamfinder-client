import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';

import Checkbox from './checkbox';
import { heroList, roleList} from '../config';
import {fetchUpdateAccount, editAccount} from '../actions/players';
import {normalizeResponseErrors} from '../actions/utils';


class EditAccountForm extends React.Component {
    convertFormValues(valueObj) {
      const roles = roleList.filter(role => valueObj[role]);
      const heroPool = heroList.filter(hero => valueObj[hero]);
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
        const heroes = heroList.map((hero,index) => {
            return (<Checkbox key={index} value={hero}/>);
        })
        const roles = roleList.map((role,index) => {
            return (<Checkbox key={index} value={role}/>);
        })
        return (
            <form onSubmit={this.onSubmit()}>
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

const mapStateToProps = (state,ownProps) => {
    return {
      authToken: state.auth.authToken,
      currentUser: state.auth.currentUser
    }
  }
  
export default connect(mapStateToProps)(reduxForm({ 
  form: 'addPlayer'
})(EditAccountForm));

