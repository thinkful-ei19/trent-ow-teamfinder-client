import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './expanded-player-card.css';

import {fetchDeletePlayer} from '../actions/players';

class AccountTab extends React.Component {
    deleteOnClick() {
      return this.props.dispatch(fetchDeletePlayer(this.props.authToken,this.props.currentUser.id))
        .then(() => this.props.history.push('/'));
    }

    render() {
        let currentPlayer;
        if (this.props.currentUser){
          currentPlayer = (
            <li key={this.props.currentUser.id} className="card expanded">
                {this.props.currentUser.username} {this.props.currentUser.skillRating} {this.props.currentUser.roles} {this.props.currentUser.heroPool}
                <button onClick={() => this.deleteOnClick()}>Delete</button> <button>Edit</button>
            </li>
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