import {API_BASE_URL} from '../config';

export const FETCH_PLAYERS_REQUEST = 'FETCH_PLAYERS_REQUEST';
export const fetchPlayersRequest = () => {
  return {
    type: FETCH_PLAYERS_REQUEST
  };
};

export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const fetchPlayersSuccess = (players) => {
  return {
    type: FETCH_PLAYERS_SUCCESS,
    players
  };
};

export const FETCH_PLAYERS_ERROR = 'FETCH_PLAYERS_ERROR';
export const fetchPlayersError = (error) => {
  return {
    type: FETCH_PLAYERS_ERROR,
    error
  };
};

export const fetchPlayers = authToken => dispatch => {
  return fetch(`${API_BASE_URL}/api/players`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
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
  };
};

export const TOGGLE_EXPAND_CARD = 'TOGGLE_EXPAND_CARD';
export const toggleExpandCard = (player) => {
  return {
    type: TOGGLE_EXPAND_CARD,
    player
  };
};

export const DELETE_PLAYER = 'DELETE_PLAYER';
export const deletePlayer = (id) => {
  return {
    type: DELETE_PLAYER,
    id
  };
};

export const fetchDeletePlayer = (authToken, id) => dispatch => {
  return fetch(`${API_BASE_URL}/api/players`, {
    method: 'DELETE',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return dispatch(deletePlayer(id));
    });
};

export const TOGGLE_EDIT_ACCOUNT_MODE = 'TOGGLE_EDIT_ACCOUNT_MODE';
export const toggleEditAccount = () => {
  return {
    type: TOGGLE_EDIT_ACCOUNT_MODE
  };
};

export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const editAccount = (updatedPlayer) => {
  return {
    type: EDIT_ACCOUNT,
    updatedPlayer
  };
};

export const fetchUpdateAccount = (authToken, id, updatedPlayer) => {
  return fetch(`${API_BASE_URL}/api/players/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      updatedPlayer
    })
  });
};











