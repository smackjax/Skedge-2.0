import {applyMiddleware, createStore} from 'redux';
import Reducers from './reducers';
import { loadState } from '../_localData/localData';
import Data_Acts from './actions/data.actions';

//Middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Get saved state


let reduxStore = createStore(
    Reducers,
    applyMiddleware(thunk, logger)
);

loadState()
.then((jsonState)=>{
if(jsonState){
    console.log("retrieval success");
    const parsedState = JSON.parse(jsonState);
    reduxStore.dispatch(Data_Acts.loadData(parsedState));
}
})       
.catch(err=>{
    console.log("Data retrieval failed");
})     

export default reduxStore;
