import {
    FETCH_PLAYERS_REQUEST,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_SUCCESS,
    POST_PLAYER,
    TOGGLE_EXPAND_CARD,
    DELETE_PLAYER,
    TOGGLE_EDIT_ACCOUNT_MODE,
    EDIT_ACCOUNT,
    REFRESH_PLAYERS_TAB
} from '../actions/players';

const initialState = {
    players: [],
    loading: false,
    error: null,
    currentExpanded: false,
    editAccountMode: false
}

export const playersReducer = (state = initialState, action) => {
    if (action.type === FETCH_PLAYERS_REQUEST ){
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    else if (action.type === FETCH_PLAYERS_SUCCESS ){
        return {
            ...state,
            players : action.players,
            loading: false,
            error: null
        }
    }
    else if (action.type === FETCH_PLAYERS_ERROR ){
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }
    else if (action.type === POST_PLAYER ){
        return {
            ...state,
            players: [...state.players, action.player]
        }
    }
    else if (action.type === TOGGLE_EXPAND_CARD ){
        if (!state.currentExpanded) {
          return {
            ...state,
            currentExpanded: action.player
          }
        } else {
            return {
              ...state,
              currentExpanded: false
            }
        }   
    }
    else if (action.type === DELETE_PLAYER){
        return {
            ...state,
            players: []
        }
    }
    else if (action.type === TOGGLE_EDIT_ACCOUNT_MODE){
        if (!state.editAccountMode) {
            return {
              ...state,
              editAccountMode : true
            }
          } else {
            return {
              ...state,
              editAccountMode: false
              }
          }   
    }
    else if (action.type === EDIT_ACCOUNT){
        const editedPlayers = state.players.filter(player => player.id !== action.updatedPlayer.id)
        return {
            ...state,
            players: [...editedPlayers, action.updatedPlayer],
            editAccountMode: false
        }
    }
    else if (action.type === REFRESH_PLAYERS_TAB){
        return {
            ...state,
            currentExpanded: false
        }
    }
    return state
}