import {combineReducers} from 'redux';
import userReducer from './userReducer.js'


const allReducers = combineReducers({
    userData:userReducer
});

export default allReducers;