import {combineReducers} from 'redux';

import {playersReducer} from './players';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    players: playersReducer,
    form: formReducer
})

export default rootReducer;