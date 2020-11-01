import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/allReducers.js';
const initialState = {};

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(allReducers,initialState, composeEnhancers(
      applyMiddleware(thunk),
    ));
export default store;