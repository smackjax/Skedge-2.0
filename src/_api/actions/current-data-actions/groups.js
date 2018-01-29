import * as update from '../calculations';

import {
    SAVE_GROUP,
    DELETE_GROUP_BY_ID,
    ADD_GROUP_IDS_TO_TASKS,
    REMOVE_GROUP_IDS_FROM_TASKS
} from '../action-types';

export const saveGroup=(groupObj)=>{
    return (dispatch, getState)=>{
        const updates = update.saveGroup(getState(), groupObj);
        dispatch({
            type: SAVE_GROUP,
            payload: updates
        })
        return Promise.resolve(true)
    }
}
export const deleteGroupById=(groupId)=>{
    return (dispatch, getState)=>{
        const updates = update.deleteGroupById(getState(), groupId);

        dispatch({
            type: DELETE_GROUP_BY_ID,
            payload: updates
        })
        return Promise.resolve(true)
    }
}
export const addGroupIdsToTaskIds=(groupIds, taskIds)=>{
    return (dispatch, getState)=>{
        const updates = update.addGroupIdsToTaskIds(getState(), groupIds, taskIds)
        dispatch({
            type: ADD_GROUP_IDS_TO_TASKS,
            payload: updates
        })
        return Promise.resolve(true)
    }
}
export const removeGroupIdsFromTaskIds=(groupIds, taskIds)=>{
    return (dispatch, getState)=>{
        const updates = 
            update.removeGroupIdsFromTaskIds(getState(), groupIds, taskIds);
        dispatch({
            type: REMOVE_GROUP_IDS_FROM_TASKS,
            payload: updates
        });
    }
}