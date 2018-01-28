// Master data api
// All data actions go through here, 
// and all functions here return promises

    // The steps are...
// 1. Capture action that needs to take place
// 2. Get current store
// 3. Calculate updates to the store
    // Take updated values and...
// 4. Apply updates to redux store
// 5. Save redux store to local data(in entirety)
// 6. Save updates to local data
// 7. Update remote data from local data
    // If remote sync succeeds
// 8.a Clear local updates
    // If remote sync fails
// 8.a Retry remote sync on the next 

/* update object example
{
    groups: {gId: {...newValues} },
    members: {mId: {...newValues}}
} 
*/


import {
    SAVE_MEMBER,
    DELETE_MEMBER_BY_ID,
    ADD_MEMBER_IDS_TO_GROUP_IDs,
    REMOVE_MEMBER_IDS_FROM_GROUP_IDS,
    SAVE_GROUP,
    DELETE_GROUP_BY_ID,
    ADD_GROUP_IDS_TO_TASKS,
    REMOVE_GROUP_IDS_FROM_TASKS,
    SAVE_TASK,
    DELETE_TASK_BY_ID,
    ADD_TASK_IDS_TO_DAYS,
    REMOVE_TASK_IDS_FROM_DAYS,
    SAVE_DAY
} from '../action-types/action-types';

// These all return an object with needed updates under their
// equivalent redux key.
import * as update from './calculations';
// import * as localData from './localAndRemoteDataApi';


// Members
export const saveMember=( memberObj )=>{
    return (dispatch, getState)=>{
        const updates = update.saveMember(getState(), memberObj);
        return Promise.resolve(
                dispatch({
                type: SAVE_MEMBER,
                payload: updates
            })
        )
    }
}
export const deleteMemberById=( memberId )=>{
    return (dispatch, getState)=>{
        const updates = update.deleteMemberById(getState(), memberId);
        return Promise.resolve(
            dispatch({
                type: DELETE_MEMBER_BY_ID,
                payload: updates
            })
        )
    }
}
export const addMemberIdsToGroupIds=(membIds, groupIds)=>{
    return (dispatch, getState)=>{
        const updates = update.addMemberIdsToGroupIds(getState(), membIds, groupIds)
        return Promise.resolve(
            dispatch({
                type: ADD_MEMBER_IDS_TO_GROUP_IDs,
                payload: updates
            })
        )
    }
}

export const removeMemberIdsFromGroupIds=(membIds, groupIds)=>{
    return (dispatch, getState)=>{
        const updates = update.removeMemberIdsFromGroupIds(getState(), membIds, groupIds);
        return Promise.resolve(
            dispatch({
                type: REMOVE_MEMBER_IDS_FROM_GROUP_IDS,
                payload: updates
            })
        )
    }
}


// Groups
export const saveGroup=(groupObj)=>{
    return (dispatch, getState)=>{
        const updates = update.saveGroup(getState(), groupObj);
        return Promise.resolve(
            dispatch({
                type: SAVE_GROUP,
                payload: updates
            })
        )
    }
}
export const deleteGroupById=(groupId)=>{
    return (dispatch, getState)=>{
        const updates = update.deleteGroupById(getState(), groupId);
        return Promise.resolve(
            dispatch({
                type: DELETE_GROUP_BY_ID,
                payload: updates
            })
        )
    }
}
export const addGroupIdsToTaskIds=(groupIds, taskIds)=>{
    return (dispatch, getState)=>{
        const updates = update.addGroupIdsToTaskIds(getState(), groupIds, taskIds)
        return Promise.resolve(
            dispatch({
                type: ADD_GROUP_IDS_TO_TASKS,
                payload: updates
            })
        )
    }
}
export const removeGroupIdsFromTaskIds=(groupIds, taskIds)=>{
    return (dispatch, getState)=>{
        const updates = 
            update.removeGroupIdsFromTaskIds(getState(), groupIds, taskIds);
        return Promise.resolve(
            dispatch({
                type: REMOVE_GROUP_IDS_FROM_TASKS,
                payload: updates
            })
        )
    }
}


// Tasks
export const saveTask=( taskObj )=>{
    return (dispatch, getState)=>{
        const updates = update.saveTask(getState(), taskObj);
        return Promise.resolve(
            dispatch({
                type: SAVE_TASK,
                payload: updates
            })
        )
    }
}
export const deleteTask=( taskId )=>{
    return (dispatch, getState)=>{
        const updates = update.deleteTaskById(getState(), taskId);
        return Promise.resolve(
            dispatch({
                type: DELETE_TASK_BY_ID,
                payload: updates
            })
        )
    }
}
export const addTaskIdsToDays=(taskIds, dayIds)=>{
    return (dispatch, getState)=>{
        const updates = update.addTaskIdsToDayIds(getState(), taskIds, dayIds);
        return Promise.resolve(
            dispatch({
                type: ADD_TASK_IDS_TO_DAYS,
                payload: updates
            })
        )
    }
}
export const removeTaskIdsFromDays=(taskIds, dayIds)=>{
    return (dispatch, getState)=>{
        const updates = 
            update.removeTaskIdsFromDayIds(getState(), taskIds, dayIds);
        return Promise.resolve(
            dispatch({
                type: REMOVE_TASK_IDS_FROM_DAYS,
                payload: updates
            })
        )
    }
}


// Days
export const saveDay=( dayObj )=>{
    return (dispatch, getState)=>{
        const updates = update.saveDay(getState(), dayObj);
        return Promise.resolve(
            dispatch({
                type: SAVE_DAY,
                payload: updates
            })
        )
    }
}
