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


// These all return an object with needed updates under their
// equivalent redux key.
import * as calculate from './calculateUpdates';
// import * as localData from './localAndRemoteDataApi';


// Members
export const saveMember=( memberObj )=>{
    return (dispatch, getState)=>{
        const updates = calculate.saveMember(getState(), memberObj);
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
        const updates = calculate.deleteMemberById(getState(), memberId);
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
        const updates = calculate.addMemberIdsToGroupIds(getState(), membIds, groupIds)
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
        const updates = calculate.removeMemberIdsFromGroupIds(getState(), membIds, groupIds);
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
        const updates = calculate.saveGroup(getState(), groupObj);
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
        const updates = calculate.deleteGroupById(getState(), groupId);
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
        const updates = calculate.addGroupIdsToTaskIds(getState(), groupIds, taskIds)
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
            calculate.removeGroupIdsFromTaskIds(getState(), groupIds, taskIds);
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
        const updates = calculate.saveTask(getState(), taskObj);
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
        const updates = calculate.deleteTaskById(getState(), taskId);
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
        const updates = calculate.addTaskIdsToDayIds(getState(), taskIds, dayIds);
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
            calculate.removeTaskIdsFromDayIds(getState(), taskIds, dayIds);
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
        const updates = calculate.saveDay(getState(), dayObj);
        return Promise.resolve(
            dispatch({
                type: SAVE_DAY,
                payload: updates
            })
        )
    }
}
