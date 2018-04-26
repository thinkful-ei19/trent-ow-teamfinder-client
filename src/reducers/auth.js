import {SET_AUTH_TOKEN} from '../actions/auth';

const initialState = {
  authToken: null
}

export const authReducer = (state = initialState, action) => {
    if (action.type === SET_AUTH_TOKEN) {
        return {
          ...state,
          authToken: action.authToken
        }
    }
    return state;
}