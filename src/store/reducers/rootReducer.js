import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    noteReducer,
    authReducer
});

export default rootReducer;
