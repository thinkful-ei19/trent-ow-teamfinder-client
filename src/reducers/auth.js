import {SET_AUTH_TOKEN, AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR} from '../actions/auth';
import { DELETE_PLAYER, EDIT_ACCOUNT } from '../actions/players';

const initialState = {
  authToken: null,
  currentUser: null,
  loading: false,
  error: null
}

export const authReducer = (state = initialState, action) => {
    if (action.type === SET_AUTH_TOKEN) {
        return {
          ...state,
          authToken: action.authToken
        }
    }
    else if (action.type === AUTH_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  } else if (action.type === AUTH_SUCCESS) {
      return Object.assign({}, state, {
          loading: false,
          currentUser: action.currentUser
      });
  } else if (action.type === AUTH_ERROR) {
      return Object.assign({}, state, {
          loading: false,
          error: action.error
      });
  }
  else if (action.type === DELETE_PLAYER ){
    return {
        ...state,
        currentUser: null,
        authToken: null
    }
  }
  else if (action.type === EDIT_ACCOUNT){
    return {
        ...state,
        currentUser: action.updatedPlayer
    }
  }
    return state;
}