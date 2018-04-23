import React from 'react';
import {fetchPlayers} from '../actions/players';
import {connect} from 'react-redux';

class PlayerTab extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchPlayers());
    }

    render() {
        const players = this.props.players.map(player => {
            return <li>{player.username} {player.skillRating}</li>
        })
        return (<ul>
                    {players}
                </ul>);
    } 
}

const mapStateToProps = state => {
    return {
        players: state.players.players
    }
} 

export default connect(mapStateToProps)(PlayerTab);