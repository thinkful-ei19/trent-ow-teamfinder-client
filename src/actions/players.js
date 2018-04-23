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

export const fetchPlayerss = () => dispatch => {
    return fetch(`${API_BASE_URL}/api/players`)
    .then(res => {
        fetchPlayersRequest();
        return res.json();
    })
    .then(data => dispatch(fetchPlayersSuccess(data)))
    .catch(err => dispatch(fetchPlayersError(err)));
};
