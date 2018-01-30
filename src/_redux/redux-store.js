import {applyMiddleware, createStore} from 'redux';
import Reducers from './reducers';
import { saveAppState } from '../_api';

//Middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let reduxStore = createStore(
    Reducers,
    applyMiddleware(thunk, logger)
);

// Saves state to local data after each change
// Overwrites last object each time
reduxStore.subscribe(()=>{
    const currentState = reduxStore.getState();
    console.log("Saved state: ", currentState);
    saveAppState(currentState);
})

export default reduxStore;
