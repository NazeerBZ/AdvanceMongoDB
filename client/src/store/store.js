import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import CounterReducer from './reducers/counterReducer.js';
import Authentication from './reducers/authentication.js'

const rootReducer = combineReducers({
    CounterReducer,
    Authentication
})

export const Store = createStore(rootReducer, applyMiddleware(thunk));