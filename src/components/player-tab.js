import React from 'react';
import {toggleExpandCard} from '../actions/players';
import {connect} from 'react-redux';

import PlayerCard from './player-card';
import ExpandedPlayerCard from './expanded-player-card';

class PlayerTab extends React.Component {

    onClick(props) {
      const player = this.props.players.find(player => player.id === props.id );
      this.props.dispatch(toggleExpandCard(player));
    }

    render() {
        let players;
        if(this.props.players){
            if (this.props.currentExpanded){
                players = <ExpandedPlayerCard onClick={(props) => this.onClick(props)} 
                currentUser={this.props.currentExpanded}/>
            } else {
                players = this.props.players.map(player => {
                    return <PlayerCard onClick={(props) => this.onClick(props)} 
                    id={player.id} key={player.id} 
                    username={player.username} 
                    skillRating={player.skillRating}  
                    roles={player.roles}/>
                })
            }
        }
        
        
        return (<ul className="container card-wrapper">
                    {players}
                </ul>);
    } 
}

const mapStateToProps = state => {
    return {
        players: state.players.players,
        currentExpanded: state.players.currentExpanded
    }
} 

export default connect(mapStateToProps)(PlayerTab);