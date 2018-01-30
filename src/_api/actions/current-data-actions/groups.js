import * as update from '../calculations';

import { getActiveSchedId, saveUpdatesAndPush } from './_utilityFuncs';

import {
    SAVE_GROUP,
    DELETE_GROUP_BY_ID,
    ADD_GROUP_IDS_TO_TASKS,
    REMOVE_GROUP_IDS_FROM_TASKS
} from '../action-types';

export const saveGroup=(groupObj)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.saveGroup(state, groupObj);
        dispatch({
            type: SAVE_GROUP,
            payload: updates
        })
        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const deleteGroupById=(groupId)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.deleteGroupById(state, groupId);
        
        dispatch({
            type: DELETE_GROUP_BY_ID,
            payload: updates
        })
        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const addGroupIdsToTaskIds=(groupIds, taskIds)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.addGroupIdsToTaskIds(state, groupIds, taskIds)
        dispatch({
            type: ADD_GROUP_IDS_TO_TASKS,
            payload: updates
        })
        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}
export const removeGroupIdsFromTaskIds=(groupIds, taskIds)=>{
    return (dispatch, getState)=>{
        const state = getState();
        const updates = update.removeGroupIdsFromTaskIds(state, groupIds, taskIds);
        dispatch({
            type: REMOVE_GROUP_IDS_FROM_TASKS,
            payload: updates
        });
        const activeSchedId = getActiveSchedId(state);
        // Returns a promise with sync state, don't end with semi-colon
        return saveUpdatesAndPush(activeSchedId, updates, dispatch)
    }
}