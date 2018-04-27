import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './expanded-player-card.css';
import AccountInfo from './account-info';
import EditAccountForm from './edit-account-form';

import {fetchDeletePlayer, toggleEditAccount} from '../actions/players';

class AccountTab extends React.Component {
    convertInitialValues(currentUser) { 
        const roles = currentUser.roles.reduce((obj,role) => {
            obj[role] = true;
            return obj;
        },{});
        const heroes = currentUser.heroPool.reduce((obj,hero) => {
            obj[hero] = true;
            return obj;
        },{});
        return {
          skillRating: currentUser.skillRating,
          ...roles,
          ...heroes
        }
    }

    deleteOnClick() {
      return this.props.dispatch(fetchDeletePlayer(this.props.authToken,this.props.currentUser.id))
        .then(() => this.props.history.push('/'));
    }

    toggleEditOnClick() {
      this.props.dispatch(toggleEditAccount());
    }

    render() {
        let currentDisplay;
        if (this.props.currentUser){
          if (this.props.editAccountMode) {
            currentDisplay = <EditAccountForm initialValues={this.convertInitialValues(this.props.currentUser)}/>
          } else {
            currentDisplay = (
                <AccountInfo currentUser={this.props.currentUser} 
                    deleteOnClick={() => this.deleteOnClick()}
                    toggleEditOnClick={() => this.toggleEditOnClick()}/>
              );
          }
              
        }
        return (
            <div>
                {currentDisplay}
            </div>
            
        );
    }
    
}

const mapStateToProps = state => {
    return {
      authToken : state.auth.authToken,
      currentUser: state.auth.currentUser,
      editAccountMode: state.players.editAccountMode
    }
}

export default withRouter(connect(mapStateToProps)(AccountTab))