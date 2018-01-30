import { 
    getActiveSchedId, 
    saveUpdatesAndPush 
} from './_utilityFuncs';

import {
    SAVE_NEW_DATE_RANGE,
    DELETE_DATE_RANGE
} from '../action-types';

export const saveDateRange=(updates)=>(
    (dispatch, getStore)=>{
        // Updates object comes from component
        // TODO probably worth changing to a calculation here
        const state = getStore();

        dispatch({
            type: SAVE_NEW_DATE_RANGE,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
)
    

export const deleteDateRangeById=(dateRangeId)=>(
    (dispatch, getStore)=>{
        const state = getStore();
        const updates = { 
            dateRanges: {
                [dateRangeId]: null
            }
        };
        
        dispatch({
            type: DELETE_DATE_RANGE,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
)
    
