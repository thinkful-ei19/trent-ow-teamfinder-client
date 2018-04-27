import {combineReducers} from 'redux';

import {playersReducer} from './players';
import {authReducer} from './auth';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  players: playersReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;