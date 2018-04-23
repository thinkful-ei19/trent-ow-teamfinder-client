import {
    FETCH_PLAYERS_REQUEST,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_SUCCESS,
    POST_PLAYER
} from '../actions/players';

const initialState = {
    players: [],
    loading: false,
    error: null
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
    return state
}