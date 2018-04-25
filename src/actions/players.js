import {API_BASE_URL} from '../config';

export const FETCH_PLAYERS_REQUEST = 'FETCH_PLAYERS_REQUEST';
export const fetchPlayersRequest = () => {
    return {
        type: FETCH_PLAYERS_REQUEST
    }
}

export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const fetchPlayersSuccess = (players) => {
    return {
        type: FETCH_PLAYERS_SUCCESS,
        players
    }
}

export const FETCH_PLAYERS_ERROR = 'FETCH_PLAYERS_ERROR';
export const fetchPlayersError = (error) => {
    return {
        type: FETCH_PLAYERS_ERROR,
        error
    }
}

export const fetchPlayers = () => dispatch => {
    return fetch(`${API_BASE_URL}/api/players`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      fetchPlayersRequest();
      return res.json();
    })
    .then(data => dispatch(fetchPlayersSuccess(data)))
    .catch(err => dispatch(fetchPlayersError(err)));
};

export const POST_PLAYER = 'POST_PLAYER';
export const postPlayer = (player) => {
    return {
        type: POST_PLAYER,
        player
    }
}

export const TOGGLE_EXPAND_CARD = 'TOGGLE_EXPAND_CARD';
export const toggleExpandCard = (player) => {
    return {
        type: TOGGLE_EXPAND_CARD,
        player
    }
}





