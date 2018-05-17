import {
    FETCH_PLAYERS_REQUEST,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_SUCCESS,
    POST_PLAYER_SUCCESS,
    TOGGLE_EXPAND_CARD,
    DELETE_PLAYER,
    TOGGLE_EDIT_ACCOUNT_MODE,
    EDIT_ACCOUNT,
    REFRESH_PLAYERS_TAB,
    POST_PLAYER_REQUEST,
    TOGGLE_DELETE_ACCOUNT_MODE,
    SET_DEMO_ACCOUNT
} from '../actions/players';
import { LOG_OUT } from '../actions/auth';

const initialState = {
    players: [],
    loading: false,
    error: null,
    currentExpanded: false,
    editAccountMode: false,
    deleteAccountMode: false,
    demoAccount: false
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
    else if (action.type === POST_PLAYER_REQUEST ){
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    else if (action.type === POST_PLAYER_SUCCESS ){
        return {
            ...state,
            players: [...state.players, action.player],
            loading: false
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
    else if (action.type === TOGGLE_DELETE_ACCOUNT_MODE){
        if (!state.deleteAccountMode) {
            return {
              ...state,
              deleteAccountMode : true
            }
          } else {
            return {
              ...state,
              deleteAccountMode: false
              }
          }   
    }
    else if (action.type === DELETE_PLAYER){
        return {
            ...state,
            players: [],
            deleteAccountMode: false,
            editAccountMode: false
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
    else if (action.type === SET_DEMO_ACCOUNT){
        return {
            ...state,
            demoAccount: true
        }
    }
    else if (action.type === LOG_OUT){
        return {
            ...state,
            players: [],
            error: null,
            currentExpanded: false,
            editAccountMode: false,
            deleteAccountMode: false,
            demoAccount: false
        }
    }
    return state
}