import {applyMiddleware, createStore} from 'redux';
import Reducers from './reducers';
import { saveState, loadState } from '../_localData/localData';
import Data_Acts from './actions/data.actions';

//Middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Get saved state


let reduxStore = createStore(
    Reducers,
    applyMiddleware(thunk, logger)
);

// Testing purposes
reduxStore.subscribe(()=>{
    const currentState = reduxStore.getState();
    console.log("Current meta: ", currentState.meta);

    saveState(currentState);
})
  


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
