import * as update from '../calculations';

import { 
    getActiveSchedId, 
    saveUpdatesAndPush 
} from './_utilityFuncs';

import {
    SAVE_DAY
} from '../action-types';

export const saveDay=( dayObj )=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.saveDay(state, dayObj);

        dispatch({
            type: SAVE_DAY,
            payload: updates
        })
        
        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
