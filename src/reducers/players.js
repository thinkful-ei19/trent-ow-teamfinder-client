import {
    FETCH_PLAYERS_REQUEST,
    FETCH_PLAYERS_ERROR,
    FETCH_PLAYERS_SUCCESS,
    POST_PLAYER,
    TOGGLE_EXPAND_CARD,
    DELETE_PLAYER,
    TOGGLE_EDIT_ACCOUNT_MODE,
    EDIT_ACCOUNT
} from '../actions/players';

const initialState = {
    players: [
        {
            "_id" : "000000000000000000000000",
            "username" : "user1",
            "password": "$2a$10$mzy166ztW0nERiBYVYpeEeOYhRnnda124ALbjEy0UJmkXBW6ScyEu",
            "skillRating" : 2500,
            "roles" : ["DPS", "Tank", "Support", "Flex"],
            "heroPool": ["McCree", "Winston", "Reinhardt"],
            "bio" : ["Looking for cool players to rank up with"]
        },
        {
            "_id" : "000000000000000000000001",
            "username" : "user2",
            "password": "$2a$10$zA2cQsPP7oul12j7PIv0/eiWZrX16oKaEzurG6NHQtHBUXU7DQgha",
            "skillRating" : 3000,
            "roles" : ["Tank", "Support"],
            "heroPool": ["Winston", "Reinhardt"],
            "bio" : ["cool people welcome"]
        },
        {
            "_id" : "000000000000000000000002",
            "username" : "user3",
            "password": "$2a$10$zA2cQsPP7oul12j7PIv0/eiWZrX16oKaEzurG6NHQtHBUXU7DQgha",
            "skillRating" : 2700,
            "roles" : ["DPS"],
            "heroPool": ["Genji", "Widowmaker"],
            "bio" : ["no toxicity"]
        }
    ],
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
        return {
            ...state,
            players: [...state.players, action.updatedPlayer],
            editAccountMode: false
        }
    }
    return state
}