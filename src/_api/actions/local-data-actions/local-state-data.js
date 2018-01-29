import { 
    LOAD_REDUX_STATE
} from '../action-types';

import * as localData from '../local-data-api';

export const loadAppState = ()=>{
    return (dispatch)=>{
        return new Promise((resolve, reject)=>{
            localData.loadState()
            .then(loadedAppState=>{
                dispatch({
                    type: LOAD_REDUX_STATE,
                    payload: loadedAppState
                })
                resolve(true)
            })
            .catch(err=>{
                console.log("Couldn't load state from local", err);
                // Attempt to get state from database
                resolve(false)
            })
        })
    }
}

export const saveAppState = (reduxState)=>(
    localData.saveState(reduxState)
)