import * as update from '../calculations';

import { 
    getActiveSchedId, 
    saveUpdatesAndPush 
} from './_utilityFuncs';

import {
    SAVE_TASK,
    DELETE_TASK_BY_ID,
    ADD_TASK_IDS_TO_DAYS,
    REMOVE_TASK_IDS_FROM_DAYS
} from '../action-types';

export const saveTask=( taskObj )=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.saveTask(state, taskObj);
        
        dispatch({
            type: SAVE_TASK,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const deleteTaskById=( taskId )=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.deleteTaskById(state, taskId);

        dispatch({
            type: DELETE_TASK_BY_ID,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const addTaskIdsToDays=(taskIds, dayIds)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.addTaskIdsToDayIds(state, taskIds, dayIds);
        
        dispatch({
            type: ADD_TASK_IDS_TO_DAYS,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const removeTaskIdsFromDays=(taskIds, dayIds)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = 
            update.removeTaskIdsFromDayIds(state, taskIds, dayIds);

        dispatch({
            type: REMOVE_TASK_IDS_FROM_DAYS,
            payload: updates
        })

        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}

