import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './expanded-player-card.css';
import AccountInfo from './account-info';
import EditAccountForm from './edit-account-form';

import {fetchDeletePlayer, toggleEditAccount, toggleDeleteAccount, setDemoAccount} from '../actions/players';

class AccountTab extends React.Component {
    componentWillMount() {
        if (!this.props.authToken) {
          return this.props.history.push('/');
        }
    }

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
          email: currentUser.email,
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

    toggleDeleteOnClick() {
        this.props.dispatch(toggleDeleteAccount());
      }
    setDemoAccount() {
        this.props.dispatch(setDemoAccount());
    }

    render() {
        let currentDisplay;
        if (this.props.currentUser){
          if (this.props.editAccountMode) {
            currentDisplay = <EditAccountForm initialValues={this.convertInitialValues(this.props.currentUser)}/>
          } else {
            currentDisplay = (
                <AccountInfo currentUser={this.props.currentUser}
                    demoAccount={this.props.demoAccount}
                    setDemoAccount={() => this.setDemoAccount()}
                    deleteAccountMode={this.props.deleteAccountMode} 
                    toggleDeleteOnClick={() => this.toggleDeleteOnClick()}
                    deleteOnClick={() => this.deleteOnClick()}
                    toggleEditOnClick={() => this.toggleEditOnClick()}/>
              );
          }
              
        }
        return (
            <div className="container card-wrapper">
                {currentDisplay}
            </div>
            
        );
    }
    
}

const mapStateToProps = state => {
    return {
      authToken : state.auth.authToken,
      currentUser: state.auth.currentUser,
      editAccountMode: state.players.editAccountMode,
      deleteAccountMode: state.players.deleteAccountMode,
      demoAccount: state.players.demoAccount
    }
}

export default withRouter(connect(mapStateToProps)(AccountTab))