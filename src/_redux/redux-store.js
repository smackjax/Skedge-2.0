import {applyMiddleware, createStore} from 'redux';
import Reducers from './reducers';

//Middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let reduxStore = createStore(
    Reducers,

    applyMiddleware(thunk, logger)
);
export default reduxStore;
