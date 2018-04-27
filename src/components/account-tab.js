import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './expanded-player-card.css';
import AccountInfo from './account-info';

import {fetchDeletePlayer, toggleEditAccount} from '../actions/players';

class AccountTab extends React.Component {
    deleteOnClick() {
      return this.props.dispatch(fetchDeletePlayer(this.props.authToken,this.props.currentUser.id))
        .then(() => this.props.history.push('/'));
    }

    toggleEditOnClick() {
      this.props.dispatch(toggleEditAccount());
    }

    render() {
        let currentPlayer;
        if (this.props.currentUser){
          currentPlayer = (
            <AccountInfo currentUser={this.props.currentUser} 
                deleteOnClick={() => this.deleteOnClick()}
                toggleEditOnClick={() => this.toggleEditOnClick()}/>
          );
              
        }
        return (
            <div>
                {currentPlayer}
            </div>
            
        );
    }
    
}

const mapStateToProps = state => {
    return {
      authToken : state.auth.authToken,
      currentUser: state.auth.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(AccountTab))