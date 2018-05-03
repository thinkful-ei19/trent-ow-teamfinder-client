import {TOGGLE_DISPLAY_NAV_ITEMS, HIDE_DISPLAY_NAV_ITEMS} from '../actions/navbar';

const initialState = {
  isDisplayed: false 
};

export const navBarReducer = (state = initialState, action) => {
  if (action.type === TOGGLE_DISPLAY_NAV_ITEMS) {
    if (state.isDisplayed) {
      return {
        ...state,
        isDisplayed: false
      }
    } 
    else {
      return {
        ...state,
        isDisplayed: true
      }
    }
  }
  else if (action.type === HIDE_DISPLAY_NAV_ITEMS) {
    return {
        ...state,
        isDisplayed: false
    }
  }
  return state;
};