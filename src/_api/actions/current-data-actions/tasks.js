import * as update from '../calculations';
import {
    SAVE_TASK,
    DELETE_TASK_BY_ID,
    ADD_TASK_IDS_TO_DAYS,
    REMOVE_TASK_IDS_FROM_DAYS
} from '../action-types';

export const saveTask=( taskObj )=>{
    return (dispatch, getState)=>{
        const updates = update.saveTask(getState(), taskObj);
        dispatch({
            type: SAVE_TASK,
            payload: updates
        })
        return Promise.resolve(true)
    }
}
export const deleteTaskById=( taskId )=>{
    return (dispatch, getState)=>{
        const updates = update.deleteTaskById(getState(), taskId);
        dispatch({
            type: DELETE_TASK_BY_ID,
            payload: updates
        })
        return Promise.resolve(true)
    }
}
export const addTaskIdsToDays=(taskIds, dayIds)=>{
    return (dispatch, getState)=>{
        const updates = update.addTaskIdsToDayIds(getState(), taskIds, dayIds);
        dispatch({
            type: ADD_TASK_IDS_TO_DAYS,
            payload: updates
        })
        return Promise.resolve(true)
    }
}
export const removeTaskIdsFromDays=(taskIds, dayIds)=>{
    return (dispatch, getState)=>{
        const updates = 
            update.removeTaskIdsFromDayIds(getState(), taskIds, dayIds);
        dispatch({
            type: REMOVE_TASK_IDS_FROM_DAYS,
            payload: updates
        })
        return Promise.resolve(true)
    }
}

